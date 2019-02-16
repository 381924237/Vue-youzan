<template>
  <div class="container" style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <a class="block-item js-address-item address-item"
        :class="{'address-item-default':list.isDefault}"
        v-for="list in lists" 
        :key="list.id"
        @click="toEdit(list)"
      >
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link
        class="btn btn-blue js-no-webview-block js-add-address-btn"
        :to="{name: 'form', query:{type: 'add'}}"
      >新增地址
      </router-link>
    </div>
  </div>
</template>

<script>
import Address from '@/modules/addressService.js'

export default {
  data() {
    return {
      // lists: null
    }
  },
  methods: {
    toEdit(list){
      this.$router.push({
        name: 'form',
        query: {
          type: 'edit',
          instance: list
        }
      })
    }
  },
  created(){
    if(!this.lists){
      this.$store.dispatch('getLists')
    }
  },
  computed: {
    lists(){
      return this.$store.state.lists
    }
  }
};
</script>

<style>
</style>