<template>
  <div class="_default-head" :style="{height:flag ? '250px' :'80px'}">
    <div class="_default-head-fixed"><Header /></div>
    <Search v-if="flag" :isShowLogo="true"/>
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
  import { useRoute } from 'vue-router';
import { ref, watch } from '@vue/runtime-core';


	export default {
		components:{
        Header,Content,Footer,Search
    },
    setup(){
      const route = useRoute()

      let flag = ref(route.path.includes('index'))

      watch(()=>route.path,()=>{
        flag.value = route.path.includes('index')
      })


      return {
        flag
      }
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
