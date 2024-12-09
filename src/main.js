import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/index.js'
import store from './store'
import './filter'
import './components/vantUI.js'
import './components/ElementUI.js'
import './style/element-variables.scss'
import '@vant/touch-emulator'
import '@/icons/index'

import styles from '@/style/test.module.scss'
console.log(styles)

Vue.config.productionTip = false

//首先我们获得视口高度并将其乘以1%以获得1vh单位的值
let vh = window.innerHeight * 0.01
// 然后，我们将——vh自定义属性中的值设置为文档的根
document.documentElement.style.setProperty('--vh', `${vh}px`)
// 监听resize事件 视图大小发生变化就重新计算1vh的值
window.addEventListener('resize', () => {
  // 我们执行与前面相同的脚本
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
})

const app = new Vue({
  data: {
    bus: new Vue(),
    count: 121
  },
  router,
  store,
  render: h => h(App)
}).$mount('#appRoot')

export default app
