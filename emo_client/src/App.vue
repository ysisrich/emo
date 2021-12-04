<template>
  <!-- <router-view /> -->
    <!--缓存部分页面或者组件-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    <ChangeTheme/> 
    <BackTop /> 
    <Record />  
    
</template>

<script>

import ChangeTheme from '@/components/ChangeTheme';
import BackTop from '@/components/BackTop';
import Record from './components/Record.vue';

export default {
  name: 'App',
  components: {
    ChangeTheme,BackTop,Record
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

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
	width: 6px;
	height: 3px !important;
	background-color: #F5F5F5;
}
 
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}
 
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}

</style>
