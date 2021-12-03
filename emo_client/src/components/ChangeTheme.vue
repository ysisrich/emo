<template>
    <span @click="addColor(false)"  class="skin">
        <img v-if="theme === 'white'" src="@/assets/img/icon/black.png" alt="换肤" class="skin-icon">
        <img v-else src="@/assets/img/icon/white.png" alt="换肤" class="skin-icon">
    </span>
</template>

<script>
import { ref  } from 'vue';

import { addColor } from '../hooks/addColor';

export default {
  name: 'ChangeTheme',
  setup(){
        let theme =ref(localStorage.theme)
			// console.log(theme)

        //  watch(theme,(newValue,oldValue)=>{
		// 		// console.log('theme',newValue,oldValue)
		// 	},{immediate:true}) 
        
        return {
            theme:theme,
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
    padding: 11px;
    border-radius: 18px;
    box-sizing: border-box;
    background: var(--skinbgcolor);
    // opacity: .5;
    cursor: pointer;
    &-icon{
        vertical-align: super;
        width: 100%;
        height: 100%;
    }
    &:hover{
        background: #ff2a14;
        // background: linear-gradient(rgba(231, 42, 21, 0.8), rgba(255,42,20,1));
        transition-delay: .2s;
    }
}



</style>
