chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed')
})

document.addEventListener('copy', async () => {
  try {
    // 获取剪贴板中的内容
    const clipboardText = await navigator.clipboard.readText()

    // 判断是否是 URL
    if (clipboardText.startsWith('http')) {
      console.log('Copied URL:', clipboardText)

      // 解析 URL
      const url = new URL(clipboardText)
      const path = url.pathname
      const params = Object.fromEntries(url.searchParams)

      // 自定义规则：重新组装 URL（例如添加新的参数）
      const newParams = {
        ...params,
        ref: 'wechat-notify'
      }

      const newUrl = `${url.origin}${path}?${new URLSearchParams(newParams).toString()}`
      console.log('New URL:', newUrl)

      // 通过企业微信 API 发送消息
      const webhookUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=YOUR_WEBHOOK_KEY'
      const message = {
        msgtype: 'text',
        text: {
          content: `User copied URL:\nOriginal: ${clipboardText}\nNew: ${newUrl}`
        }
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      })

      if (response.ok) {
        console.log('Message sent successfully to WeChat.')
      } else {
        console.error('Failed to send message:', await response.text())
      }
    }
  } catch (error) {
    console.error('Error handling copy event:', error)
  }
})
