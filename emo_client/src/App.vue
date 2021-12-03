<template>
  <!-- <router-view /> -->
    <!--缓存部分页面或者组件-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    <ChangeTheme/> 
    <BackTop />   
    
</template>

<script>

import ChangeTheme from '@/components/ChangeTheme';
import BackTop from '@/components/BackTop';

export default {
  name: 'App',
  components: {
    ChangeTheme,BackTop
  },
  setup(){
        
    }
}
</script>

<style lang="scss" >

 html,body {
   margin: 0;
   color: var(--maincolor);
   background: var(--mainbgcolor);
 }

</style>
