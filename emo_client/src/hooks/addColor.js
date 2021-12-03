
// 主题样式
import themes from './theme.json'


export function addColor (init){
    const theme = localStorage.theme
    const {white,black,obj={}} = themes
  
    // 1.localStorage.theme 不存在默认黑色 2.存在并且刷新页面不改变主题 3.存在并且点切换才改变主题
    if(!theme){
        localStorage.setItem('theme','black')
        Object.assign(obj,black)
    }else {
        if(init)
            Object.assign(obj,theme == 'black'? black : white)
        else{
            localStorage.setItem('theme',theme == 'black'?' white' : 'black')
            Object.assign(obj,theme == 'black'? white : black)
        }
    }
    // html 添加主题样式
    for (const key in obj) {
        document.documentElement.style.setProperty(key, obj[key]);
    }
}