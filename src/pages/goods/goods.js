import Vue from 'vue'
import Goods from './Goods.vue'
import axios from 'axios'
import url from '@/modules/api.js'

Vue.prototype.axios = axios
Vue.prototype.url = url

new Vue({
  render: h => h(Goods)
}).$mount('#app')