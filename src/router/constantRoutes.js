const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/test'
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
