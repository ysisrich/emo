<template>
    <div class="header-head">
        <div @click="toIndex">情绪EMO网</div>
        <ul class="header-category">
            <li v-for="(item,index) in data.category" :key="index" :class="{current:data.current==index}" @click="handleMenu(item)">{{item.title}}</li>
        </ul>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import {useRoute, useRouter} from 'vue-router'
import { onMounted } from '@vue/runtime-core';

export default {
    name: 'Header',

    setup(){
        let  data = reactive({
            current:0,
            category:[{
                id:0,
                title:'首页',
                key:'index'
            },
            {
                id:1,
                title:'短视频',
                key:'video'
            },
            {
                id:2,
                title:'电影',
                key:'movie'
            },
            {
                id:3,
                title:'音乐',
                key:'music'
            },
            {
                id:4,
                title:'文案',
                key:'text'
            },
            {
                id:5,
                title:'留言板',
                key:'message'
            }]
        })

        const router = useRouter()
        const route = useRoute()

        
        function handleMenu(item){
            data.current = item.id
            const dom = document.querySelector(`#${item.key}`)
            console.log(dom)
            dom.scrollIntoView()
            const h = dom ? dom.getBoundingClientRect().top : 0
            console.log(h)
            
            if(route.path !== '/index'){
                router.push({name:'index'})
            }
            // document.body.scrollTop = document.documentElement.scrollTop = h
        }

        function toIndex(){
            router.push({name:'index'})
        }




        onMounted(()=>{
            const video_dom = document.querySelector('#video')
            console.log('标签dom',video_dom)

            // video_dom.scrollIntoView()
        })


        return{
            data,
            handleMenu,
            toIndex
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
    .current{
        color:rgb(255,42,20);
    }
    .header-head{
        @include flx(space-between,center);
        width: 1205px;
        height: 50px;
        line-height: 50px;
        margin: auto;
        background: var(--headerbgcolor);
        padding: 15px 0;
        font-weight: 700;
        >div{
            cursor: pointer;
        }
        .header-category{
            list-style: none;
            @include flx(center,center);
            >li{
                margin: 10px;
                &:hover{
                    color: rgb(255,42,20);
                    cursor: pointer;
                }
            }
        }
    }
</style>