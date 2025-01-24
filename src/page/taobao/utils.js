export function parseUrl(url) {
  // 使用内置的 URL 类解析 URL
  const parsedUrl = new URL(url)

  // 提取协议、主机、端口、路径、查询参数
  const protocol = parsedUrl.protocol // 协议，例如 'https:'
  const host = parsedUrl.host // 主机，例如 'example.com:8080'
  const hostname = parsedUrl.hostname // 仅域名，例如 'example.com'
  const port = parsedUrl.port || '80' // 端口，如果没有则为默认 80
  const path = parsedUrl.pathname // 路径，例如 '/path/to/page'

  // 转换查询参数为字典
  const queryParams = {}
  parsedUrl.searchParams.forEach((value, key) => {
    queryParams[key] = value
  })

  // 去掉查询参数后的 URL
  const urlWithoutQuery = `${protocol}//${host}${path}`

  // 返回结果
  return {
    protocol,
    host,
    hostname,
    port,
    path,
    queryParams,
    urlWithoutQuery
  }
}

export function parseRawUrl(url) {
  // 使用内置的 URL 类解析 URL
  const parsedUrl = new URL(url)

  // 提取协议、主机、端口、路径、查询参数
  const protocol = parsedUrl.protocol // 协议，例如 'https:'
  const host = parsedUrl.host // 主机，例如 'example.com:8080'
  const hostname = parsedUrl.hostname // 仅域名，例如 'example.com'
  const port = parsedUrl.port || '80' // 端口，如果没有则为默认 80
  const path = parsedUrl.pathname // 路径，例如 '/path/to/page'

  // 转换查询参数为字典（保留原始字符串值）
  const queryParams = {}
  const rawQueryString = parsedUrl.search.slice(1) // 去掉 '?' 部分
  rawQueryString.split('&').forEach(pair => {
    const [key, value] = pair.split('=')
    if (key) {
      queryParams[key] = value || '' // 保留原始编码的值
    }
  })

  // 去掉查询参数后的 URL
  const urlWithoutQuery = `${protocol}//${host}${path}`

  // 返回结果
  return {
    protocol,
    host,
    hostname,
    port,
    path,
    queryParams,
    urlWithoutQuery
  }
}
