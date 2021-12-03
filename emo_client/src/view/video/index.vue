<template>
    <div class="_video">
        <div class="_video-player" v-if="data.VideoInfo.video_url">
            <MyVideo :video="data.VideoInfo.video_url" :cover="data.VideoInfo.cover" /> 
        </div>
        <div class="_video-other">
            <div>我的喜欢</div>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import {useRoute} from 'vue-router'
import {getVideoOne} from '../../../config/api'
import MyVideo from '@/components/Video'
import { onMounted } from '@vue/runtime-core'



export default {
    name: 'VideoIndex',
    components:{MyVideo},
    
    setup() {
        let data = reactive({
            VideoInfo:{},
            scrollTop: '',
            goTopShow: false,
            timer:null
        })

        const route = useRoute()

        getVideoOne({id:route.params.id}).then(res=>{
            if(res.code === 200){
                data.VideoInfo = res.data
            }else{
                alert(data.msg)
            }
        })

       
        onMounted(()=>{
            document.documentElement.scrollTop= 240
        })
     

        return {
            data
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
            flex: 8;
            height: 500px;
        }
        &-other{
            flex: 2;
            height: 1000px;
            margin-left: 20px;
        }
    }
</style>