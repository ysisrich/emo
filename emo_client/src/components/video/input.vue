<template>
    <div>
        <div class="_video-comment-input" >
            <input type="text" placeholder="留下你的精彩评论吧！" v-model="content" @keyup.enter="handlePublish" @focus="isShowEmotion = false">
            <img src="@/assets/img/icon/emotion.png" alt="表情" @click="isShowEmotion = !isShowEmotion">
            <img src="@/assets/img/icon/publish.png" alt="发布" @click="handlePublish">
        </div>
        <emotion v-show="isShowEmotion" class="emotion" @emotion="(i) => content+=i" :height="200" ></emotion>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import Emotion from '@/components/video/index.vue'



export default {
    name: 'Input',
    components:{
        Emotion
    },
    setup(props,content){


        let data = reactive({
            content:'',
            isShowEmotion:false
        })
        function handlePublish(){
            content.emit('ok',data.content)
            data.content = ''
            data.isShowEmotion = false
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
    div{
        width: 100%;
        position: relative;
        ._video-comment-input{
            width: 100%;
            height: 45px;
            border-radius: 10px;
            // line-height: 55px;
            box-shadow: 0 0 8px rgba($color: #000000, $alpha: .2);
            background: var(--searchbgcolor);
            overflow: hidden;
            padding: 0 5px;
            @include flx(space-evenly,center);
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

        >.emotion{
            position: absolute;
            top: 48px;
            right: -10px;
            width: 400px;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0px 0px 24px rgba(0,0,0,.2);
        }
    }
</style>