import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import home from './home.js'
const RouterModel = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    redirect: '/login',
    component: () => import('@/views/main/main.vue'),
    children: [
      ...home
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      requireAuth: false, // 判断是否需要登录
    }
  },
  ]
});

export default RouterModel