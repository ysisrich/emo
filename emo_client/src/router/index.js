import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router'
import routes from './router.js'

const router = createRouter({
    // 路由设置hash模式
    history: createWebHashHistory(),
    // history: createWebHistory(),
    routes
  })


  
export default router