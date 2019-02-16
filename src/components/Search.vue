<!--  -->
<template>
    <div class="container with-top-search" style="min-height: 667px;" @touchmove="move"> 

    <!-- 搜索栏 -->
    <div class="custom-search js-search-bar">
      <form>
        <input type="search" class="custom-search-input" autocomplete="off" name="keyword" :value="keyword" placeholder="搜索更赞的商品" style="padding-left: 66px;">
        <span class="icon-custom-search"></span>
      </form>
      <button class="custom-search-type-selection-btn custom-search-type-selection-btn-focus">商品</button>
      <span class="cancel">取消</span>
      <div class="search-type-dropdown-menu" style="display: none;">
        <span class="search-type-dropdown-menu-indicator">
            <i></i>
        </span>
        <div class="drop-menu-content">
          <div class="search-type-goods">
            <i class="icon-goods"></i>
            <span>商品</span>
          </div>
          <div class="search-type-dropdown-menu-divider"></div>
          <div class="search-type-shop">
            <i class="icon-shop"></i>
            <span>店铺</span>
          </div>
        </div>
      </div>
    </div>

    <div class="search-content" style="display: none;"></div>


    <!-- 主体内容 -->
    <div class="content">
      <div class="search-wrap js-waterfull-wrap">
        <ul class="js-list"

        >
          <!-- v-infinite-scroll="getSearchList"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10" -->
          <li class="goods-item" v-for="list in searchList" :key="list.id">
            <a :href="'/goods.html?id=' + list.id">
              <div class="thumb">
                <img :src="list.img">
                <i class="sell-out" v-if="list.isOut"></i>
              </div>
              <div class="detail">
                <div class="title">{{list.name}}</div>
                <div class="meta relative">
                  <span class="price">￥{{list.price | currency}}</span>
                  <span class="ship pull-right" v-if="list.isPostage">包邮</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
        
        <div class="list-finished">已经没有更多了</div>
      </div>
    </div>


    <!-- 回到顶部按钮 -->

    <GoToTop v-show="isShow"></GoToTop>

  </div>
</template>

<script>
import Vue from 'vue'
import { InfiniteScroll } from 'mint-ui';
import GoToTop from '@/components/GoToTop'
import qs from 'qs'
import mixin from '@/modules/mixin.js'

Vue.use(InfiniteScroll)

let {keyword,id} = qs.parse(location.search.slice(1))

export default {
  data () {
    return {
      searchList: null,
      loading: false,
      isShow: false,
      keyword,
      id
    };
  },
  methods: {
    getSearchList(){
      this.loading = true

      this.axios.get(this.url.search,{keyword,id})
      .then(res => {
        if(this.searchList){
          this.searchList = this.searchList.concat(res.data.lists)
        }else{
          this.searchList = res.data.lists          
        }

        this.loading = false

      }).catch(err => {
        console.log(err)
      })
    },
    move(){
      if(window.scrollY > 100){
        this.isShow = true
      }else{
        this.isShow = false
      }
    }
  },
  created(){
    this.getSearchList()
  },
  components: {
    GoToTop
  },
  mixins: [mixin]
}

</script>

<style >

</style>