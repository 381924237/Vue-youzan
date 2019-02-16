import Vue from 'vue'
import Cart from './Cart.vue'
import axios from 'axios'
import url from '@/modules/api.js'


Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.url = url

new Vue({
  render: h => h(Cart)
}).$mount('#app')
