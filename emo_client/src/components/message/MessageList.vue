<template>
    <div class="_video-comments" >
            <div v-for="(item,index) in messageList" :key="`mess-${index}`">
                <div class="_video-omments-avatar">
                    <img :src="require(`@/assets/img/avatar/${item.avatar}.png`)" alt="">
                </div>
                <div class="comment-data">
                   <div class="username">
                       <span>{{item.username}}</span>
                       <span>{{item.createTime}}</span>
                   </div>
                   <div class="content" >{{item.content}} </div>
                </div>
            </div>
    </div>

</template>

<script>
import { computed, reactive, toRefs } from '@vue/reactivity';
import {getMessageList} from '../../../config/api'
import moment from 'moment'


export default {
    name: 'Messagelist',
    props:['list'],
    computed:{
        messageList(){
            return this.list
        }
    },
    setup(props) {

        let data = reactive({
            // messageList:props.list
        })

        
        return {
            ...toRefs(data)
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
        }
      }
  }

 
</style>