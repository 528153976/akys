import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import home from './home.js'
const RouterModel = new VueRouter({
  base: '/akys/',
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/login',
    component: () => import('@/views/main/main.vue'),
    children: [
      ...home
    ]
  }
  ]
});

export default RouterModel