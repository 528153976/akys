import axios from 'axios';
axios.defaults.withCredentials = true;
import router from "../router/router.js"
axios.interceptors.request.use(config => {
  return config;
});

axios.interceptors.response.use(res => {
  if (res.data.status === 401 || res.data.status === 500) {
    router.replace({ path: "/login" });

  }
  return res.data;
}, err => {
  if ((err.response || {}).status === 401 || (err.response || {}).status === 500) {
    router.replace({ path: "/login" });
  }
  return Promise.reject(err);
});
export default axios;
