
<template>
<div>
    <vue3VideoPlay
      v-bind="options"
      poster=""
    />
  </div>
 
</template>

<script>

import "vue3-video-play/dist/style.css";
import  vue3VideoPlay from "vue3-video-play";
import { reactive, toRefs, watch } from "vue";
import { useRoute } from 'vue-router';




export default {
  components: {
    vue3VideoPlay,
  },

props:['video','cover'],
  setup(props){
      console.log(props)
      const route = useRoute()
    const data = reactive({
            options:{
                width: "", //播放器高度
                height: "600px", //播放器高度
                color: "#409eff", //主题色
                title: "", //视频名称
                src: props.video, //视频源
                muted: false, //静音
                webFullScreen: false,
                speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
                autoPlay: false, //自动播放
                loop: false, //循环播放
                mirror: false, //镜像画面
                ligthOff: false, //关灯模式
                volume: 0.5, //默认音量大小
                control: true, //是否显示控制
                controlBtns: [
                    "audioTrack",
                    "quality",
                    "speedRate",
                    "volume",
                    "setting",
                    "pip",
                    "pageFullScreen",
                    "fullScreen",
                ], //显示所有按钮,
            },
            cover:props.cover // 默认第一帧为视频封面
            
        })

        watch(()=>route.path,()=>{
            data.options.src = props.video
            data.cover = props.cover
        })


        watch(()=>route.params.movie_url,()=>{
          console.log(222,route.params)
            data.options.src = route.params.movie_url
        })
        

        return {
            ...toRefs(data)
        }
    }
};


</script>

<style lang="scss" scoped>
 
</style>
