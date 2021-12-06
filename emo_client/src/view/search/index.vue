<template>
    <div class="_search">
        search
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
export default {
    name: 'Index',

    setup(){

        let data = reactive({
            
        })

        return {
            ...toRefs(data)
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
    ._search{
        width: 100%;
        height: 500px;
        margin: 90px auto;
    }
</style>