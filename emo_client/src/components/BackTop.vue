<template>
    <span v-show="data.goTopShow"  @click="goTop">
        <img  src="@/assets/img/icon/back.png" alt="返回顶部">
    </span>
</template>

<script>
import { onMounted, reactive, watch  } from 'vue';

import {handleScroll,Scroll} from '../hooks/handleScroll'
export default {
  name: 'BackTop',
  setup(){
        let data = reactive({
            scrollTop: '',
            goTopShow: false,
            timer:null
        })

        const goTop = ()=> Scroll(data)

        onMounted(()=>{
            window.addEventListener('scroll', ()=>handleScroll(data))
        })
        watch(()=>data.scrollTop,(o,n)=>{
            data.goTopShow = n > 300 
        })
        return {
            data,
            goTop
        }
    }
   
}
</script>

<style lang="scss"  scoped>
span{
    position: fixed;
    bottom: 152px;
    right: 30px;
    display: block;
    width: 36px;
    height: 36px;
    padding: 11px;
    border-radius: 18px;
    box-sizing: border-box;
    background: var(--skinbgcolor);
    cursor: pointer;
    img{
        vertical-align: super;
        width: 100%;
        height: 100%;
    }
    &:hover{
        background: #ff2a14;
        transition-delay: .2s;
    }
}



</style>
