<template>
    <span @click="showRecord" >
        <img  src="@/assets/img/icon/update.png" alt="">
    </span>

 
</template>

<script>


export default {
  name: 'Record',
  setup(){
        
        function showRecord(){
            let text = "🕙 2020-11-28  初始化Vue3项目,绘制页面 \n\n"+
                       "🕙 2020-12-02  设计深、浅主题两套主题 \n\n"+
                       "🕙 2020-12-03  使用视频插件播放视频 \n\n" +
                       "🕙 2020-12-04  完善评论功能 \n\n" +
                       "🕙 2020-12-05  增加表情包评论 \n\n" +
                       "🕙 2020-12-11  电影观看 \n\n" 



                       
            alert(text)
        }
        return {
            showRecord
        }
    }
   
}
</script>

<style lang="scss"  scoped>
span{
    position: fixed;
    bottom: 105px;
    right: 30px;
    display: block;
    width: 36px;
    height: 36px;
    padding: 11px;
    border-radius: 18px;
    box-sizing: border-box;
    background: var(--skinbgcolor);
    cursor: pointer;
    img{
        vertical-align: super;
        width: 100%;
        height: 100%;
    }
    &:hover{
        background: #ff2a14;
        transition-delay: .2s;
    }
}



</style>
