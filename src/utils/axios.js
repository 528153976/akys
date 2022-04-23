import axios from 'axios';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['X-Gisq-Token'] = "Bearer " + token;
  }
  return config;
});

axios.interceptors.response.use(res => {
  if (res.data.status === 401) {
    sessionStorage.removeItem('token');
  }
  return res.data;
}, err => {
  if ((err.response || {}).status === 401) {
    sessionStorage.removeItem('token');
  }
  return Promise.reject(err);
});
export default axios;
