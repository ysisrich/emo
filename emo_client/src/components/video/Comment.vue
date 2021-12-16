<template>
    <div>
        <div class="_video-comment-title">全部评论</div> 
        <div class="_video-comment-content">
            <span>
                <img src="@/assets/img/icon/1.png" alt="">
            </span>
            
            <MyInput @ok="handlePublish"  />
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
                   <div class="content" v-html="item.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"> </div>

                   <div class="child-content">
                       <span class="heat" @click="handleheat(item)">
                            <img v-if="!heatCheckedList.includes(item._id)" src="@/assets/img/icon/_love.png" alt="" >
                            <img v-else src="@/assets/img/icon/love-checked.png" alt="" >
                            <span class="data">{{heatCheckedList.includes(item._id)?item.heat+1 : item.heat}}</span>
                        </span>
                        <span class="reply" @click="handleReply(item)">
                            <img src="@/assets/img/icon/reply.png" alt="" >
                            <span class="data">回复</span>
                        </span>
                        <MyInput v-show="item._id == commentId && isShowMyInput" @ok="handlePublish($event,item._id)" class="child-input"/>
                   </div>

                    <div v-if="item.children && item.children.length && item.children.length>=1 && !item.showChildComment" class="show-more-reply" @click="item.showChildComment=!item.showChildComment">
                        <span>展开{{item.children.length}}条回复</span>
                        <img src="@/assets/img/icon/arrow-down.png" alt="">
                    </div>
                   <!-- 子评论content 第一个childreen 开始 -->
                    <div v-if="item.showChildComment">
                        <div class="_video-comments child">
                            <div v-for="(item,index) in item.children" :key="`comm-${index}`">
                                <div class="_video-omments-avatar">
                                    <img :src="require(`@/assets/img/avatar/${item.avatar}.png`)" alt="">
                                </div>
                                <div class="comment-data">
                                    <div class="username">
                                        <span>{{item.username}}</span>
                                        <span>{{item.createTime}}</span>
                                    </div>
                                    <div class="content" v-html="item.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"> </div>

                                    <div class="child-content">
                                        <span class="heat" @click="handleheat(item)">
                                                <img v-if="!heatCheckedList.includes(item._id)" src="@/assets/img/icon/_love.png" alt="" >
                                                <img v-else src="@/assets/img/icon/love-checked.png" alt="" >
                                                <span class="data">{{heatCheckedList.includes(item._id)?item.heat+1 : item.heat}}</span>
                                            </span>
                                            <span class="reply" @click="handleReply(item)">
                                                <img src="@/assets/img/icon/reply.png" alt="" >
                                                <span class="data">回复</span>
                                            </span>
                                            <MyInput v-show="item._id == commentId && isShowMyInput" @ok="handlePublish($event,item._id)" class="child-input"/>
                                    </div>

                                    <!-- 子评论 第二个children开始 -->
                                    <div >
                                        <div class="_video-comments child" style="margin-left: -50px;">
                                            <div v-for="(x,index) in item.children" :key="`comm-${index}`">
                                                <div class="_video-omments-avatar">
                                                    <img :src="require(`@/assets/img/avatar/${x.avatar}.png`)" alt="">
                                                </div>
                                                <div class="comment-data">
                                                    <div class="username">
                                                        <span>{{x.username}} > {{item.username}}</span>
                                                        <span>{{x.createTime}}</span>
                                                    </div>
                                                    <div class="content" v-html="x.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"> </div>

                                                    <!-- <div class="child-content">
                                                    <span class="heat" @click="handleheat(x)">
                                                            <img v-if="!heatCheckedList.includes(x._id)" src="@/assets/img/icon/_love.png" alt="" >
                                                            <img v-else src="@/assets/img/icon/love-checked.png" alt="" >
                                                            <span class="data">{{heatCheckedList.includes(x._id)?x.heat+1 : x.heat}}</span>
                                                        </span>
                                                        <span class="reply" @click="handleReply(x)">
                                                            <img src="@/assets/img/icon/reply.png" alt="" >
                                                            <span class="data">回复</span>
                                                        </span>
                                                        <MyInput v-show="x._id == commentId && isShowMyInput" @ok="handlePublish($event,x._id)" class="child-input"/>
                                                    </div> -->


                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        
                                    <!-- 子评论 第二个children结束 -->

                                    

                                </div>
                            </div>
                        </div>
                    </div>

                   <!-- 子评论content 第一个childreen结束 -->
                    <div v-if="item.showChildComment" class="show-more-reply back" @click="item.showChildComment=!item.showChildComment">
                        <span>收起</span>
                        <img src="@/assets/img/icon/arrow-up.png" alt="">
                    </div>

                    
                    

                </div>
            </div>
        </div>

        <div class="comment-more" v-if="step < maxCommentLength">
            <div @click="step +=2">
                <span>更多评论</span> 
                <span class="arrow-right">
                    <img src="@/assets/img/icon/arrow-right.png" alt="">
                </span>   
            </div>
        </div>

        <div v-else class="comment-more noDataColot">没有更多数据了</div>

        
    </div>
</template>

<script>
import { computed, reactive, toRefs  } from '@vue/reactivity';
import {useRouter,useRoute} from 'vue-router'
import {addComment,getCommentOne,putCommentOne} from '../../../config/api'
import moment from 'moment'
import { onMounted, onUpdated} from '@vue/runtime-core';
import {watch} from 'vue'

import {useStore} from 'vuex'
import MyInput from '@/components/video/input'

import toTree from '../../hooks/translateDataToTree'

export default {
    name: 'Comment',
    components:{MyInput},
    computed:{
        commentList(){
            return this.commentList.filter((item,index) => index < this.step)
        }
    },
    setup(props,content){

        const route = useRoute()
        const store = useStore()


        let usernameArray = ['安安','灵魂共鸣','一支独秀','拾忆','Lucky','ミ灬╮等风来丶〆♥☜','早早先生','余生都是回忆','biu~你没了~',
            '白菜豆角焖面','炸馒头片','我们见一面吧','终于','慢慢都是回忆','能再见一面吗','夜幕整点小酒'
        ]
        let data = reactive({
            commentList:[],
            params:{
                videoId:route.params.id,
                username:usernameArray[Math.floor(Math.random()*(usernameArray.length+1))],
                avatar:Math.floor(Math.random()*5),
                content:'',
                commentId:'0'
            },
            isShowEmotion:false,
            commentId:'0',
            isShowMyInput:false,
            heatCheckedList:[],
            maxCommentLength:0,
            step:5,
        })



        // let towTree = (list) =>{
        //     list.forEach(item,index =>{
        //         // item 第一个元素 楼主 第一层
        //         if(item.children && item.children.length){
        //             item.children.forEach(x =>{
        //                 let obj = {
        //                     ...item,
        //                     children:x
        //                 }
        //                 res.push(obj)
        //                 towTree(item.children)
        //             })
        //         }else{
        //             res.push(item)
        //         }
        //     })
        // }


        
        let getCommentData = (id)=>{
            getCommentOne({id:id || data.params.videoId}).then(res=>{
                if(res.code == 200){
                    data.commentList = res.data
                    data.commentList.map(item => item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm'))
                    data.maxCommentLength = data.commentList.length
                    console.log('评论列表',data.commentList)
                    content.emit('getCommentLength',data.commentList.length)
                    data.commentList = toTree(data.commentList)
                    console.log('评论列表',data.commentList)


                }else{
                    alert(res.msg)
                }
            })
        }

        
        onMounted(()=>getCommentData())

    

        watch(() => route.path,() => {
           getCommentData(route.params.id)
           data.step = 5
           data.params.videoId = route.params.id
        })


        
// 许个愿吧！希望家人和朋友们都快快乐乐的，希望自己也没有烦恼，一切顺顺利利

        // 评论 或回复
        let handlePublish = async (e,_id)=>{

            console.log(e,_id)

            // return 
            data.params.commentId = _id || '0'
            data.params.username = usernameArray[Math.floor(Math.random()*(usernameArray.length+1))]
            data.params.avatar = Math.floor(Math.random()*5)
            data.params.content = e
            if(!data.params.content){
                alert('不能发布空的内容')
                return false
            }

            let res = await addComment(data.params)
            if(res.code == 200){
                data.params.content = ''
                data.isShowEmotion = false
                data.isShowMyInput = false
                getCommentData()
            }else{
                alert(res.msg)
            }
        }

        // 给评论点赞
        function handleheat(item){
            let index = data.heatCheckedList.findIndex(x => x == item._id)
            index == -1 ? data.heatCheckedList.push(item._id) : data.heatCheckedList.splice(index,1)
            putCommentOne({id:item._id,isChecked:data.heatCheckedList.includes(item._id)}).then(res=>console.log(res))
        }

        // 展示评论回复输入框
        function handleReply(item){
            if(data.commentId == item._id && data.isShowMyInput){
                data.isShowMyInput = false
            }else if(data.commentId == item._id && !data.isShowMyInput){
                data.isShowMyInput = true
            }else{
                data.isShowMyInput = true
                data.commentId = item._id                
            }
        }



        // 将匹配结果替换表情图片
        function  emotion (res) {
            let word = res.replace(/\#|\;/gi,'')
            const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
            let index = list.indexOf(word)
            return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" style="vertical-align: sub;" align="middle">`   
        }


        return {
            ...toRefs(data),
            handlePublish,
            emotion,
            handleheat,
            handleReply
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

$hoverColor:#ff2a14;
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
    
    
     
  }

  .child{
      margin-top: 20px !important;
      .comment-data{
          border-bottom: 0 !important;

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
            .show-more-reply{
                color: var(--commentusernamecolor);
                font-size: 11px;
                margin: 10px 0;
                cursor: pointer;
                img{
                    width: 14px;
                    height: 14px;
                    vertical-align: top;
                    margin-left: 2px;
                }
            }
            .back{
                margin-left: 50px;
                margin-top: 0px;
            }
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
            >.child-content{
                margin-top: 10px;
                .heat{
                    display: inline-block;
                    // min-width: 40px;
                    cursor: pointer;
                    font-size: 12px;
                    padding-right: 15px;
                    border-right:1px solid var(--commentchildheatsplit) ;
                    
                    img{
                        width: 15px;
                        height: 15px;
                        vertical-align: sub;
                    }
                    .data{
                        margin: 0 0 0 3px;
                        color: var(--indextimecolor);
                        &:hover{
                            color: $hoverColor;
                        }
                    }
                }
                .reply{
                    display: inline-block;
                    width: 55px;
                    font-size: 12px;
                    text-align: right;
                    cursor: pointer;
                    img{
                        width: 15px;
                        height: 15px;
                        vertical-align: sub;
                    }
                    .data{
                        margin: 0 0 0 3px;
                        color: var(--indextimecolor);
                        &:hover{
                            color: $hoverColor;
                        }
                    }
                    
                }
                .child-input{
                    margin-top: 15px;
                }
            }
        }
        

      }


  }

  .comment-more{
      margin: 30px auto;
      text-align: center;
      color: var(--indextimecolor);
      >div{
        width: 220px;
        height: 45px;
        cursor: pointer;
        @include flx(center,center );
        border-radius: 10px;
        margin: auto;
        background: var(--commentmorebgcolor);
        color: var(--indextimecolor);
        span:nth-child(1){
            display: inline-block;
            width: fit-content;
            height: 45px;
            line-height: 45px;
            &:hover{
                color: $hoverColor;
            }
        }
        .arrow-right{
            display: inline-block;
            width: 16px;
            height: 16px;
            margin: 0 7px;
            img{
                width: 100%;
                height: 100%;
            }
        }
      }
      
  }
 
</style>