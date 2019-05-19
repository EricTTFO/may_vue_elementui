<template>
  <div id="app">
<!--    <Header/>-->
    <keep-alive>
      <router-view/>
    </keep-alive>
<!--    <Footer/>-->
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>

