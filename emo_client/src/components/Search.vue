<template>
    <div class="search-head" >
        <div class="search-head-title" v-if="isShowLogo">EMO</div>
        
        <div class="search-head-box" :class="{fixed:goTopShow}" @keyup.enter="handleSearch">
            <input type="text" placeholder="客官慢点搜索！" v-model="searchData">
            <img src="@/assets/img/icon/search.png" alt="搜索" @click="handleSearch">
        </div>
    </div>
</template>

<script>
import { onMounted, onUnmounted, reactive, toRefs, watch  } from 'vue';
import {handleScroll} from '../hooks/handleScroll'

import {useStore} from 'vuex'
import { useRouter } from 'vue-router';

export default {
    name: 'Search',
    props:["isShowLogo"],
    setup(props){

        const store = useStore()
        const router = useRouter()
        console.log('展示logo',props)

        let data = reactive({
            searchData:'',
            scrollTop: '',
            goTopShow: false,
            isShowLogo:props.isShowLogo
        })

        onMounted(()=>{
            window.addEventListener('scroll', ()=>handleScroll(data))
        })
       
        watch(()=>data.scrollTop,(o,n)=>{
            data.goTopShow = n > 250 
        })

        onUnmounted(()=>{
            window.removeEventListener('scroll', ()=>handleScroll(data))
        })

        function handleSearch(){
            console.log(data.searchData)
            const {href} = router.resolve({path: '/search'})
            window.open(href,'_blank')
        }

        return{
            ...toRefs(data),
            handleSearch
        }
    }
};
</script>

<style lang="scss" scoped>
    @mixin flx($jc,$ai,$fd:row){
        display: flex;
        flex-direction: $fd;
        justify-content: $jc;
        align-items: $ai;
    }
    .search-head{
        @include flx(space-evenly,center,column);
        width: 1205px;
        height: 150px;
        margin: 50px auto 0;
        background: var(--headerbgcolor);
        &-title{
            font-size: 60px;
            color: #e50914;
            font-family: fantasy;
            letter-spacing: 15px;
        }

        &-box{
            position: relative;
            top: 0;
            left: 0;
            width: 600px;
            height: 55px;
            margin-bottom: -200px;
            border-radius: 10px;
            // line-height: 55px;
            box-shadow: 0 0 8px rgba($color: #000000, $alpha: .2);
            background: var(--searchbgcolor);
            overflow: hidden;
            padding: 0 5px;
            @include flx(space-evenly,center);
            z-index: 99;
            >input{
                outline: none;
                border: 0;
                width:88%;
                font-size: 17px;
                background: inherit;
                color: var(--maincolor);
                margin-left: 13px;
            }
            >img{
                width: 35px;
                height: 35px;
                margin: auto;
                cursor: pointer;
            }

        }
        .fixed{
            position: fixed;
            top: 13px;
            // left: 13%;
            left: calc(calc(calc(100vw - 1205px) / 2) + 90px);
        }
    }
</style>