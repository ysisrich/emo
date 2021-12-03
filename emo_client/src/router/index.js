import {createRouter,createWebHashHistory} from 'vue-router'
import routes from './router.js'

const router = createRouter({
    // 路由设置hash模式
    history: createWebHashHistory(),
    routes
  })


  
export default router