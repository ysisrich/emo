<template>
    <div class="footer-copyright">
       <span>© {{data.projectName}} | {{data.record}}</span>
       <span>“爱情是找不到的，所以人们才说“坠入爱河”.你不能有意坠入”</span>
      
       
       <span>友情链接：
           <a href="https://www.chok8.com/" target="_blank">chok8电影院</a>
           <a href="https://www.zxzj.fun/" target="_blank">在线之家</a>
       </span>
       <span class="tip">本站资源均网络搜集，如有关视频侵犯了你的权益，请联系邮箱：2048400850@qq.com，本站将于24小时内删除！</span>
    </div>
</template>

<script>
import moment from 'moment';
import { reactive } from '@vue/reactivity';

export default {
    name: 'Footer',
    setup(){

        let data = reactive({
            copy:'<svg viewBox="64 64 896 896" focusable="false" data-icon="copyright" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm5.6-532.7c53 0 89 33.8 93 83.4.3 4.2 3.8 7.4 8 7.4h56.7c2.6 0 4.7-2.1 4.7-4.7 0-86.7-68.4-147.4-162.7-147.4C407.4 290 344 364.2 344 486.8v52.3C344 660.8 407.4 734 517.3 734c94 0 162.7-58.8 162.7-141.4 0-2.6-2.1-4.7-4.7-4.7h-56.8c-4.2 0-7.6 3.2-8 7.3-4.2 46.1-40.1 77.8-93 77.8-65.3 0-102.1-47.9-102.1-133.6v-52.6c.1-87 37-135.5 102.2-135.5z"></path></svg>',
            date:moment(new Date).format('YYYY'),
            projectName:'emo情绪',
            record:'渝ICP备2020013404号'
        })
        return {
            data
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
    .footer-copyright{
        @include flx(center,center ,column );
        width: 1205px;
        margin: 50px auto;
        color: var(--maincolor);
        margin-top: 300px;
        span{
            display: block;
            width: 100%;
            height: 40px;
            line-height: 40px;
            @include flx(center,center );
            border: var(--mainbordercolor);

            a{
                text-decoration: none;
                margin-right: 20px;
                color: var(--indextimecolor);
            }
        }
        .tip{
            color: var(--indextimecolor);
        }
    }
</style>