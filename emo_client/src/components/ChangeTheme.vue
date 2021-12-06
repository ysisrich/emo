<template>
    <span @click="addColor(false)"  class="skin">
        <span v-if="theme_key == 'white'" @click="ChangeTheme">
            <img  src="@/assets/img/icon/black.png" alt="换肤" class="skin-icon" >
        </span>
        <span v-else-if="theme_key === 'black'" @click="ChangeTheme">
            <img  src="@/assets/img/icon/white.png" alt="换肤" class="skin-icon" >
        </span> 
    </span>
</template>

<script>
import { onMounted, reactive, ref,toRefs,watch  } from 'vue';

import { addColor } from '../hooks/addColor';
import {useStore} from 'vuex'

export default {
  name: 'ChangeTheme',
  setup(){
        const store = useStore()


        let data = reactive({
            theme_key : localStorage.theme
        })
 

        onMounted(()=>{
            data.theme_key = localStorage.theme
        })

        function ChangeTheme(){
            data.theme_key = data.theme_key=='black' ? 'white' :'black'
            store.commit('changeTheme')
        }

        return {
            ...toRefs(data),
            addColor,
            ChangeTheme
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
