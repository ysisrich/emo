<template>
    <div class="_video">

        <div class="_video-player" v-if="VideoInfo.video_url">
            <div class="myvideo" >
                <MyVideo :video="VideoInfo.video_url" :cover="VideoInfo.cover" /> 
            </div>
            <div class="_video-player-info">
                <div class="title">{{VideoInfo.title}}</div>
                <div class="action">
                    <div>
                        <span @click="handleHeat">
                            <img v-if="!isChecked" src="@/assets/img/icon/heart-checked.png" alt="" >
                            <img v-else src="@/assets/img/icon/love-checked.png" alt="">
                            <span class="data">{{VideoInfo.heat}}</span>
                        </span>
                        
                        <span>
                            <img  src="@/assets/img/icon/comment-black.png" alt="" >
                            <span class="data">{{VideoInfo.commentLength}}</span>
                        </span>

                        <span @click="handleShare">
                            <img  src="@/assets/img/icon/share-black.png" alt="" >
                            <span class="data">分享</span>
                        </span>
                        <span @click="handleDownload">
                            <img src="@/assets/img/icon/download-black.png" alt="" >
                            <span class="data">下载</span>
                        </span>
                    </div>
                    <div>
                        <span class="time">发布时间：{{VideoInfo.createTime}}</span>
                    </div>
                    
                </div>
            </div>

            <!-- 评论 -->
                <Comment   @getCommentLength="getCommentLength"/>
        </div>

        <div class="_video-other">
            <div class="_video-other-recommend">推荐视频</div>
            <div class="recommend-list">
                <div  v-for="(item,index) in VideoRecommendList" :key="`recom-${index}`" @click="handleRecommend(item)">
                    <div>
                        <img :src="item.cover" alt="">
                    </div>
                    <div>
                        <span class="title">{{item.title}}</span>
                        <span class="heat">
                            <img src="@/assets/img/icon/_love.png" alt="" >
                            <span class="data">{{item.heat}}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import {useRoute,useRouter} from 'vue-router'
import {getVideoOne,getVideoRecommendList,getCommentOne,putVideoOne} from '../../../config/api'
// import MyVideo from '@/components/Video'
import MyVideo from '@/components/Vue3Video'
import { onMounted, onUpdated,computed, onBeforeUpdate, watch} from '@vue/runtime-core'
import Comment from '@/components/video/Comment'
import moment from 'moment'
import config from '../../../config/index'

import axios from 'axios'

import {useStore} from 'vuex'

export default {
    name: 'VideoIndex',
    components: {
        MyVideo,
        Comment
    },
    computed:{
        theme_key(){
            const store = useStore()
            return store.state.theme
        }
    },
    
    setup() {

        const route = useRoute()
        const router = useRouter()
        const store = useStore()


        let data = reactive({
            VideoInfo:{},
            VideoRecommendList:[],
            CommentList:[],
            isChecked:false,
        })

        
        getVideoOne({id:route.params.id}).then(res=>{
            if(res.code === 200){
                data.VideoInfo = res.data
                data.VideoInfo.createTime = moment(data.VideoInfo.createTime).format('YYYY-MM-DD HH:mm')
            }else{
                alert(res.msg)
            }
        })


        getVideoRecommendList({id:route.params.id}).then(res=>{
            if(res.code === 200){
                data.VideoRecommendList = res.data
                data.VideoRecommendList.map(item => item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm'))
            }else{
                alert(res.msg)
            }
        })

        function getCommentLength(val){
            data.VideoInfo.commentLength = val
        }

        

       
        onMounted(()=>{
            document.documentElement.scrollTop= 0
        })

        watch(() => route.path,() => {
           data.isChecked = false
        })

        // 点推荐视频
        function handleRecommend(item){
            data.VideoInfo = item
            getVideoRecommendList({id:item._id}).then(res=>{
                if(res.code === 200){
                    data.VideoRecommendList = res.data
                    data.VideoRecommendList.map(item => item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm'))
                }else{
                    alert(res.msg)
                }
            })

            router.push({path:`/video/${item._id}`})
        }

        // 点爱心
        function handleHeat(){
            data.isChecked = !data.isChecked
            putVideoOne({id:route.params.id,isChecked:data.isChecked}).then(res=>{
                if(res.code === 200){
                    data.VideoInfo.heat = data.isChecked ? data.VideoInfo.heat + 1 : data.VideoInfo.heat - 1
                }else{
                    alert(res.msg)
                }
            })
        }

        // 分享
        function handleShare(){
            let text = `我在emo网发现了『 ${data.VideoInfo.title} 』 快来看看 ${config.onLineUrl}#/video/${data.VideoInfo._id}`
            handleCopy(text)
            alert('链接已复制，感谢分享！')
        }
        // 复制链接
		function handleCopy(text) {
            var _input = document.createElement("input");   // 直接构建input
            _input.value = text;  // 设置内容
            document.body.appendChild(_input);    // 添加临时实例
            _input.select();   // 选择实例内容
            document.execCommand("Copy");   // 执行复制
            document.body.removeChild(_input); // 删除临时实例
        }

        // 下载
        function handleDownload(){
            window.open(data.VideoInfo.video_url)

            // let a = document.createElement('a')
            // a.href =data.VideoInfo.video_url
            // a.click();

            // var elemIF = document.createElement('iframe')
            // elemIF.src = data.VideoInfo.video_url
            // elemIF.style.display = 'none'
            // document.body.appendChild(elemIF)
            return 
            axios({
                method:'get',
                url:data.VideoInfo.cover,
                responseType: 'blob'  // 二进制流文件
            }).then(res=>{
                console.log('下载文件',res)
                const link = document.createElement('a')
                const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
                link.style.display = 'none'
                link.href = URL.createObjectURL(blob)
                link.setAttribute('download', `${name}.xlsx`)
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }).catch(req=>{console.log('error'+req)})
        }

        
     

        return {
            ...toRefs(data),
            handleRecommend,
            handleHeat,
            getCommentLength,
            handleShare,
            handleDownload
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
        margin-top: 20px;
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
                                width: 30px;
                                height: 30px;
                            }
                            .data{
                                margin: 0 0 0 3px;
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
                            img{
                                width: 15px;
                                height: 15px;
                                vertical-align: bottom;
                            }
                            .data{
                                margin: 0 0 0 3px;
                                color: var(--indextimecolor);
                            }
                        }
                    }
                }
                
            }
        }
    }
</style>