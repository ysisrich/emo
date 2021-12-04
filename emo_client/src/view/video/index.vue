<template>
    <div class="_video">

        <div class="_video-player" v-if="data.VideoInfo.video_url">
            <div class="myvideo" >
                <MyVideo :video="data.VideoInfo.video_url" :cover="data.VideoInfo.cover" /> 
            </div>
            <div class="_video-player-info">
                <div class="title">{{data.VideoInfo.title}}</div>
                <div class="action">
                    <div>
                        <span @click="data.isChecked = !data.isChecked">
                            <img v-if="!data.isChecked " src="@/assets/img/icon/love.png" alt="">
                            <img v-else src="@/assets/img/icon/love-checked.png" alt="">
                            <span class="data">{{data.VideoInfo.heat}}</span>
                        </span>
                        <span>
                            <img src="@/assets/img/icon/comment.png" alt="">
                            <span class="data">{{data.VideoInfo.heat}}</span>
                        </span>

                        <span>
                            <img src="@/assets/img/icon/share.png" alt="">
                            <span class="data">分享</span>
                        </span>
                        <span>
                            <img src="@/assets/img/icon/download.png" alt="">
                            <span class="data">下载</span>
                        </span>
                    </div>
                    <div>
                        <span class="time">发布时间：{{data.VideoInfo.createTime}}</span>
                    </div>
                    
                </div>
            </div>
        </div>

        <div class="_video-other">
            <div class="_video-other-recommend">推荐视频</div>
            <div class="recommend-list">
                <div  v-for="(item,index) in data.VideoRecommendList" :key="`recom-${index}`" @click="handleRecommend(item)">
                    <div>
                        <img :src="item.cover" alt="">
                    </div>
                    <div>
                        <span class="title">{{item.title}}</span>
                        <span class="heat">🤍{{item.heat}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import {useRoute,useRouter} from 'vue-router'
import {getVideoOne,getVideoRecommendList} from '../../../config/api'
import MyVideo from '@/components/Video'
import { onMounted, onUpdated,computed, onBeforeUpdate, watch} from '@vue/runtime-core'

import moment from 'moment'

export default {
    name: 'VideoIndex',
    components:{MyVideo},
    
    setup() {
        let data = reactive({
            VideoInfo:{},
            VideoRecommendList:[],
            isChecked:false
        })

        

        const route = useRoute()
        const router = useRouter()

        getVideoOne({id:route.params.id}).then(res=>{
            if(res.code === 200){
                data.VideoInfo = res.data
                data.VideoInfo.createTime = moment(data.VideoInfo.createTime).format('YYYY-MM-DD HH:mm')
            }else{
                alert(data.msg)
            }
        })


        getVideoRecommendList({id:route.params.id}).then(res=>{
            if(res.code === 200){
                data.VideoRecommendList = res.data
                data.VideoRecommendList.map(item => item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm'))
            }else{
                alert(data.msg)
            }
        })

       
        onMounted(()=>{
            document.documentElement.scrollTop= 240
        })

        function handleRecommend(item){
            data.VideoInfo = item
            getVideoRecommendList({id:item._id}).then(res=>{
                if(res.code === 200){
                    data.VideoRecommendList = res.data
                    data.VideoRecommendList.map(item => item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm'))
                }else{
                    alert(data.msg)
                }
            })
            router.push({path:`/video/${item._id}`})
        }
        
     

        return {
            data,
            handleRecommend
        };
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
    ._video{
        @include flx(space-between,flex-start);
        margin-top: 50px;
        &-player{
            flex: 6;
            
            & .myvideo{
                // height: 500px;
            }
            &-info{
                margin: 15px auto;
                .title{
                    font-size: 18px;
                    color: var(--videoindextitltcolor);
                    margin: 10px auto;
                }
                .action{
                    font-size: 17px;
                    @include flx(space-between,center);
                    > div{
                        @include flx(flex-start,center);
                        span{
                            @include flx(space-between,center);
                            width: fit-content;
                            height: 34px;
                            line-height: 34px;
                            cursor: pointer;
                            padding-right: 10px;
                            img{
                                width: 20px;
                                height: 20px;
                            }
                            .data{
                                margin: 2px 0 5px 3px;
                                color: var(--indextimecolor);
                                font-size: 16px;
                            }
                        }
                        .time{
                            color: var(--indextimecolor);
                            font-size: 16px;
                        }
                    }
                    
                }
            }
        }
        &-other{
            flex: 2;
            height: 1000px;
            margin-left: 20px;

            &-recommend{
                font-weight: 900;
            }

            .recommend-list{
                display: grid;
                grid-template-columns: repeat(1, 1fr);
                grid-gap: 20px;
                margin-top: 30px;
                >div{
                    @include flx(center,center);
                    cursor: pointer;

                    div:nth-child(1){
                        flex: 3;
                        height: 100px;
                        img{
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                    div:nth-child(2){
                        flex: 4;
                        padding-left: 10px;
                        height: 100px;
                        font-size: 14px;
                        font-weight: 700;
                        @include flx(space-between,flex-start,column);
                        .title{
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                            overflow: hidden;
                        }
                        .heat{
                            font-size: 12px;
                        }
                    }
                }
                
            }
        }
    }
</style>