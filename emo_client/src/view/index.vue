<template>
<div>

    <!-- 1 短视频 -->
    <div class="index-title">
        <div id="video">
            <img src="@/assets/img/icon/video.png"  alt="视频"> 视频
        </div>
        <div class="index-more-video">更多视频</div>
    </div>
    <div class="index-content-video">
        <div v-for="(item,index) in videoList" :key="index" @click="handleVideo(item)">
            <div class="index-content-video-cover">
                <img v-lazyload="item.cover" alt="">
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

    <!-- 2 影视 -->
    <div class="index-title">
        <div id="movie">
            <img src="@/assets/img/icon/movie.png"  alt="电影"> 电影
        </div>
        <div class="index-more-video">更多电影</div>
    </div>
    <div class="index-content-movie">
        <div v-for="(item,index) in movieList" :key="index" @click="handleMovie(item)">
            <div class="index-content-movie-cover">
                <img v-lazyload="item.cover" alt="item.title" :title="item.title">
                <div class="tags">
                    <span class="tag">{{item.releaseTime}}</span>
                    <span class="tag">{{item.country}}</span>
                </div>
                <div class="play_btn">
                    <img src="@/assets/img/icon/play.png"  alt="play">
                </div>
            </div>
            <div class="index-content-movie-info">
                <div>{{item.title}}</div>
                <div> {{clarity(item.clarity)}} </div>
            </div>
        </div>
    </div>


    <div class="index-title">
        <div id="music">
            <img src="@/assets/img/icon/music.png"  alt="音乐"> 音乐
        </div>
        <div class="index-more-video">更多音乐</div>
    </div>

    <!-- <div>
        <audio controls="controls" autoplay="autoplay">
             <source src="https://www.ytmp3.cn/down/75895.mp3" type="audio/ogg" />
             <source src="https://www.ytmp3.cn/down/75895.mp3" type="audio/ogg" />
        </audio>
    </div> -->


    <div class="index-title">
        <div id="text">
            <img src="@/assets/img/icon/text.png"  alt="文案"> 文案
        </div>
        <div class="index-more-video">更多文案</div>
    </div>



    <div class="index-title">
        <div id="message">
            <img src="@/assets/img/icon/message.png"  alt="留言板"> 留言板
        </div>
        <div class="index-more-video">留言板</div>
    </div>
    <div class="msg">
        <textarea class="text" name="message" placeholder="说点什么吧..." v-model="message_params.content" ></textarea>
        <span class="message_btn" @click="handleSent">发表</span>
    </div>
    <MessageList :list="messageList" />


  </div>
</template>

<script>

import { reactive, toRefs } from '@vue/reactivity'
import {getVideoList,getMovieList,getMessageList, addVideo,addMovie,addMessage} from '../../config/api'
import dateParse from '../hooks/dateParse'
import {useRouter} from 'vue-router'
import {onMounted} from 'vue'

import {useStore} from 'vuex'
import MessageList from '../components/message/MessageList.vue'
import moment from 'moment'



let array = [
    {
        title:'要是那天，我抓住你就好了',
        category:0,
        heat:850,
        cover:'https://nav.yangsong.cool/uploads/video/1.jpg',
        video_url:'https://nav.yangsong.cool/uploads/video/1.mp4'
    },
    {
        title:'“你啊，年龄到了，有些事就妥协了，对吗？”',
        category:0,
        heat:1000,
        cover:'https://nav.yangsong.cool/uploads/video/2.png',
        video_url:'https://nav.yangsong.cool/uploads/video/2.mp4'
    },
    {
        title:'这辈子人潮汹涌，感谢遇见你。#人潮汹涌感谢遇见你',
        category:0,
        heat:403,
        cover:'https://nav.yangsong.cool/uploads/video/3.png',
        video_url:'https://nav.yangsong.cool/uploads/video/3.mp4'
    },
    {
        title:'分享给谁呢',
        category:0,
        heat:3540,
        cover:'https://nav.yangsong.cool/uploads/video/4.png',
        video_url:'https://nav.yangsong.cool/uploads/video/4.mp4'
    },
    {
        title:'2021年没有秋天，可是冬天来了也不会一起吃烤红薯和滑雪',
        category:0,
        heat:5533,
        cover:'https://nav.yangsong.cool/uploads/video/5.png',
        video_url:'https://nav.yangsong.cool/uploads/video/5.mp4'
    },
    {
        title:'“我没有一天不在思念你”',
        category:0,
        heat:8770,
        cover:'https://nav.yangsong.cool/uploads/video/6.jpg',
        video_url:'https://nav.yangsong.cool/uploads/video/6.mp4'
    },
    {
        title:'这首歌已经过去七年了。',
        category:0,
        heat:7750,
        cover:'https://nav.yangsong.cool/uploads/video/7.png',
        video_url:'https://nav.yangsong.cool/uploads/video/7.mp4'
    }
]


// array.forEach(item=>addVideo(item))


let movies = [
    {
        title: '孤单又灿烂的神：鬼怪',
        category: 1, // 0 电影  1 电视剧 
        cover: 'https://img.4kya.com/2021/02/21/2b0f70221081718.jpg',  // 封面
        movie_url: ["https://p3.korea.yanetflix.oss.kongbuya.com/s/BDqe9sr", "https://p3.korea.yanetflix.oss.kongbuya.com/s/bX0WzfR", "https://p3.korea.yanetflix.oss.kongbuya.com/s/9XYGXU8", "https://p3.korea.yanetflix.oss.kongbuya.com/s/l4rl6HK", "https://p3.korea.yanetflix.oss.kongbuya.com/s/zYAW5UK", "https://p3.korea.yanetflix.oss.kongbuya.com/s/G5YO8hX", "https://p3.korea.yanetflix.oss.kongbuya.com/s/D5YrbIX", "https://p3.korea.yanetflix.oss.kongbuya.com/s/pG2a3iw", "https://p3.korea.yanetflix.oss.kongbuya.com/s/4RYkRuZ", "https://p3.korea.yanetflix.oss.kongbuya.com/s/52YKnhD", "https://p3.korea.yanetflix.oss.kongbuya.com/s/kQq2mC9", "https://p3.korea.yanetflix.oss.kongbuya.com/s/X4KbVID", "https://p3.korea.yanetflix.oss.kongbuya.com/s/VLYBKiB", "https://p3.korea.yanetflix.oss.kongbuya.com/s/NKYa2Cp", "https://p3.korea.yanetflix.oss.kongbuya.com/s/Y03RjUp", "https://p3.korea.yanetflix.oss.kongbuya.com/s/bK4bvUR"],
        country:'韩国',
        description:'拥有不死之身的“鬼怪”金侁（孔侑 饰），为了结束自己无限循环的生活必需找到一位人类新娘，却在寻找途中阴差阳错与患有失忆症的阴间使者王黎（李东旭 饰）开始了奇妙“同居”生活，两人在遇到了传说中的“鬼怪的新娘”——一个“命中注定要死”的少女池恩倬（金高银 饰）之后，逐渐展开浪漫故事。',
        starring:'孔侑,金高银,李栋旭,刘仁娜', // 主演
        releaseTime:'2016-12-02', // 上映时间
        clarity:0 // 清晰度 0 蓝光 1 超清 2 高清 3 清晰 4 枪版
    },
    {
        title: '毒液2',
        category: 0, // 0 电影  1 电视剧 
        cover: 'https://sf1-cdn-tos.douyinstatic.com/obj/douyin-open-platform/801eb1ad8b4195afd6a20f9a79c040e9',  // 封面
        movie_url: ["https://vod.pipi.cn/8f6897d9vodgzp1251246104/8568f09e387702291853843487/f0.mp4"],
        country:'美国',
        description:'汤姆哈迪以致命的保护者毒液的身份重返大银幕，毒液是漫威最伟大和最复杂的角色之一。该片由安迪·瑟金斯执导，米歇尔·威廉姆斯、娜奥米·哈里斯和伍迪·哈里森主演，饰演反派克莱图斯·卡萨迪/大屠杀。',
        starring:'汤姆·哈迪米歇尔·威廉姆斯伍迪·哈里森斯蒂芬·格拉汉姆娜奥米·哈里斯', // 主演
        releaseTime:'2021-10-15', // 上映时间
        clarity:0 // 清晰度 0 蓝光 1 超清 2 高清 3 清晰 4 枪版
    },
    {
        title: '复仇者联盟1',
        category: 0, // 0 电影  1 电视剧 
        cover: 'https://sc02.alicdn.com/kf/Ufaf4cb3591994eeb9ef59b2595687d0aq.jpg',  // 封面
        movie_url: ["http://sz-download.weiyun.com/7t2vghjze9n8.mp41639316483000.mp4?ver=6010&rkey=004523068f1C11daFa207B28C223dB97649824050D28Ec68B63a713107fFa52fc3672Ef339e4CfB44230010Be4Fc89Bc02405C1F3781C905d8E289E3AF04D781"],
        country:'美国',
        description:'',
        starring:'小罗伯特·唐尼,克里斯·埃文斯,斯嘉丽·约翰,逊克里斯·海姆斯沃斯', // 主演
        releaseTime:'2012-05-05', // 上映时间
        clarity:0 // 清晰度 0 蓝光 1 超清 2 高清 3 清晰 4 枪版
    },
    {
        title: '复仇者联盟2：奥创纪元',
        category: 0, // 0 电影  1 电视剧 
        cover: 'https://sc02.alicdn.com/kf/U7ba43c14277a4d3d9c6cede251ac0965D.jpg',  // 封面
        movie_url: ["http://exmail.qq.com/cgi-bin/ftnExs_download?action=redirect&key=53c6e2bd&url=http://gzc-download.ftn.qq.com/ftn_handler/61dfC3E80D7f976C9c1082a7cC2120128DE9FfCb2eF832C508ae2E1dc3EFf7e042ec4d4ECD250EF5Cc174E893745651c840B5C6db7ef758746A5ba4cCFe8872b/bde41639316942683.mp4/1639316943327.mp4"],
        country:'美国',
        description:'',
        starring:'小罗伯特·唐尼,克里斯·埃文斯,斯嘉丽·约翰,逊克里斯·海姆斯沃斯', // 主演
        releaseTime:'2015-05-12', // 上映时间
        clarity:0 // 清晰度 0 蓝光 1 超清 2 高清 3 清晰 4 枪版
    },
    {
        title: '复仇者联盟3：无限战争',
        category: 0, // 0 电影  1 电视剧 
        cover: 'https://sc02.alicdn.com/kf/U878a538e663d495fbe3d55ee4007cf8cM.jpg',  // 封面
        movie_url: ["http://sz-download.weiyun.com/kkpjcpigeco8.mp41639317057587.mp4?ver=6010&rkey=396A8669a5F4639f96b1bd896f0Edc104b014fb2DB0698BeCE0AB4f3D3A3BdF5FBDE8862A169fAD65Cf898b5891e27EBb1DC521BF60fc741Bd72724d274308eF"],
        country:'美国',
        description:'',
        starring:'小罗伯特·唐尼,克里斯·埃文斯,斯嘉丽·约翰,逊克里斯·海姆斯沃斯', // 主演
        releaseTime:'2018-05-11', // 上映时间
        clarity:0 // 清晰度 0 蓝光 1 超清 2 高清 3 清晰 4 枪版
    },
    {
        title: '复仇者联盟4：终局之战',
        category: 0, // 0 电影  1 电视剧 
        cover: 'https://sc02.alicdn.com/kf/Ua00c6eba58484a5f80e18037d601b0ffg.jpg',  // 封面
        movie_url: ["http://sz-download.weiyun.com/Q3NFJQJZLgnj.mp41639317226376.mp4?ver=6010&rkey=12061015DD5059B7D6A17FFF43E1B0E1ECB407437CF04B7AAF59B56598EFDB7D688E9218B82D65A7A6D4359B205A11F8BE3FE22E9DC05F1DEC6BBDC275F2B61E"],
        country:'美国',
        description:'',
        starring:'小罗伯特·唐尼,克里斯·埃文斯,斯嘉丽·约翰,逊克里斯·海姆斯沃斯', // 主演
        releaseTime:'2019-04-24', // 上映时间
        clarity:0 // 清晰度 0 蓝光 1 超清 2 高清 3 清晰 4 枪版
    }
]

// movies.forEach(item=>addMovie(item))



export default {
    name: 'Index',
    computed:{
        searchKey(){
            const store = useStore()
            console.log(store.state.searchKey)
            return store.state.searchKey
        }
    },
    components:{MessageList},
    setup(){

        let usernameArray = ['安安','灵魂共鸣','一支独秀','拾忆','Lucky','ミ灬╮等风来丶〆♥☜','早早先生','余生都是回忆','biu~你没了~',
            '白菜豆角焖面','炸馒头片','我们见一面吧','终于','慢慢都是回忆','能再见一面吗','夜幕整点小酒'
        ]

        const router = useRouter()

        var data = reactive({
            params:{
                query:'',
                currentPage:1,
                size:9
            },
            videoList:[],
            movieList:[],
            messageList:[],

            message_params:{
                username:usernameArray[Math.floor(Math.random()*(usernameArray.length+1))],
                avatar:Math.floor(Math.random()*5),
                content:'',
            },
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

        getMovieList(data.params)
        .then(res=>{
            if(res.code === 200){
                data.movieList = res.data.records
            }else{
                alert(data.msg)
            }
        })

        getMessageList()
        .then(res=>{
            if(res.code === 200){
                data.messageList = res.data.records
                data.messageList.map(item => item.createTime = moment(item.createTime).format('YYYY-MM-DD'))
            }else{
                alert(data.msg)
            }
        })



        
        let handleVideo = (val)=> router.push({path:`/video/${val._id}`})
        let handleMovie = (val)=> router.push({path:`/movie/${val._id}`})
        let clarity = (num) => num == 0 ? '蓝光' : num == 1 ?'超清' : num ==2 ? '高清' : num == 3 ? '清晰' :'枪版'
        let handleSent = () => {
            console.log(data.message_params)
            if(!data.message_params.content.trim().length){
                return alert('内容不能为空！')
            }
            addMessage(data.message_params).then(res=>{
                if(res.code === 200){
                    data.message_params.content = ''

                    getMessageList().then(res=>{
                        if(res.code === 200){
                            data.messageList = res.data.records
                            data.messageList.map(item => item.createTime = moment(item.createTime).format('YYYY-MM-DD'))
                        }else{
                            alert(data.msg)
                        }
                    })

                }else{
                    alert(data.msg)
                }
            })
        }
        
        return {
            ...toRefs(data),
            handleVideo,
            handleMovie,
            clarity,

            handleSent
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



    // 影视
    .index-content-movie {
        margin: 20px auto;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
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
            height: 390px;
            border-radius: 10px;
            // object-fit: cover;
            cursor: pointer;

            
        }
        .tags{
            position: absolute;
            left: 10px;
            bottom: 10px;
            .tag{
                display: inline-block;
                padding: 4px 10px;
                background: rgba(0,0,0,.51);
                border-radius: 5px;
                font-size: 14px;
                color: #c2c6d0;
                margin: 0 5px 0 0;
            }
        }
        
        &-info{
            width: 100%;
            // height: 80px;
            > div:nth-child(1){
                margin: 5px auto;
                height: 22px;
                cursor: pointer;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                font-weight: 900;
            }

            > div:nth-child(2){
                color: var(--indextimecolor);
            }
        }
    }



    // 留言板
    .msg{
        margin-top: 20px;
        text-align: right;
        .text{
            width: 100%;
            height: 200px;
            resize: none;
            outline: none;
            border: 0;
            font-size: 18px;
            padding: 15px;
            border-radius: 10px;
            box-sizing: border-box;
            color: var(--indextimecolor);
            background: var(--indexmessagetextbgcolor);
        }
        .message_btn{
            display: inline-block;
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            margin-top: 10px;
            border-radius: 3px;
            color: var(--indextimecolor);
            background: var(--indexmessagetextbgcolor);
            cursor: pointer;
        }
    }

</style>