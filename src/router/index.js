import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueRouter from 'vue-router'
import config from '@/config/index.js'
import constantRoutes from './constantRoutes.js'

NProgress.configure({ showSpinner: false })

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const createRouter = () => {
  return new VueRouter({
    mode: config.router.historyMode,
    routes: [...constantRoutes],
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })
}
const router = createRouter()

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  next()
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done()
})

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.isInited = false
  router.matcher = newRouter.matcher
}

export default router
