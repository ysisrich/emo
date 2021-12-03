

const layout = () => require.ensure([], (require) => require("../layout/default"))
const index = () => require.ensure([], (require) => require("../view/index"))
const video = () => require.ensure([], (require) => require("../view/video/index"))



const routes = [
  { 
    path: "/", 
    component: layout ,
    redirect:'index',
    children:[
      {
        path: "/index",
        name: "index",
        component: index
      },
      {
        path: "/video/:id",
        name: "video",
        component: video
      }
    ]
  },
  
]


export default routes