import Vue from "vue"
import App from "./App"
import router from "./router/router.js"
// 添加请求拦截
import "@/utils/axios"

import "@/assets/css/reset.css"

import $showPic from "@/utils/globalFunction"
import $showVideo from "@/utils/globalFunction"
Vue.use($showPic)
Vue.use($showVideo)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
import store from "./store"
if (localStorage.getItem('code') == 10) {
  router.addRoute("home", {
    path: "/homeAdmin",
    name: "homeAdmin",
    component: () => import("@/views/homeAdmin/main.vue"),
    meta: {
      requireAuth: false, // 判断是否需要登录
    },
  });
}
router.beforeEach((to, from, next) => {
  if (to.matched.some((com) => com.meta.requireAuth)) {
    // 需要登录
    if (!sessionStorage.getItem("token")) {
      next("/login")
    }
  }
  // 不需要登录
  next()
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")

