/* eslint-disable space-before-function-paren */
const { Builder, By, Browser, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const dayjs = require('dayjs')
const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')

const { servers: ServerQueue, robotKey, webDriverServer, withHeadless, testCount, muteCount = 5 } = require('./config')
const skipTest = require('./cache/skip.js')

const caseTestCount = testCount || 3
const TIMEOUT = 60000
const PAGE_LOAD_TIMEOUT = 60 * 1000
function printError(err) {
  // console.log(err);
}
function wait(second) {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, second)
  })
}

// 健康检测
async function testHealthz(config) {
  const url = config.host
  try {
    const res = await axios
      .create({
        timeout: 30000,
        headers: { 'Content-Type': 'text/plain' }
      })
      .get(url, {})
    return res.status >= 200 && res.status < 300 ? 'OK' : 'FAIL'
  } catch (error) {
    console.error('FAIL')
  }
  return 'FAIL'
}

async function pushMetrics(test_case, status_value, config) {
  const { pushgateway, job_name, app_name, cluster_name } = config
  if (!pushgateway) return
  const job_names = config.job_names ? config.job_names : [job_name]
  const value = status_value < 0 ? 0 : status_value
  const data = `# HELP ${test_case} ${app_name}是否可访问\n# TYPE ${test_case} gauge\n${test_case}{cluster_name="${cluster_name}"} ${value}\n`
  for (let i = 0; i < job_names.length; i++) {
    const job = job_names[i]
    try {
      const url = `${pushgateway}/metrics/job/${job}`
      await axios
        .create({
          timeout: 3000,
          headers: { 'Content-Type': 'text/plain' }
        })
        .post(url, data)
      console.log('Push Metric ', job)
    } catch (error) {
      console.error('Failed to push metrics:', error)
    }
    await wait(150)
  }
}

function buildMessage(platform, errors, results, host) {
  const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  let message = ''
  if (errors.length > 0) {
    message = `<font color='warning'>【${time}】${platform}离线了,请尽快确认</font >\n${errors.join(
      '\n'
    )}\n[${platform}](${host})`
  } else {
    message = `<font color='info'>【${time}】${platform}在线</font >但是：\n${results.join(
      '\n'
    )}\n[${platform}](${host})
    `
  }
  console.error(message)
  return {
    msgtype: 'markdown',
    markdown: {
      content: message,
      mentioned_list: ['@all']
    }
  }
}

function buildOnlineMessage(platform, host, count = 1) {
  const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  const message = `<font color='info'>【${time}】${platform}</font >\n经过${count}次测试异常之后已经恢复\n[${platform}](${host})`
  return {
    msgtype: 'markdown',
    markdown: {
      content: message,
      mentioned_list: ['@all']
    }
  }
}

function buildMessage2(platform, host) {
  const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  const message = `<font color='warning'>【${time}】Selenium Driver: ${webDriverServer}异常，无法完成检测，请手动确认</font >\n[${platform}](${host})`
  console.error(message)
  return {
    msgtype: 'markdown',
    markdown: {
      content: message,
      mentioned_list: ['@all']
    }
  }
}

async function sendQWXMsg(message, isPush = true) {
  if (!isPush || (!robotKey && typeof message !== 'object')) return
  await axios
    .create({
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .post(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${robotKey}`, message)
    .then(() => {})
    .catch(err => {
      console.log(err)
    })
  await wait(500)
}

async function saveLatestResult(result, duration) {
  // 将对象转换为字符串，并添加 module.exports 语句
  try {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    // 将毫秒转换为秒
    const seconds = Math.floor(duration / 1000)
    // 计算小时、分钟和秒
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    // 格式化为时分秒
    const formatted = `${hours}小时${minutes}分钟${remainingSeconds}秒`
    const content = `module.exports = ${JSON.stringify(
      { latestResult: result, time, duration: formatted },
      null,
      2
    )};\n`
    fs.writeFileSync('./src/cache/index.js', content)
    console.log('--- result ---', result)
  } catch (err) {
    console.error('Error writing to file', err)
  }
}
// 截图 & 保存
async function takeSnapShot(driver, config) {
  if (!driver) return
  console.log('>>> 截图 & 保存 <<<')
  try {
    const screenshot = await driver.takeScreenshot()
    const time = dayjs(Date.now()).format('YYYY年MM月DD日HH:mm:ss')
    const filename = `${config.app_name}页面截图_${time}.png`
    const filePath = `./images/${filename}`
    fs.writeFileSync(filePath, screenshot, 'base64')
    await driver.sleep(1000)
    config.snapShot = filePath
  } catch (error) {
    config.snapShot = ''
    printError(error)
  }
}
// 截图发消息
async function sendImageMsg(config, logs = []) {
  const { app_name, host, username, password, snapShot, cluster_name } = config
  if (!snapShot) return ''
  try {
    // 上传截图
    const formData = new FormData()
    const readStream = fs.createReadStream(snapShot)
    const container_name = 'systemsnapshot'
    formData.append('file', readStream)
    formData.append('fid', `cmd-snapshot-${cluster_name.replace('_', '')}`)
    formData.append('container_name', container_name)
    const response = await axios.post('https://filesystem-api.sensorcmd.com/api/v1/filesystem/upload', formData, {
      timeout: TIMEOUT,
      headers: {
        ...formData.getHeaders(),
        'Content-Type': 'multipart/form-data'
      }
    })
    const resData = response.data
    const fileUrl = resData.fid
      ? `https://filesystem-api.sensorcmd.com/api/v1/filesystem/download/${resData.fid}?container_name=${container_name}`
      : ''
    if (fileUrl) {
      const msg = {
        msgtype: 'news',
        news: {
          articles: [
            {
              title: `${app_name} 离线了，请点击此消息进行二次确认！`,
              description: `日志： ${logs.join('\n')}; \n系统访问地址:${host}`,
              url: `${host}/#/login?username=${username}&password=${password}`,
              picurl: fileUrl
            }
          ]
        }
      }
      await sendQWXMsg(msg)
    }
    return fileUrl
  } catch (error) {
    console.error('Failed to upload file:', error)
  }
  return ''
}

async function testLoginPage(driver, config) {
  const { host, username, password } = config
  const loginPage = `${host}/#/login`
  console.log('--- login page ---', loginPage)
  const logs = []
  try {
    await driver.get(loginPage)
    await driver.executeScript('localStorage.removeItem("userInfo");')
    await driver.executeScript('localStorage.removeItem("access_token");')
    await driver.wait(until.elementLocated(By.css('input[type="password"]')), PAGE_LOAD_TIMEOUT)
    console.log('--- 登录页加载完成 ---')
    // 填写账号
    await driver.sleep(500)
    console.log('填写账号')
    const nameInput = await driver.findElement(By.css('input[type="text"]'))
    await nameInput.clear()
    await driver.sleep(500)
    await nameInput.click()
    const existingText = await nameInput.getAttribute('value')
    const backspaceSeries = Array(existingText.length).fill(Key.BACK_SPACE).join('')
    await nameInput.sendKeys(backspaceSeries)
    await driver.sleep(50)
    await nameInput.sendKeys(username)
    console.log('填写账号 done')

    // 填写密码
    console.log('填写密码')
    const pwdInput = await driver.findElement(By.css('input[type="password"]'))
    await pwdInput.clear()
    await driver.sleep(500)
    await pwdInput.click()
    const pwdExistingText = await pwdInput.getAttribute('value')
    const pawBackspaceSeries = Array(pwdExistingText.length).fill(Key.BACK_SPACE).join('')
    await pwdInput.sendKeys(pawBackspaceSeries)
    await pwdInput.sendKeys(password)
    console.log('填写密码 done')
    try {
      // 如果需要滑动解锁
      const dv_handler = await driver.findElement(By.className('dv_handler'))
      const actions = driver.actions({ bridge: true, async: true })
      const act = await actions.dragAndDrop(dv_handler, { x: 350, y: 0 })
      await act.perform()
      console.log('滑块操作 done')
    } catch (error) {
      console.log('无滑块操作')
    }
    const title = await driver.getTitle()
    console.log('登录页标题：', title)
    // 发起点击登录
    const button = await driver.findElement(By.css('button[type="button"]'))
    await button.click()
    console.log('按钮点击 done')
    await driver.wait(until.urlContains('home/index'), PAGE_LOAD_TIMEOUT)
    await driver.wait(until.urlIs(`${host}/#/home/index`), 1000)
    console.log('>>> 登录完成已经进入首页 <<<')
    await driver.sleep(50) // 等待1秒再次检查
    let userInfo = null
    let attempts = 0
    while (!userInfo && attempts < 30) {
      userInfo = await driver.executeScript('return localStorage.getItem("userInfo");')
      if (!userInfo) {
        await driver.sleep(1000) // 等待1秒再次检查
      }
      attempts++
    }
    console.log('attempts', attempts)
    const accessToken = await driver.executeScript('return localStorage.getItem("access_token");')
    if (!accessToken) {
      logs.push('❌ 登录之后没有获取到token')
    }
    if (!userInfo) {
      logs.push('❌ 登录之后没有获取到登录账号信息')
    } else {
      console.log('✅ 获取到登录账号信息')
    }
    return [userInfo ? 1 : 0, logs]
  } catch (error) {
    printError(error)
    console.log('❌ --- 登录页输入账号、密码和点击登录操作失败 ----')
  }
  console.log('--- done ----')
  return [0, logs]
}

async function testMonitorPage(driver, config) {
  const { host, code_name } = config
  const nextPage = `${host}/#/monitor/index?code_name=${code_name}`
  console.log('--- next page ---', nextPage)
  const logs = []
  try {
    await driver.get(nextPage)
    console.log('--- 项目页加载完成 ---')
    try {
      await driver.wait(until.elementLocated(By.className('treeStructBox')), PAGE_LOAD_TIMEOUT)
      await driver.wait(async function () {
        const parent = await driver.findElement(By.className('treeStructBox'))
        const childElements = await parent.findElements(By.css('.treeStructBox .el-tree-node'))
        return childElements.length > 0
      }, PAGE_LOAD_TIMEOUT)
    } catch (error) {
      logs.push('账号结构信息获取不到，info接口请求超时')
      await driver.sleep(30 * 1000)
    }
    console.log('--- 项目结构加载完成 ---')
    const userInfo = await driver.executeScript('return localStorage.getItem("userInfo");')
    if (!userInfo) {
      console.log('❌ --- 账号信息 userInfo 获取不到 ----')
      logs.push('账号信息获取不到')
    }
    const monitorInfo = await driver.executeScript('return localStorage.getItem("monitorInfo");')
    if (!monitorInfo) {
      console.log('❌ --- 项目信息 monitorInfo 获取不到 ----')
      logs.push('项目信息获取不到')
    } else {
      console.log('✅  获取到项目信息 monitorInfo')
    }

    const title = await driver.getTitle()
    console.log(title)
    const infoWindow = await driver.findElement(By.className('treeStructBox'))
    await infoWindow.getText()
    console.log('✅  获取到结构树')
    const treeStructBox = await driver.findElement(By.className('treeStructBox'))
    const childElements = await treeStructBox.findElements(By.css('.treeStructBox .el-tree-node'))
    return [childElements.length > 0 ? 1 : 0, logs]
  } catch (error) {
    printError(error)
    console.log('❌ --- 项目主页获取结构信息失败 ----')
  }
  return [0, logs]
}

async function initDriver(config = {}) {
  const options = new chrome.Options()
  // 设置为无头模式
  if (config.headless) {
    options.addArguments('headless')
  }
  options.windowSize({ width: 1920, height: 1080 })
  const builder = new Builder().forBrowser(Browser.CHROME).setChromeOptions(options)
  if (webDriverServer) {
    console.log('chrome driver 将使用远程服务', webDriverServer)
    builder.usingServer(`${webDriverServer}/wd/hub`)
  }
  try {
    return await builder.build()
  } catch (error) {
    printError(error)
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    const msg = `<font color='warning'>selenium-hub 离线了无法进行自动测试【${time}】</font>\n${webDriverServer}`
    console.log(msg)
  }
  return null
}

// 开始测试
async function runTestWithConfigIndex(config, index) {
  const { app_name: platform } = config
  console.log(`\n---- ${platform} 开始第${index}次测试 ----`)
  const driver = await initDriver({ headless: withHeadless })
  if (!driver) {
    console.log('❌ ---- 测试停止 ----')
    return [-1, ['driver初始化失败']]
  }
  let testLogs = []
  let testRes = 0
  try {
    const [loginRes, loginLogs] = await testLoginPage(driver, config, 0)
    testLogs = [...testLogs, ...loginLogs]
    await driver.sleep(5000)
    if (loginRes === 1) {
      const [monitorRes, monitoLogs] = await testMonitorPage(driver, config, 0)
      testLogs = [...testLogs, ...monitoLogs]
      testRes = monitorRes
      if (monitorRes !== 1) {
        await takeSnapShot(driver, config)
      }
    } else {
      await takeSnapShot(driver, config)
    }
  } catch (error) {
    printError(error)
    testRes = 0
  } finally {
    driver.quit()
  }
  return [testRes, testLogs]
}

async function runTestWithConfig(config) {
  if (!config.testCount) {
    config.testCount = 0
  }
  config.testCount += 1
  const { app_name: platform } = config
  const startTs = Date.now()
  const healthz = await testHealthz(config)
  console.log(`---- ${platform} 💕服务健康状态❤️：${healthz} ----`)
  let testResult = healthz === 'OK' ? 1 : 0
  // 健康检测正常才进入测试
  if (healthz === 'OK') {
    const [result, logs] = await runTestWithConfigIndex(config, config.testCount)
    if (!config.logs) {
      config.logs = [...logs]
    } else {
      config.logs = [...config.logs, ...logs]
    }
    testResult = result
  } else {
    config.logs = ['前端服务健康检测异常，无法访问!']
  }
  config.result = testResult
  const dts = Math.floor((Date.now() - startTs) / 1000)
  const m = Math.floor(dts / 60)
  const s = dts - m * 60
  console.log(
    `${testResult === 1 ? '✅' : '❌'}-->> 这是第${config.testCount}次尝试`,
    platform,
    '持续时间',
    `${m}分${s}秒`,
    `测试结果：${testResult === 1 ? '成功' : '失败'}\n\n`
  )
  return config
}

async function pushServer(config, latestResult, oldLatestResult) {
  const { app_name: platform, host, username, password, cluster_name } = config
  // 取出最近的监测结果
  const _latestRes = latestResult || { [cluster_name]: 0 }
  const _latestResult = !_latestRes[cluster_name] ? 0 : _latestRes[cluster_name] * 1
  const sendMsg = _latestResult % (muteCount * 1) === 0 || _latestResult === 1
  console.error('>>--sendMsg--->>', sendMsg)
  if (config.result === -1 && sendMsg) {
    const msg = buildMessage2(platform, `${host}/#/login?username=${username}&password=${password}`)
    await sendQWXMsg(msg)
    return
  }
  await pushMetrics('sensorcmd_login_availability', config.result, config)
  if (config.result !== 1 && sendMsg) {
    console.log(platform, cluster_name, _latestResult, ' newRes:', config.result)
    if (_latestResult <= 1 && config.snapShot) {
      await sendImageMsg(config, [`经过${config.testCount}次尝试都无法打开项目`, ...config.logs])
    } else {
      const msg = buildMessage(
        platform,
        [
          _latestResult > 0 ? `持续${_latestResult}次检测异常` : '',
          '最近一次：',
          `经过${config.testCount}次尝试都无法打开项目`,
          ...config.logs
        ],
        [],
        `${host}/#/login?username=${username}&password=${password}`
      )
      await sendQWXMsg(msg)
    }
  }
  // 如果测试正常但是上次测试异常也发送消息
  const _oldLatestRes = oldLatestResult || {}
  const _oldLatestResult = _oldLatestRes[cluster_name] === undefined ? 0 : _oldLatestRes[cluster_name] * 1
  if (config.result === 1 && _oldLatestResult > 0) {
    const msg = buildOnlineMessage(
      platform,
      `${host}/#/login?username=${username}&password=${password}`,
      _oldLatestResult
    )
    await sendQWXMsg(msg)
  }
}

async function start() {
  const { latestResult } = require('./cache/index.js')
  console.log('latestResult', latestResult)
  console.log('skipTest', skipTest)
  // 滤除需要跳过的服务
  const testServers = [...ServerQueue].filter(_s => !skipTest[_s.cluster_name])
  const runServers = [...testServers]
  const startTs = Date.now()
  try {
    while (testServers.length > 0) {
      const config = testServers.shift()
      await runTestWithConfig(config)
      if (config.result !== 1 && config.testCount < caseTestCount) {
        // 失败且还有机会
        if (config.result === -1) {
          config.testCount = 0
        } else {
          testServers.push(config)
        }
      }
    }
  } catch (error) {
    printError(error)
  }
  const _latestRes = { ...(latestResult || {}) }
  for (let i = 0; i < runServers.length; i++) {
    const config = runServers[i]
    if (config.result !== 1) {
      if (!_latestRes[config.cluster_name]) {
        _latestRes[config.cluster_name] = 0
      }
      _latestRes[config.cluster_name] += 1
    } else {
      _latestRes[config.cluster_name] = 0
    }
    await pushServer(config, _latestRes, latestResult)
  }
  const endTs = Date.now()
  const duration = endTs - startTs
  await saveLatestResult(_latestRes, duration)
  await wait(1000)
}

start()
