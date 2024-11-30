/*
 * @Author: Smartbow
 * @Desc: axios的请求头，用于添加网关需要的userId和token自定义请求头
 * */
import axios from 'axios'
import config from '@/config/index.js'
import store from '@/store/index.js'
// // 本地调试的 token 复制粘贴到此处 不需要登录
// const token = ''
const videoToken = config.videoToken || '3e80d1762a324d5b0ff636e0bd16f1e3'
const requestInterceptorFunc = function (config) {
  const storeToken = store.getters.token
  const access_token = storeToken
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`
  }
  config.headers['token'] = videoToken
  config.metadata = { startTime: Date.now() }
  return config
}
const requestInterceptorError = function (error) {
  return Promise.reject(error)
}

const reponseInterceptorFunc = function (response) {
  return response
}

const reponseInterceptorError = function (error) {
  return Promise.reject(error)
}
// request拦截器
axios.interceptors.request.use(requestInterceptorFunc, requestInterceptorError)
// respone拦截器
axios.interceptors.response.use(reponseInterceptorFunc, reponseInterceptorError)

export default {
  requestInterceptorFunc,
  reponseInterceptorFunc
}
