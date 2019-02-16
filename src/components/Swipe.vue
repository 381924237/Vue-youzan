<!--  -->
<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="list in lists" :key="list.id">
        <a class="js-no-follow" :href="list.clickUrl">
          <img class="goods-main-photo fadeIn" :src="list.img">
        </a>
      </div>
    </div>

    <!-- 分页 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
// swiper对dom节点进行操作，dom节点什么时候生成？ mounted
// 一种方法，当接收到数据后才渲染dom
//另一种方法，watch监听数据

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'Swipe',
  data: function() {
    return {};
  },
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  mounted(){
    new Swiper('.swiper-container',{
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay: {
         delay: 3000,
      }
    })
  }
};
</script>

<style lang='scss' scoped>
.swiper-pagination {
  display: flex;
  justify-content: center;
}
</style>