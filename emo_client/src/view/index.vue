<template>
<div>
    <div class="index-title">
        <div>
            <img src="@/assets/img/icon/video.png"  alt="视频"> 视频
        </div>
        <div class="index-more-video">更多视频</div>
    </div>

    <div class="index-content-video">
        <div v-for="(item,index) in data.videoList" :key="index" @click="handleVideo(item)">
            <div class="index-content-video-cover">
                <img :src="item.cover" alt="">
                <span class="heat">🤍{{item.heat}}</span>
                <div class="play_btn">
                    <img src="@/assets/img/icon/play.png"  alt="play">
                </div>
            </div>
            <div class="index-content-video-info">
                <div>{{item.title}}</div>
                <div>
                    <span class="avatar">
                        <img src="@/assets/img/icon/1.png" alt="avatar">
                        <span> 灵魂共鸣</span>      
                    </span>
                    <span class="time">{{item.dateTime}}</span>
                </div>
            </div>

        </div>
    </div>

  </div>
</template>

<script>

import { reactive } from '@vue/reactivity'
import {getVideoList} from '../../config/api'
import dateParse from '../hooks/dateParse'
import {useRouter} from 'vue-router'


//   title: String,
//   category: Number, //  情感 幽默  影视  游戏
//   heat: Number,  // ❤热度
//   commentId: { 		// 评论
//     type: String,
//     unique: true
//   },
//   cover: String,  // 封面
//   createTime: {
//     type: Date,
//     default: Date.now()
//   },
//   time:String,
//   video_url:String


// let params = {
//     title:'这首歌已经过去七年了。',
//     category:0,
//     heat:8550,
//     commentId:9,
//     cover:'https://nav.yangsong.cool/uploads/cover/6.png',
//     video_url:'https://nav.yangsong.cool/uploads/video/5.mp4'

// }
// addVideo(params).then(res=>console.log(res))



export default {
    name: 'Index',
    setup(){
        var data = reactive({
            params:{
                query:'',
                currentPage:1,
                size:10
            },
            videoList:[]
        })

        getVideoList(data.params)
            .then(res=>{
                if(res.code === 200){
                    data.videoList = res.data.records
                    data.videoList.map(item=>item.dateTime = dateParse(item.createTime))
                }else{
                    alert(data.msg)
                }
            })

        const router = useRouter()

        
        let handleVideo = (val)=>{
            router.push({path:`/video/${val._id}`})
        }
    

        
        return {
            data,
            handleVideo
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



    .index-title{
        @include flx(space-between,center);
        margin-top: 100px;
        font-size: 23px;
        img{
            width: 25px;
            height: 25px;
            vertical-align: middle;
        }
        .index-more-video{
            width: 105px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 15px;
            font-size: 15px;
            cursor: pointer;
            color: var(--indexmorecolor);
            background: var(--indexmorebgcolor);
            &:hover{
                color: #ff2a14;
            }
        }
    }

    .index-content-video {
        margin: 20px auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
        div{
            width: 100%;
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
            overflow: hidden;
        }
        &-cover{
            position: relative;
            &:hover .play_btn{
                visibility: visible;
                cursor: pointer;
                // transition-delay: .2s;
            }
        }

        .play_btn{
            visibility: hidden;
            position: absolute;
            top: 0;
            height: 0;
            width: 100%;
            height: 100%;
            @include flx(center,center);
            background: rgba(0,0,0,.4);
            img{
                width: 50px;
                height: 50px;
            }
        }

        &-cover img{
            width: 100%;
            height: 270px;
            border-radius: 10px;
            object-fit: cover;
            cursor: pointer;

            
        }
        .heat{
            position: absolute;
            left: 10px;
            bottom: 10px;
            color: #fff;
        }
        
        &-info{
            width: 100%;
            // height: 80px;
            > div:nth-child(1){
                margin: 5px auto;
                height: 45px;
                cursor: pointer;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                font-weight: 900;
            }

            > div:nth-child(2){
                @include flx(space-between,center);
                height: 40px;
                .avatar{
                    // width: 32px;
                    height: 32px;
                    cursor: pointer;
                    @include flx(flex-start,center);
                    
                    img{
                        width: 32px;
                        height: 32px;
                        border-radius: 18px;
                    }
                    span:nth-child(2){
                        display: inline;
                        margin: 0 6px;
                    }
                }
                .time{
                    color: var(--indextimecolor);
                }
            }
        }
    }

</style>