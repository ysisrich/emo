<template>
    <span @click="showRecord" >
        <img  src="@/assets/img/icon/update.png" alt="">
    </span>
</template>

<script>


export default {
  name: 'Record',
  setup(){

        return {
            
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
