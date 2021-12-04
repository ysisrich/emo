<template>
    <div>
        <div class="_video-comment-title">全部评论</div> 
        <div class="_video-comment-content">
            <span>
                <img src="@/assets/img/icon/1.png" alt="">
            </span>
            <div class="_video-comment-input" >
                <input type="text" placeholder="留下你的精彩评论吧！" v-model="params.content">
                <img src="@/assets/img/icon/publish.png" alt="发布" @click="handlePublish">
            </div>
        </div>

        <div class="_video-comments" >
            <div v-for="(item,index) in commentList" :key="`comm-${index}`">
                <div class="_video-omments-avatar">
                    <img :src="require(`@/assets/img/avatar/${item.avatar}.png`)" alt="">
                </div>
                <div class="comment-data">
                   <div class="username">
                       <span>{{item.username}}</span>
                       <span>{{item.createTime}}</span>
                   </div>
                   <div class="content">{{item.content}}</div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { computed, reactive, toRefs  } from '@vue/reactivity';
import {useRouter,useRoute} from 'vue-router'
import {addComment,getCommentOne} from '../../../config/api'
import moment from 'moment'
import { onMounted, onUpdated} from '@vue/runtime-core';

export default {
    name: 'Comment',
    props:['list'],
    setup(props){
        console.log('评论',props.list)
        const route = useRoute()

        let data = reactive({
            commentList:[],
            params:{
                videoId:route.params.id,
                username:'安安',
                avatar:1,
                content:''
            },
            list:[]
        })


        
        let getCommentData = ()=>{
            getCommentOne({id:data.params.videoId}).then(res=>{
                if(res.code == 200){
                    data.commentList = res.data
                    data.commentList.map(item => item.createTime = moment(item.createTime).format('YYYY-MM-DD'))
                    // console.log(data.commentList)
                }else{
                    alert(res.msg)
                }
            })
        }

        

        onMounted(()=>{
            getCommentData()
        })

        data.commentList = computed({
            get(){
                return data.list
            },
            set(value){
                data.list = props.list
            }
        })

        onUpdated(()=>{
            data.commentList = data.list
        })

        
// 许个愿吧！希望家人和朋友们都快快乐乐的，希望自己也没有烦恼，一切顺顺利利


        let handlePublish = async ()=>{
            
            let res = await addComment(data.params)
            if(res.code == 200){
                data.params.content = ''
                getCommentData()
            }else{
                alert(res.msg)
            }
        }

        return {
            ...toRefs(data),
            handlePublish
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

  ._video-comment-title{
      color: var(--indextimecolor);
      font-size: 16px;
  }

  ._video-comment-content{
     @include flx(flex-start,center);
    margin-top: 20px;
    span{
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin-right: 10px;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
    }

    ._video-comment-input{
            position: relative;
            top: 0;
            left: 0;
            width: 100%;
            height: 45px;
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
                font-size: 16px;
                background: inherit;
                color: var(--maincolor);
                margin-left: 13px;
            }
            >img{
                width: 25px;
                height: 25px;
                margin: auto;
                cursor: pointer;
            }

        }
     
  }

  ._video-comments{
      margin-top: 50px;
      >div{
        margin-top: 16px;
        @include flx(flex-start,flex-start);
        ._video-omments-avatar{
            width: 40px;
            height: 40px;
            cursor: pointer;
            margin-right: 12px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .comment-data{
            width: 100%;
            border-bottom: 1px solid var(--commentbordercolor);
            padding-bottom: 16px;
            .username{
                color: var(--commentusernamecolor);
                font-size: 13px;
                span:nth-child(2){
                    margin-left: 8px;
                    font-size: 12px;
                    color: var(--commentcolor);
                }
            }

            .content{
                margin-top: 10px;
                color: var(--videoindextitltcolor);
                font-size: 14px;
            }
        }
        

      }


  }
</style>