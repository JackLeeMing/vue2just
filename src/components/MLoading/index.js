import directive from './src/directive'
import service from './src/index'

export default {
  install(Vue) {
    Vue.use(directive)
    Vue.prototype.$mLoading = service
  },
  directive,
  service
}
