<template>
  <div class="container with-bottom-nav" style="min-height: 667px;">
    <div class="content">

      <!-- 轮播 -->
      <!-- <div class="js-image-swiper custom-image-swiper  custom-image-swiper-single" data-images="1"> -->
        <Swipe :lists="bannerLists" v-if="bannerLists"></Swipe>
      <!-- </div> -->
      

      <!-- <a href="https://maijia.youzan.com/mars/notice/detail?id=" class="notice"></a> -->


      <!-- 优店推荐 -->
      <div class="section-title">优店推荐</div>
      <div class="section-content shops">
        <div class="shop-wrap">
          <div class="shop-item">
            <a href="https://h5.koudaitong.com/v2/showcase/feature?alias=zjtozpgn">
              <img class="fadeIn" src="https://img.yzcdn.cn/upload_files/2016/09/23/FgQUVNXnvpFKFl1DIN2LXhPA1cxy.png?imageView2/2/w/300/h/0/q/75/format/png">
            </a>
          </div>
          <div class="shop-item">
            <a href="https://h5.koudaitong.com/v2/feature/1e22e3vtu">
              <img class="fadeIn" src="https://img.yzcdn.cn/upload_files/2016/08/03/FqNGnCQS1eq9nIhRg48E_UfFf9K2.png?imageView2/2/w/300/h/0/q/75/format/png">
            </a>
          </div>
          <div class="shop-item">
            <a href="https://h5.koudaitong.com/v2/feature/8oups7zk">
              <img class="fadeIn" src="https://img.yzcdn.cn/upload_files/2016/08/05/Fv5hhMZrtPZQWE7fape0ddEYtSuy.png?imageView2/2/w/300/h/0/q/75/format/png">
            </a>
          </div>
        </div>
      </div>
      <div class="section-content daily">
        <ul>
        </ul>
      </div>

      <!-- 推荐商品列表 -->
      <div class="line-block line-block-gray">
        <div class="lineblock-title">
          <span class="lineblock-font">最热商品推荐</span>
        </div>
      </div>

      <div class="hot-goods js-waterfull-wrap" data-src="">   
        <ul class="js-list js-lazy" data-src=""
          v-infinite-scroll="getList"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
        >
          <li v-for="list in lists" :key="list.id">
            <div class="goods-item">
              <a :href="'goods.html?id=' + list.id">
                <div class="thumb img-box">
                  <img class="fadeIn" :src="list.img">
                </div>
                <div class="detail">
                  <div class="title">{{list.name}}</div>
                  <div class="price">￥{{list.price}}</div>
                </div>
              </a>
            </div>
          </li>
        </ul>
        <div class="loading-more" v-show="loading"><span></span></div>
      </div>

      <div class="js-show-find category-guid" style="display: none;"></div>
    </div>
  </div>  
</template>

<script>
import Vue from 'vue'
import { InfiniteScroll } from 'mint-ui';
import Swipe from '@/components/Swipe'

Vue.use(InfiniteScroll)  //下拉加载

export default {
  name: 'Recommend',
  data: function(){
    return{
      lists: null,
      pageNum: 1,
      loading: false,
      allLoaded: false,
      bannerLists: null
    }
  },
  components: {
    Swipe
  },
  methods: {
    getList(){
      if(this.allLoaded) return
      this.loading = true

      // this.axios.get('https://www.easy-mock.com/mock/5c39e0d3cbbb0462fb0e2784/example/mock'
      // )

      this.axios.get(this.url.hotLists,{
        pageNum: this.pageNum,
        pageSize: 6
      }).then(res => {
        let currentLists = res.data.lists
        if(this.lists){
          this.lists = this.lists.concat(currentLists) 
        }else{
          this.lists = currentLists //第一次请求数据
        }

        // console.log(currentLists)
        // console.log(this.lists)
        
        this.loading = false
        this.pageNum++
        
        if(currentLists < 6){
          this.allLoaded = true
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getBanner(){
      this.axios.get(this.url.banner)
      .then(res => {
        // console.log(res.data.lists)
        this.bannerLists = res.data.lists
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created(){
    this.getList()
    this.getBanner()
  }
}
</script>

<style <style scoped>

</style>
