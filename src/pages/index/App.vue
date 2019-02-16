<template>
  <div id="index">
    <Recommend></Recommend> 
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Recommend from '@/components/Recommend'

export default {
  name: 'App',
  components: {
    Footer,Recommend
  }
}
</script>

<style>
  @import url('./assets/common.css');
  @import url('./assets/index.css');
</style>
