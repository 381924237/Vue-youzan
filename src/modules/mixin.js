let mixin = {
  filters: {
    currency(price){
      let priceStr = '' + price
      if(priceStr.indexOf('.') > -1){
        let arr = priceStr.split('.')
        return arr[0] + '.' + (arr[1] + '0').slice(0,2)
      }else{
        return priceStr + '.00'
      }
    }
  }
}

export default mixin