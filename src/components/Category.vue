<!--  -->
<template>
  <div class="container with-bottom-nav" style="min-height: 667px; height: 667px;">

    <!-- 顶部搜索栏 -->
    <div class="custom-search js-search-bar">
      <form>
        <input type="search" class="custom-search-input" autocomplete="off" name="keyword" value="" placeholder="搜索更赞的商品">
        <span class="icon-custom-search"></span>
      </form>
      <button class="custom-search-type-selection-btn">商品</button>
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


    <!-- 分类页面内容 -->
    <div class="content" style="height: 617px;">

      <!-- 左侧一级分类 -->
      <div class="class-nav">
        <div id="scroll-nav" style="height: 100%;">
          <ul class="nav" id="scroll-nav-content" style="height: 540px; transform: translate3d(0px, 0px, 0px);">
            <li 
            class="category-name js-category-name" 
            data-cid="-1"
            v-for="(list,index) in topList" 
            :key= list.id
            @click="getSubList(index,list.id)"
            :class="{active: index===topIndex}"
            >
            {{list.name}}
            </li>
          </ul>
        </div>
      </div>

      <!-- 右侧二级分类 -->
      <div class="class-category">
        <div id="scroll-main-wrap" class="main-content">

          <!-- 综合排行 -->
          <div 
          id="scroll-main-content" 
          class="js-main-content inner-content" 
          style="height: 943px; transform: translate3d(0px, 0px, 0px);" 
          v-if="topIndex === 0 && rankData"
          >
            <div class="hot-wrap">

              <!-- 热销商品榜   -->
              <div class="hot-goods">
                <div class="hot-title">
                  <p class="pull-left">热销商品榜</p>
                  <a href="https://maijia.youzan.com/mars/rank/hotgoods" class="pull-right icon-right">更多</a>
                </div>
                <ul>
                  <li class="goods-item" v-for="(hotGood,index) in rankData.hotGoods" :key="hotGood.id">
                    <a :href="'goods.html?id=' + hotGood.id">
                      <div class="thumb badge center-img">
                        <img :src="hotGood.img">
                        <span class="num">{{index + 1}}</span>
                      </div>
                      <div class="detail">
                        <div class="title">{{hotGood.name}}</div>
                        <div class="price">￥{{hotGood.price}}</div>
                        <div class="recommend">
                          <span>推荐值:</span>
                          <span>{{hotGood.recommend}}</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

              <!-- TOP店铺榜 -->
              <div class="hot-shops" style="position: relative;">
                <div class="hot-title">
                  <p class="pull-left">TOP店铺榜</p>
                  <a href="https://maijia.youzan.com/mars/rank/hotshops" class="pull-right icon-right">更多</a>
                </div>
                <ul>
                  <li class="shop-item" v-for="(hotShop,index) in rankData.hotShops" :key="hotShop.id">
                    <div class="shop-title">
                      <span class="badge">{{index + 1}}</span>
                      <a :href="hotShop.clickUrl">{{hotShop.name}}</a>
                      <span class="follows"> / 关注度: {{hotShop.follows}}</span>
                    </div>
                    <ul class="shop-images">
                      <li>
                        <a :href="hotShop.clickUrl">
                          <img :src="hotShop.imgs[0]" alt="">
                        </a>
                      </li>
                      <li>
                        <a :href="hotShop.clickUrl">
                          <img :src="hotShop.imgs[1]" alt="">
                        </a>
                      </li>
                      <li>
                        <a :href="hotShop.clickUrl">
                          <img :src="hotShop.imgs[2]" alt="">
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <!-- 热搜词 -->
              <div class="hot-keywords">
                <div class="hot-title">
                  <p class="pull-left">热搜词排行</p>
                </div>
                <ul class="keywords-list">
                  <li v-for="hotKeyword in rankData.hotKeywords" :key="hotKeyword.id">
                    <a href="javascript:;" class="js-hot-keyword">{{hotKeyword}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 普通分类 -->
          <div 
          id="scroll-main-content" 
          class="js-main-content inner-content" 
          style="height: 534px; transform: translate3d(0px, 0px, 0px);" 
          v-if="topIndex !== 0 && subList"
          >
            <h3 class="category-title">热门品牌 </h3>
            <ul class="category-content">
              <li class="category-item js-category-item" data-item-id="85" :data-item-name="brand.name"
                v-for="brand in subList.brandList" :key="brand.id"
                @click="toSearch(brand)"
              >
                <img :src="brand.img" :alt="brand.name" class="category-img">
                <span class="category-item-name">
                {{brand.name}}            
                </span>
              </li>
            </ul>
            <h3 class="category-title"> 热门分类 </h3>
            <ul class="category-content">
              <li class="category-item js-category-item" data-item-id="10" :data-item-name="category.name"
                v-for="category in subList.categoryList" :key="category.id"
                @click="toSearch(category)"
              >
                <img :src="category.img" :alt="category.name" class="category-img">
                <span class="category-item-name">
                {{category.name}}            
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      topList: null,
      topIndex: 0,
      rankData: null,
      subList: null
    };
  },
  methods: {
    getTopList(){
      this.axios.get(this.url.topList)
      .then(res => {
        this.topList = res.data.lists
      }).catch(err => {
        console.log(err)
      })
    },
    getSubList(index,id){
      this.topIndex = index

      if(index === 0){
        this.getRankData()
      }else{
        this.axios.get(this.url.subList,{id})
        .then(res => {
          this.subList = res.data.data
        }).catch(err => {
          console.log(err)
        })
      }

    },
    getRankData(){
      this.axios.get(this.url.rank)
      .then(res => {
        this.rankData = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    toSearch(list){
      location.href = `search.html?keyword=${list.name}&id=${list.id}`
    }
  },
  created(){
    this.getTopList()
    this.getSubList(0)
  }
}

</script>



<style lang='scss' scoped>
</style>