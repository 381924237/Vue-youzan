import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index.vue'
import Address from '../components/address.vue'
import All from '../components/all.vue'
import Form from '../components/form.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/address',
      component: Address,
      children: [
        {
          path: '',
          component: All,
          name: 'all'
        },
        {
          path: 'all',
          component: All,
          name: 'all'
        },
        {
          path: 'form',
          component: Form,
          name: 'form'
        }
      ]
    }
  ]
})