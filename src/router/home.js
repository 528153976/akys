export default [

  {
    path: '/homePage',
    name: 'homePage',
    component: () => import('@/views/homePage/main.vue'),
    meta: {
      requireAuth: false, // 判断是否需要登录
    }
  },
  {
    path: '/homeInfo',
    name: 'homeInfo',
    component: () => import('@/views/homePage/homeInfo.vue'),
    meta: {
      requireAuth: false, // 判断是否需要登录
    }
  },

]