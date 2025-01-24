const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/taobao'
  },
  {
    path: '/taobao',
    name: 'Taobao',
    component: () => import(/* webpackChunkName: "taobao" */ '@/page/taobao/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/page/login/index.vue')
  },
  {
    path: '/zdog',
    name: 'ZDog',
    component: () => import(/* webpackChunkName: "zdog" */ '@/page/zdog/index.vue')
  },
  {
    path: '/card',
    name: 'CardPage',
    component: () => import(/* webpackChunkName: "cardPage" */ '@/page/card/index.vue')
  },
  {
    path: '/css',
    name: 'CssPage',
    component: () => import(/* webpackChunkName: "cssPage" */ '@/page/css/index.vue')
  },
  {
    path: '/test',
    name: 'TestPage',
    component: () => import(/* webpackChunkName: "testPage" */ '@/page/test/index.vue')
  },
  {
    path: '/audio',
    name: 'TestAudio',
    component: () => import(/* webpackChunkName: "testAudio" */ '@/page/audio/index.vue')
  },
  {
    path: '/single',
    name: 'Single',
    component: () => import(/* webpackChunkName: "single" */ '@/page/single/index.vue')
  },
  {
    path: '/heavy',
    name: 'Heavy',
    component: () => import(/* webpackChunkName: "heavy" */ '@/page/heavy/index.vue')
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "page404" */ '@/page/404/index.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default routes
