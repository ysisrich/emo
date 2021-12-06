

// UI组件库插件
// Vue插件的本质是对象对象中必须提供insall，（）
// import defaultImg from '@/assets/img/bg/lazyload.jpg'

const defaultImg = require('@/assets/img/bg/lazyload.jpg')

export default {
  install(app) {
    // 扩展一个自定义指令
    app.directive('lazyload', {
      // vue2规则：使用inserted
      // inserted(){}
      // vue3使用mounted
      mounted(el, binding) {
        // el表示使用指令的dom元素
        // binding表示指令相关的信息 bindings.value表示指令的值
        // 指令的功能：实现图片的懒加载
        // 1、监听图片进去可视区
        const observer = new IntersectionObserver(([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 进入可视区
            // 2、给图片的src属性赋值图片的地址
            el.src = binding.value
            // 数据加载完取消图片的监听
            observer.unobserve(el)
            // 加载的图片失败了，显示默认的图片地址
            el.onerror = () => {
              el.src = defaultImg
            }
          }
        })
 
        observer.observe(el)
      }
    })
  }
}