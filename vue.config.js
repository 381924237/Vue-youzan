module.exports = {
  pages: {
    index: {
      entry: 'src/pages/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '发现朋友圈的推荐' 
    },
    category: {
      entry: 'src/pages/category/category.js',
      template: 'public/category.html',
      filename: 'category.html',
      title: '分类'
    },
    search: {
      entry: 'src/pages/search/search.js',
      template: 'public/search.html',
      filename: 'search.html',
      title: '列表'
    },
    cart: {
      entry: 'src/pages/cart/cart.js',
      template: 'public/cart.html',
      filename: 'cart.html',
      title: '购物车'
    },
    member: {
      entry: 'src/pages/member/member.js',
      template: 'public/member.html',
      filename: 'member.html',
      title: '我'
    },
    goods: {
      entry: 'src/pages/goods/goods.js',
      template: 'public/goods.html',
      filename: 'goods.html',
      title: '商品详情'
    }
  },
  devServer: {
    host: 'localhost'
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}