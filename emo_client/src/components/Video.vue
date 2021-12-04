<template>
  <div class="video" v-show="data.sources.video_url">
    <video-player class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="data.playerOptions">
    </video-player>
  </div>
</template>

<script>
import { reactive,computed,onUpdated} from 'vue'

export default {
  name: 'Video',
  props:['video','cover'],
  setup(props){
    console.log(props)
    let data = reactive({
         playerOptions: {
          playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
          autoplay: true, // 如果为true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 是否视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4", // 类型
            // src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' // url地址
            src: props.video // url地址
          }],
          poster: props.cover, // 封面地址
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true, // 当前时间和持续时间的分隔符
            durationDisplay: true, // 显示持续时间
            remainingTimeDisplay: false, // 是否显示剩余时间功能
            fullscreenToggle: true // 是否显示全屏按钮
          }
        },
        sources:{
          video_url:props.video,
          cover:props.cover
        }
    })

      //计算属性——完整写法（考虑读和写）
        data.playerOptions.sources = computed({
          get(){
            return data.sources.video_url
          },
          set(value){
            data.sources.video_url = props.video
          }
        })

      onUpdated(()=>{
        data.playerOptions.sources = data.sources.video_url
      })
    return {
      data
    }
  }
  
}
</script>

<style scoped lang="scss">
  .video{
    width: 100%;
    height: 100%;
    margin: auto;

    & /deep/ .video-js .vjs-tech{
      // z-index: 999 !important;
    }
  }
</style>
