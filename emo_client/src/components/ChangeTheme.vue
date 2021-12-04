<template>
    <span @click="addColor(false)"  class="skin">
        <span v-if="theme_key == 'white'" @click="theme_key='black'">
            <img  src="@/assets/img/icon/black.png" alt="换肤" class="skin-icon" >
        </span>
        <span v-else @click="theme_key='white'">
            <img  src="@/assets/img/icon/white.png" alt="换肤" class="skin-icon" >
        </span> 
    </span>
</template>

<script>
import { onMounted, reactive, ref,watch  } from 'vue';

import { addColor } from '../hooks/addColor';

export default {
  name: 'ChangeTheme',
  setup(){
        let theme_key =ref(localStorage.theme)

        return {
            theme_key,
            addColor
        }
    }
   
}
</script>

<style lang="scss"  scoped>
.skin{
    position: fixed;
    bottom: 60px;
    right: 30px;
    display: block;
    width: 36px;
    height: 36px;
    // padding: 11px;
    border-radius: 18px;
    box-sizing: border-box;
    background: var(--skinbgcolor);
    overflow: hidden;
    span{
        display: block;
        width: 100%;
        height: 100%;
        padding: 11px;
        box-sizing: border-box;

        cursor: pointer;
        .skin-icon{
            vertical-align: super;
            width: 100%;
            height: 100%;
        }
        &:hover{
            background: #ff2a14;
        }
        
    }
    // opacity: .5;
    
}



</style>
