

const default_layout = () => require.ensure([], (require) => require("../layout/default_layout"))
const index = () => require.ensure([], (require) => require("../view/index"))
const video = () => require.ensure([], (require) => require("../view/video/index"))

const search_layout = () => require.ensure([], (require) => require("../layout/search_layout"))
const search = () => require.ensure([], (require) => require("../view/search/index"))




const routes = [
  { 
    path: "/", 
    component: default_layout ,
    redirect:'index',
    children:[
      {
        path: "/index",
        name: "index",
        component: index,
        meta: { title: '首页-emo情绪' }
      },
      {
        path: "/video/:id",
        name: "video",
        component: video,
        meta: { title: '视频-emo情绪' }
      }
    ]
  },

  {
    path: "/search", 
    component: search_layout ,
    redirect:'search',
    children:[
      {
        path: "",
        name: "search",
        component: search,
        meta: { title: '搜索-emo情绪' }
      }
    ]
  }
  
]


export default routes