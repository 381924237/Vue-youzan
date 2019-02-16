<!--  -->
<template>
  <div id="cart">

    <div class="container" style="min-height: 581px;">

       <!-- 主体内容 -->
      <div class="content clearfix js-page-content">


        <div id="cart-container">
          <div>

            <!-- 购物车商品列表 -->
            <div class="js-shop-list shop-list">

              <div class="block block-order block-cart" v-for="(shop,shopIndex) in lists" :key="shop.id">

                <!-- 头部信息（店铺名、编辑） -->
                <div class="header">
                  <div class="select-group js-select-group" @click="selectShop(shop)"> 
                    <span class="check" :class="{checked:editingShop ? shop.removeChecked : shop.checked}"></span>
                  </div>
                  <a class="shop-title">
                    <i class="custom-store-img">店铺：</i>{{shop.shopTitle}}
                  </a>
                  <a
                    data-type="cart"
                    class="j-edit-list pull-right c-blue font-size-12 edit-list"
                    @click="edit(shop,shopIndex)"
                  >
                    {{shop.editingMsg}}
                  </a>
                </div>

                <!-- 商品信息、显示状态、编辑状态 -->
                <div>
                  <ul class="js-list block block-list block-list-cart border-0">

                    <li class="block-item block-item-cart" 
                      v-for="(good,goodIndex) in shop.goodsList" 
                      :key="good.id"
                      :class="{editing:shop.editing}"
                      @touchstart="start($event,good)"
                      @touchend="end($event,shopIndex,good,goodIndex)"
                      @touchmove="move($event,shopIndex,good,goodIndex)"
                      :ref="'goods-' + shopIndex + '-' + goodIndex"
                    >
                      <div>
                        <div class="check-container" @click="selectGood(good,shop)">
                          <span class="check" :class="{checked:editingShop ? good.removeChecked : good.checked}"></span>
                        </div>
                        <div class="name-card clearfix">

                          <a class="thumb js-goods-link">
                            <img
                              data-src="https://img.yzcdn.cn/upload_files/2017/07/12/FkSvYz8FLLD9-t0smXO43hF6ov7S.jpg!200x200.jpg"
                              class="js-lazy"
                              :src="good.image"
                            >
                          </a>

                          <div class="detail">
                            <a class="js-goods-link">
                              <h3 class="title js-ellipsis">
                                <i>{{good.title}}</i>
                              </h3>
                            </a>
                            <p class="sku ellipsis">{{good.sku}}</p>

                            <!-- 显示状态 -->
                            <div class="num" v-show="!shop.editing">×
                              <span class="num-txt">{{good.number}}</span>
                            </div>

                            <!-- 编辑状态 -->
                            <div class="num" v-show="shop.editing">
                              <div class="quantity">
                                <button type="button" class="minus" :class="{disabled: good.number === 1}"></button>
                                <input 
                                  type="text" 
                                  pattern="[0-9]*" 
                                  class="txt" 
                                  v-model.number.lazy="good.number"
                                  @change="changeNum(good)"
                                >
                                <button type="button" class="plus "></button>
                                <div class="response-area response-area-minus" @click="reduce(good)"></div>
                                <div class="response-area response-area-plus" @click="add(good)"></div>
                              </div>
                            </div>

                            
                            <div class="price c-orange">¥
                              <span>{{good.price | currency}}</span>
                            </div>
                          </div>

                          <div class="error-box"></div>

                        </div>
                        <div class="delete-btn" @click="remove(shop,shopIndex,good,goodIndex)">
                          <span>删除</span>
                        </div>
                      </div>
                    </li>

                  </ul>
                </div>

              </div>

            </div>

            <!-- 无法一起购买的商品 -->
            <div class="js-invalid-goods shop-list">
              <p class="block invalid-list-title">以下商品无法一起购买</p>
              <div class="block block-list-cart block-order border-top-0">
                <ul class="block border-0 invalid-list js-invalid-list">
                  <li class="block-item block-item-cart error">
                    <div index="0">
                      <div class="check-container hide">
                        <span class="check"></span>
                      </div>
                      <div class="name-card clearfix">
                        <a
                          href="https://h5.youzan.com/v2/showcase/goods?alias=36co1k2m80lmu"
                          class="thumb js-goods-link"
                        >
                          <img
                            data-src="https://img.yzcdn.cn/upload_files/2017/06/29/FstNOp77JZHQjZIDFd5LlZYE3j_j.jpg!200x200.jpg"
                            class="js-lazy"
                            src="https://img.yzcdn.cn/upload_files/2017/06/29/FstNOp77JZHQjZIDFd5LlZYE3j_j.jpg?imageView2/2/w/200/h/200/q/75/format/webp"
                          >
                          <!---->
                        </a>
                        <div class="detail">
                          <a
                            href="https://h5.youzan.com/v2/showcase/goods?alias=36co1k2m80lmu"
                            class="js-goods-link"
                          >
                            <h3 class="title js-ellipsis">
                              <i>国际安徒生奖大奖书系（文学作品系列第二辑 共8册） 国际安徒生奖获奖书系 是经过IBBY各国分会和丛书主编、著名儿童文学理论家方卫平教授层层筛选产生的经典佳作</i>
                            </h3>
                          </a>
                          <p class="sku ellipsis">下周二发货</p>
                          <div class="num">×
                            <span class="num-txt">1</span>
                            <!---->
                          </div>
                          <!---->
                        </div>
                        <div class="error-box">商品已售罄</div>
                      </div>
                      <div class="delete-btn">
                        <span>删除</span>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="center clear-block">
                  <button class="btn clear-btn js-clear">清空失效商品</button>
                </div>
              </div>
            </div>

            <!-- 底部（删除、全选） -->
            <div style="padding:0;" class="js-bottom-opts bottom-fix">
              <div class="go-shop-tip js-go-shop-tip c-orange font-size-12">你需要分开结算每个店铺的商品哦~</div>
              <div class="bottom-cart clear-fix">
                <div class="select-all" @click="selectAll()">
                  <span class="check" :class="{checked:editingShop ? allRemoved : allSelected}"></span> 全选
                </div>


                <!-- 显示状态（结算） -->
                <div class="total-price" v-show="!editingShop">
                  合计：¥
                  <span class="js-total-price" style="color: rgb(255, 102, 0);">{{totalPrice | currency}}</span>
                  <p class="c-gray-dark">不含运费</p>
                </div>
                <button v-show="!editingShop"
                  href="javascript:;"
                  class="js-go-pay btn btn-orange-dark font-size-14"
                  :disabled="!selectedLists.length"
                >
                结算 ({{selectedLists.length}})
                </button>


                <!-- 编辑状态（删除） -->
                <button 
                  v-show="editingShop"
                  href="javascript:;"
                  :disabled="!removeLists.length"
                  class="j-delete-goods btn font-size-14 btn-red"
                  @click="removeList"
                >
                删除
                </button>
              </div>
            </div>

          </div>
        </div>


      </div>


      <!-- 阴影层 -->
      <div 
        v-show="removePopup"
        id="0SuefKPV4p" 
        style="height: 100%; position: fixed; top: 0px; left: 0px; right: 0px; background-color: rgba(0, 0, 0, 0.7); z-index: 1000;  opacity: 1;"
      >
      </div>
 
      <!-- 删除商品弹窗 -->
      <div 
        v-show="removePopup"
        id="d2tfiX27YS" 
        class="popout-confirm popout-box" 
        style="overflow: hidden; position: fixed; z-index: 1000; top: 50%; left: 50%; transform: translate3d(-50%, -50%, 0px); visibility: visible; border-radius: 4px; background: white; width: 270px; padding: 15px; opacity: 1;"
      >
        <div class="confirm-content" style="line-height: 20px; padding: 5px 5px 10px;">
          {{removeMsg}}
        </div>
        <hr style="margin: 9px -15px 10px;">
        <div class="btn-2-1" style="width: 47.5%;">
          <p class="js-cancel center font-size-16" style="padding-top: 5px;" @click="removePopup = false">取消</p>
        </div>
        <div class="btn-2-1" style="width: 47.5%;">
          <p class="js-ok center c-green font-size-16" style="padding-top: 5px;" @click="removeConfirm">确定</p>
        </div>
      </div>

    </div>



    <!-- 底部版权 -->
    <!-- <div class="footer" style="min-height: 86px;">
      <div class="copyright">
        <div
          class="ft-copyright"
          style="background-image: url(https://img.yzcdn.cn/upload_files/2016/11/15/147918630760182374.png);"
        >
          <a class="yz-logo" href="https://www.youzan.com/?from_source=support_logo">有赞提供技术支持</a>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script>
import mixin from '@/modules/mixin.js'
import Anime from 'animejs'

export default {
  data() {
    return {
      lists: null,
      totalPrice: 0,
      editingShop: null,
      editingIndex: -1,
      removePopup: false,
      removeData: null,
      removeMsg: ''
    }
  },
  computed: {
    allSelected: {
      get(){
        if(this.lists && this.lists.length){
          return this.lists.every(shop => {
            return shop.checked
          })
        }else{
          return false
        }
      },
      set(newVal){
        this.lists.forEach(shop => {
          shop.checked = newVal
          shop.goodsList.forEach(good => {
            good.checked = newVal
          })
        })
      }
    },
    allRemoved: {
      get(){
        if(this.editingShop){
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newVal){
        if(this.editingShop){
          this.editingShop.removeChecked = newVal
          this.editingShop.goodsList.forEach(good => {
            good.removeChecked = newVal
          })
        }
      }
    },
    selectedLists(){
      if(this.lists && this.lists.length){
        let arr = []
        let total = 0 
        this.lists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if(good.checked){
              arr.push(good)
              total += (good.price * good.number) 
            }
          })
        })

        this.totalPrice = total
        return arr 
      }

      return []
    },
    removeLists(){
      if(this.editingShop) {
        let arr = []
        this.editingShop.goodsList.forEach(good => {
          if(good.removeChecked){
            arr.push(good)
          }
        })
        return arr
      }
      
      return []
    }
  },  
  methods: {
    getCartLists(){
      this.axios.get(this.url.cartLists)
        .then(res => {
          let lists = res.data.cartList
          lists.forEach(shop => {
            shop.editing = false
            shop.checked = true
            shop.removeChecked = false
            shop.editingMsg =  '编辑'
            shop.goodsList.forEach(good => {
              good.checked = true
              good.removeChecked = false
            })
          })
          this.lists = lists
        }).catch(err => {
          console.log(err)
        })
    },
    selectGood(good,shop){
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      good[attr] = !good[attr]
      shop[attr] = shop.goodsList.every(good => {
        return good[attr]
      })
    },
    selectShop(shop){
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      shop[attr] = !shop[attr]
      shop.goodsList.forEach(good => {
        good[attr] = shop[attr]
      })
    },
    selectAll(){
      let attr = this.editingShop ? 'allRemoved' : 'allSelected'
      this[attr] = !this[attr]
    },
    edit(shop,shopIndex){
      shop.editing = !shop.editing
      shop.editingMsg = shop.editing ? '完成' : '编辑'
      this.lists.forEach((item,i) => {
        if(shopIndex !== i){
          item.editing = false
          item.editingMsg = shop.editing ? '' : '编辑'
        }
      })

      this.editingShop = shop.editing ? shop : null
      this.editingIndex = shop.editing ? shopIndex : -1

      for(let key in this.$refs){
        this.$refs[key][0].style.transform = 'translateX(0px)'
      }
      // console.log(this.$refs)
    },
    add(good){
      this.axios.post(this.url.cartAdd,{
        id: good.id,
        number: 1
      }).then(res => {
        if(res.data.status === 200){
          good.number++
        }
      })
    },
    reduce(good){
      if(good.number === 1) return
      this.axios.post(this.url.cartReduce,{
        id: good.id,
        number: 1
      }).then(res => {
        if(res.data.status === 200){
          good.number--
        }
      })
    },
    changeNum(good){
      let number = Math.floor(Number(good.number))
      this.axios.post(this.url.cartAdd,{
        id: good.id,
        number
      }).then(res => {
        if(number <= 0 || !number){
          good.number = 1
        }else{
          good.number = number
        }
      })

    },
    remove(shop,shopIndex,good,goodIndex) {
      this.removePopup = true
      this.removeData = {shop,shopIndex,good,goodIndex}
      this.removeMsg = '确定要删除该商品吗？'
    },
    removeList(){
      this.removePopup = true
      this.removeMsg = `确定将所选 ${this.removeLists.length} 个商品删除？`
    },
    removeConfirm(){
      if(this.removeMsg === '确定要删除该商品吗？'){
        let {shop,shopIndex,good,goodIndex} = this.removeData
        this.axios.post(this.url.cartRemove,{
          id: good.id
        }).then(res => {
          if(res.data.status === 200){
            shop.goodsList.splice(goodIndex,1)
            if(!shop.goodsList.length){
              this.lists.splice(shopIndex,1)
              this.removeShop()
            }
          }

          this.removePopup = false
        })        
      }else{
        let ids = []
        this.removeLists.forEach(good => {
          ids.push(good.id)
        })

        this.axios.post(this.url.cartMremove,{
          ids
        }).then(res => {
          if(res.data.status === 200){
            let arr = []
            this.editingShop.goodsList.forEach(good => {
              let index = this.removeLists.findIndex(item => {
                return item.id === good.id
              })

              if(index === -1){
                arr.push(good)
              }
            })

            if(arr.length){
              this.editingShop.goodsList = arr
            }else{
              this.lists.splice(this.editingIndex,1)
              this.removeShop()
            }
          }

          this.removePopup = false
        })
      }

    },
    removeShop(){
      this.editingShop = null
      this.editingIndex = -1
      this.lists.forEach(shop => {
        shop.editing = false
        shop.editingMsg = '编辑'
      })
    },
    start(e,good){
      good.startX = e.changedTouches[0].clientX
    },
    move(e,shopIndex,good,goodIndex){
      good.moveX = e.changedTouches[0].clientX - good.startX 
      if(good.moveX > 0 || this.editingShop) return

      // Anime({
      //   targets: this.$refs[`goods-${shopIndex}-${goodIndex}`],
      //   translateX: `${good.moveX > -60 ? good.moveX : -60 + 0.4 * (good.moveX + 60)}`,
      // })
      // console.log( this.$refs[`goods-${shopIndex}-${goodIndex}`])
      this.$refs[`goods-${shopIndex}-${goodIndex}`][0].style.transform = `translateX(${good.moveX > -60 ? good.moveX : -60 + 0.4 * (good.moveX + 60)}px)`
    }, 
    end(e,shopIndex,good,goodIndex){
      if(this.editingShop) return

      let endX = e.changedTouches[0].clientX
      let left = 0
      if(good.startX - endX > 100){
        left = -60
      }else if(endX - good.startX > 100){
        left = 0
      }
      
      // console.log(good.startX - endX)
      // Velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`],{left})

      Anime({
        targets: this.$refs[`goods-${shopIndex}-${goodIndex}`],
        translateX: left,
        duration: 300,
        easing: 'easeOutQuad'
      })
    }
  },
  created(){
    this.getCartLists()
  },
  mixins: [mixin]
};
</script>

<style lang='scss' scoped>
@import url("./assets/cart_base.css");
@import url("./assets/cart_trade.css");
@import url("./assets/cart.css");
</style>