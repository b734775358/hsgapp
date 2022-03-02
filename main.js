import App from './App'
import baseConfig from './config/index.config.js'

// #ifndef VUE3
import Vue from 'vue'

import bus from './utils/event'

Vue.prototype.$event = bus

Vue.prototype.$baseConfig = baseConfig;

import request from '@/utils/request.js'
Vue.prototype.$http = request
Vue.prototype.$statusBarHeight = uni.getSystemInfoSync().statusBarHeight
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif