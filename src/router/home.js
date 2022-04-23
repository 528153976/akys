export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      requireAuth: false, // 判断是否需要登录
    }
  },
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
  {
    path: '/homeAdmin',
    name: 'homeAdmin',
    component: () => import('@/views/homeAdmin/main.vue'),
    meta: {
      requireAuth: false, // 判断是否需要登录
    }
  }
]