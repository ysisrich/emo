
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}
// 上面的东西可以忽略，跟按需加载无关， 这个东西的作用是去除打包后的所有的console.log()，好用！
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ],
    ...prodPlugins 
  ]
  
}