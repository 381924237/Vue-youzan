<template>
  <div id="category">
    <Category></Category>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Category from '@/components/Category'

export default {
  components: {
    Footer,Category
  }  
}
</script>


<style>
  @import url('./assets/common.css');
  @import url('./assets/category.css');
</style>
