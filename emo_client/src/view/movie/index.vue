<template>
    <div class="player" v-if="movie_url">
        <MyVideo :video="movie_url" /> 
        <div class="selection">
            <div class="grid" v-if="movieInfo.category">
                <span v-for="(item,index) in movieInfo.movie_url" :key="`movie-${index}`" :class="{current:index == currentSlected}" 
                  @click="handleMovieUrl(item,index)">第{{ (index+1)<10 ? '0' + (index+1) :index+1}}集</span>
            </div>
            <div class="grid" v-else>
                <span v-for="(item,index) in movieInfo.movie_url" :key="`movie-${index}`" :class="{current:index == currentSlected}" 
                  @click="handleMovieUrl(item,index)">{{ clarity(movieInfo.clarity)}}</span>
            </div>
        </div>
    </div>

    <div class="movie">
        <h1>{{movieInfo.title}} <span v-if="movieInfo.category">第{{ (currentSlected+1)<10 ? '0' + (currentSlected+1) :currentSlected+1}}集</span></h1>
        <!-- <p>主演:{{movieInfo.starring}}</p>
        <p>剧情:{{movieInfo.description}}</p> -->
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';

import MyVideo from '@/components/Vue3Video'
import {getMovieOne}  from '../../../config/api'
import { useRoute, useRouter } from 'vue-router';

export default {
    name: 'Index',
    components:{MyVideo},
    setup() {

        const router = useRouter()
        const route = useRoute()

        let data = reactive({
            movieInfo:{},
            movie_url:'',
            currentSlected:0
        })

        getMovieOne({id:route.params.id}).then(res=>{
            if(res.code === 200){
                data.movieInfo = res.data
                data.movie_url = res.data.movie_url[0]
            }else{
                alert(res.msg)
            }
        })


        let handleMovieUrl = (val,index) => {
            data.currentSlected = index
            data.movie_url = val
            router.push({name:'movie',params:{movie_url:val}})
        }

        let clarity = (num) => num == 0 ? '蓝光' : num == 1 ?'超清' : num ==2 ? '高清' : num == 3 ? '清晰' :'枪版'


        return {
            ...toRefs(data) ,
            handleMovieUrl  ,
            clarity
        };
    },

};
</script>

<style lang="scss" scoped>
@mixin flx($jc,$ai,$fd:row){
    display: flex;
    flex-direction: $fd;
    justify-content: $jc;
    align-items: $ai;
}



.player{
    @include flx(center,flex-start);
    margin-top: 20px;
    
    .selection{
        width:300px;
        height: 600px;
        background: #25252b;
        padding: 30px;
        box-sizing: border-box;
        .grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 10px;
            span{
                display: inline-block;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #1e1e23;
                color: rgba($color: #fff, $alpha: .5);
                border-radius: 5px;
                cursor: pointer;
                &:hover{
                    background: #000;
                }
            }
            .current{
                background: #000;
            }
        }
    }
}

.movie{
    h1{
        color: var(--indextimecolor);
        font-size: 24px;
    }
}
</style>