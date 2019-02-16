import Vue from 'vue'
import Member from './member.vue'
import router from './router/router'
import store from './store/store'

new Vue({
  router,
  store,
  render: h => h(Member)
}).$mount('#app')