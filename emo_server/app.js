
const express = require('express');
const session = require('express-session')
var bodyParser = require('body-parser');
const logger = require('morgan')
const mongod = require('./db/index')
const Video = require('./router/video')
const Comment = require('./router/comment')
const Movie = require('./router/movie')
const Message = require('./router/message')

mongod.then(res=>{
	console.log(res)
}).catch(err=>{
	console.log(err)
})


const app = express()


// 解析 application/json
app.use(bodyParser.json()); 
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


app.all('*', function(req, res, next) { // 允许跨域
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Access-Control-Allow-Headers', ' content-type')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Credentials', true)
  next()
})

app.use(logger('dev')); //日志设置


app.use(session({ // 使用session
  secret: '12345',
  name: 'verCode_sessionId',
  cookie: {maxAge: 1000 * 60 * 30}, // 设置cookie最大时长
  resave: true,
  saveUninitialized: false
}))

app.use('/video', Video)
app.use('/comment', Comment)
app.use('/movie', Movie)
app.use('/message', Message)

app.listen(3001,()=>console.log('服务器开启成功！！！'))