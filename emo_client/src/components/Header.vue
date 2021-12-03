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
import {useRouter} from 'vue-router'

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
                title:'视频',
                key:'video'
            },
            {
                id:2,
                title:'音频',
                key:'sound'
            },
            {
                id:3,
                title:'文字',
                key:'text'
            }]
        })

        const router = useRouter()

        
        function handleMenu(item){
            data.current = item.id
        }

        function toIndex(){
            router.push({name:'index'})
        }

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