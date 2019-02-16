let url = {
  hotLists: '/index/hotLists',
  banner: '/index/banner',
  topList: '/category/topList',
  subList: '/category/subList',
  rank: '/category/rank',
  search: '/search/list',
  details: '/goods/details',
  deal: '/goods/deal',  
  cartLists: '/cart/list',
  cartAdd: '/cart/add',
  cartReduce: '/cart/reduce',
  cartRemove: '/cart/remove',
  cartMremove: '/cart/mremove',
  addressLists: '/address/list',
  addressAdd: '/address/add',
  addressRemove: '/address/remove',
  addressUpdate: '/address/update',
  addressSetDefault: '/address/setDefault'
}


// let host = 'http://rap2api.taobao.org/app/mock/7058'

let host = 'https://www.easy-mock.com/mock/5c49c60e0ae62c756dd9b01b'

for(let key in url) {
  if(url.hasOwnProperty(key)){
    url[key] = host + url[key]
  }
}


export default url