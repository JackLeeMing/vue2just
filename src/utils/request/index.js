import config from '@/config/index.js'
import axios from 'axios'
import qs from 'qs'
import './interceptor.js'
const requestTimeout = config.requestTimeout || 300000
axios.defaults.timeout = requestTimeout

export default async ({ type = 'GET', url, data = null, progress = null, source = null }) => {
  // 大写
  type = type.toUpperCase()
  const requestConfig = {
    url: url,
    method: type,
    withCredentials: false,
    timeout: requestTimeout
  }
  if (source) {
    requestConfig.cancelToken = source.token
  }

  switch (type) {
    case 'GET':
      Object.assign(requestConfig, {
        serialize: function (params) {
          return qs.stringify(params, {
            arrayFormat: 'repeat'
          })
        },
        params: data
      })
      break
    case 'DOWNLOAD':
      Object.assign(requestConfig, {
        url: url,
        method: 'GET',
        serialize: function (params) {
          return qs.stringify(params, {
            arrayFormat: 'repeat'
          })
        },
        params: data,
        headers: {
          'Content-Type': 'application/json,charset=utf-8'
        },
        responseType: 'arraybuffer'
      })
      break
    case 'POSTDOWNLOAD':
      Object.assign(requestConfig, {
        url: url,
        data: data,
        method: 'POST',
        responseType: 'arraybuffer'
      })
      break
    case 'PATCH':
    case 'POST':
      Object.assign(requestConfig, {
        data: data
      })
      break
    case 'PUT':
      Object.assign(requestConfig, {
        data: data
      })
      break
    case 'DELETE':
      Object.assign(requestConfig, {
        data: data
      })
      break
    // 自定义请求类型，为了修改 headers 头
    case 'UPLOAD':
      Object.assign(requestConfig, {
        url: url,
        data: data,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: false
      })
      if (progress && typeof progress === 'function') {
        Object.assign(requestConfig, {
          onUploadProgress: progressEvent => {
            // 进度
            progress(progressEvent)
          }
        })
      }
      break
    // 自定义请求类型，为了修改 headers 头
    case 'UPLOAD_MPEG':
      Object.assign(requestConfig, {
        url: url,
        data: data,
        method: 'POST',
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data'
          // Accept: 'audio/mpeg'
        },
        withCredentials: false
      })
      if (progress && typeof progress === 'function') {
        Object.assign(requestConfig, {
          onUploadProgress: progressEvent => {
            // 进度
            progress(progressEvent)
          }
        })
      }
      break
    default:
      break
  }
  return await axios(requestConfig)
}
