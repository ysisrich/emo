
const compressionWebpackPlugin = require('compression-webpack-plugin'); //引入插件
const productionGZipExtensions = ['js', 'css']; //压缩的文件类型


const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const {resolve} = require('path');

const config = require('./config/index');


module.exports = {
    // 部署应用时的基本 URL
    publicPath: process.env.NODE_ENV === 'production' ? '' : '',

    // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
    outputDir: 'dist',

    // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: '',

    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',

    // 默认在生成的静态资源文件名中包含hash以控制缓存
    filenameHashing: true,
    
    // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
    // lintOnSave: process.env.NODE_ENV !== 'production',
    lintOnSave: false,

    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,

    // Babel 显式转译列表
    transpileDependencies: [],

    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // productionGzip: true,
    // productionGzipExtensions: ['js', 'css'],
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
    },
    // webpack-dev-server 相关配置
    devServer: {
        open: false,//open 在devServer启动且第一次构建完成时，自动用我们的系统的默认浏览器去打开要开发的网页
        host: '0.0.0.0',//默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
        port: 8000,
        hot:true,//hot配置是否启用模块的热替换功能，devServer的默认行为是在发现源代码被变更后，通过自动刷新整个页面来做到事实预览，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览。
        https: false,
        hotOnly: false,// hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
        // 设置代理
        proxy: {
            '/api': {
                target: process.env.NODE_ENV == 'production' ? config.interfaceUrl : config.testUrl, //目标接口域名
                secure: false, //false为http访问，true为https访问
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/api': '' //重写接口
                }
            }
        }, 
        before: app => {}
    },

    // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
    chainWebpack(config) {
        // 去除console.log输出
        config.optimization.minimizer('terser').tap((args) => {
          args[0].terserOptions.compress.drop_console = true
          return args
        })
        
        // 开启gzip压缩
        config.resolve.alias.set('@', resolve('src'));
        if (process.env.NODE_ENV === 'production') {
            config.plugin('compressionPlugin')
            .use(new compressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: productionGZipExtensions,
                threshold: 10240,
                minRatio: 0.8,
                deleteOriginalAssets: false
            }));
        }

        // 修改title
        config.plugin('html').tap(args => {
          args[0].title = 'emo情绪'
          return args
        })
    },
    


    // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
    // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
    configureWebpack:config=> {
        plugins: [
            new UglifyJsPlugin({
                uglifyOptions: {
                  //生产环境自动删除console
                  compress: {
                    drop_debugger: true,
                    drop_console: true,
                    pure_funcs: ['console.log']
                  }
                },
                sourceMap: false,
                parallel: true
              }),
        ] 

      },
  

    // 第三方插件配置
    pluginOptions: {
        // ...
        
    }
};