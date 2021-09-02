import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import { Loading, Message } from 'element-ui'
import '../plugin/element-ui'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
axios.defaults.baseURL = 'http://47.107.168.125:8101'
let loadingIns = null
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  loadingIns = Loading.service()
  config.headers.token = store.state.Users.token
  return config;
}, function (error) {
  // Do something with request error
  loadingIns.close()
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if(response.data.code !== 0) {
    Message.error(response.data.msg)
  }
  loadingIns.close()
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  loadingIns.close()
  return Promise.reject(error);
});

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
