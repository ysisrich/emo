<template>
  <div class="default-head">
    <div class="default-head-fixed"><Header /></div>
    <Search />
  </div>
  <div class="default-container">
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
    .default-head{
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
	.default-container{
        width: 1205px;
        margin: auto;
        background: var(--mainbgcolor);
    }
</style>
