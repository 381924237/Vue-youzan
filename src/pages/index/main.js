import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import url from '@/modules/api.js'



Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.url = url
 
new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount('#app')

