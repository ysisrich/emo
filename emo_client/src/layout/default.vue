<template>
  <div class="_default-head">
    <div class="_default-head-fixed"><Header /></div>
    <Search />
  </div>
  <div class="_default-container">
    <Content />
  </div>
  <Footer />   
</template>


<script>
	import Header from '@/components/Header'
	import Content from '@/components/Content'
	import Footer from '@/components/Footer'
  import Search from '@/components/Search.vue';
	export default {
		components:{
        Header,Content,Footer,Search
    }
		
		
	};
</script>
<style lang="scss" scoped>
    ._default-head{
        width: 100%;
        height: 250px;
        background: var(--headerbgcolor);
        &-fixed{
          width: 100%;
          background: var(--headerbgcolor);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 98;
        }
    }
	._default-container{
        width: 1205px;
        margin: auto;
        background: var(--mainbgcolor);
    }
</style>
