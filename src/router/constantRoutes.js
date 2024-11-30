const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/audio'
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
    path: '/404',
    component: () => import(/* webpackChunkName: "page404" */ '@/page/404/index.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default routes
