import config from '@/config/index.js'

const SocketUrl = config.server.socketUrl
const Debug = config.server.mode === 'develop' || false
export default class Socket {
  constructor({ url = SocketUrl, data, callback }) {
    this.isOpen = false // 是否连接
    this.pingIntervalSeconds = 60000 // 心跳连接时间
    this.lockReconnect = false // 是否真正建立连接
    this.heartTimer = null // 心跳定时器
    this.serverTimer = null // 服务器超时 定时器
    this.reconnectTimer = null // 断开 重连倒计时
    this.sendFixHeartTimer = null // 20s固定发送心跳定时器

    this.url = url
    this.data = data
    this.forceClose = false // 页面强制关闭后，禁止重连
    this.callback = callback
    this.websock = new WebSocket(this.url)
    this.initSocket()
  }
  initSocket() {
    const _this = this
    if (this.websock.readyState === this.websock.OPEN) {
      // 若是ws开启状态
      this.websock.send(_this.data, _this.callback)
    } else {
      // 若是 正在开启状态，则等待1s后重新调用
      setTimeout(function () {
        _this.initSocket(this.url)
      }, 1000)
      return
    }

    // socket接收消息事件
    this.websock.onmessage = function (e) {
      _this.callback && _this.callback(JSON.parse(e.data))
      // 收到服务器信息，心跳重置,上报
      _this.reset()
    }
    // socket关闭事件
    this.websock.onclose = function (e) {
      _this.websock.close()
      if (Debug) {
        _this.storeLog('WebSocket关闭')
      }
      _this.reconnect()
    }
    // socket链接成功事件
    this.websock.onopen = function () {
      if (Debug) {
        _this.storeLog('WebSocket连接成功')
      }
      // 开启心跳
      _this.start()
      _this.sendFixHeart()
    }
    // socket关闭事件连接发生错误的回调方法
    this.websock.onerror = function () {
      if (Debug) {
        this.storeLog('WebSocket连接发生错误')
      }
      // 重连
      if (!this.forceClose) {
        _this.reconnect()
      }
    }
  }
  // 重联
  handleReconnect() {
    const that = this

    setTimeout(function () {
      if (!that.forceClose) {
        const url = that.url
        that.websock = new WebSocket(url)
        that.initSocket()
      }
    }, 3000)
  }
  send(data, callback) {
    // vue里面要是销毁就传一个空的箭头函数()=>{}
    this.callback = callback
    this.websock.send(data)
  }
  close() {
    this.forceClose = true
    this.websock.close()
    clearTimeout(this.heartTimer)
    clearTimeout(this.serverTimer)
  }
  // 开启心跳
  start() {
    this.heartTimer && clearTimeout(this.heartTimer)
    this.serverTimer && clearTimeout(this.serverTimer)
    this.heartTimer = setTimeout(() => {
      this.websock.send(this.data, this.callback)
      // 超时关闭，超时时间为5s
      this.serverTimer = setTimeout(() => {
        this.websock.close()
      }, 60000)
    }, this.pingIntervalSeconds)
  }
  // 重新连接  3000-5000之间，设置延迟避免请求过多
  reconnect() {
    if (Debug) {
      this.storeLog('重连')
    }
    // 设置lockReconnect变量避免重复连接
    if (this.lockReconnect) return
    this.lockReconnect = true
    this.reconnectTimer && clearTimeout(this.reconnectTimer)
    this.reconnectTimer = setTimeout(() => {
      this.handleReconnect()
      this.lockReconnect = false
    }, parseInt(Math.random() * 2000 + 3000))
  }
  // 重置心跳
  reset() {
    clearTimeout(this.heartTimer)
    clearTimeout(this.serverTimer)
    this.start()
  }
  // 20s固定发送心跳
  sendFixHeart() {
    clearInterval(this.sendFixHeartTimer)
    this.sendFixHeartTimer = setInterval(() => {
      this.websock.send(this.data, this.callback)
    }, 50000)
  }
  // develop模式下存储一些日志到localstorage,方便定位调试
  storeLog(message) {
    if (Debug) {
      const logJson = localStorage.getItem('SocketLog')
      var data = JSON.parse(logJson) || []
      if (data.length > 50) {
        data.shift()
      }
      data.push(message || '')
      localStorage.setItem('SocketLog', JSON.stringify(data))
    }
  }
}
