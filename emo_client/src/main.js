import { createApp } from 'vue'
import App from './App.vue'

import router from './router';
import store from './store';

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

import { addColor } from './hooks/addColor';
addColor(true)

// 视频插件
import VideoPlayer from 'vue-video-player/src'
import 'video.js/dist/video-js.css' 
import 'vue-video-player/src/custom-theme.css' 
//引入 hls,视频直播(m3u8)必须引入的
import 'videojs-contrib-hls'
//播放rtmp视频
import 'videojs-flash'
// 如果你需要自定义播放器的样式，自己新建一个css




const app = createApp(App);



app.use(VideoPlayer)
app.use(router)
app.use(store)
// app.use(Antd)
app.mount('#app')
