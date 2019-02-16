import Vue from 'vue'
import Vuex from 'vuex'
import Address from '@/modules/addressService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: null
  },
  mutations: {
    init(state,lists){
      state.lists = lists
    },
    add(state,instance){
      state.lists.push(instance)
    },
    updata(state,instance){
      let lists = JSON.parse(JSON.stringify(state.lists))
      let index = lists.findIndex(item => {
        return item.id === instance.id
      })
      lists[index] = instance
      state.lists = lists      
    },
    remove(state,id){
      let index = state.lists.findIndex(item => {
        return item.id === id 
      })
      state.lists.splice(index,1)
    },
    setDefault(state,id){
      state.lists.forEach(item => {
        item.isDefault = (item.id === id ? true : false)
      })
    }
  },
  actions: {
    getLists({commit}){
      Address.list().then(res => {
        commit('init',res.data.lists)
      })
    },
    addAction({commit},instance){
      Address.add(instance).then(res => {
        // commit('add',res.data.data)
        instance.id = res.data.id
        commit('add',instance)
      })
    },
    removeAction({commit},id){
      Address.remove(id).then(res => {
        commit('remove',id)
      })
    },
    updateAction({commit},instance){
      Address.update(instance).then(res => {
        // let data = res.data.data
        // data.id = instance.id
        // data.isDefault = instance.isDefault
        // commit('updata',data)
        commit('updata',instance)
      })
    },
    setDefaultAction({commit},id){
      Address.setDefault(id).then(res => {
        commit('setDefault',id)
      })
    }
  }
})