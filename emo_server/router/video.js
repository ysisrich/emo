const express = require('express')
const router = express.Router()
const Video = require('../model/Video')
const pagination  = require('mongoose-sex-page')



// 上传video
router.get('/', (req, res) => {
	
  res.send('Hello Express!')
})

// 创建video数据
router.post('/addVideo', (req, res) => {
	Video.create(req.body, (err, video) => {
	    if (err) {
	      console.log(err)
	      res.json(err)
	    } else {
	      res.json(video)
	    }
	  })
})


// 获取video数据列表
router.get('/getVideoList', async (req, res) => {
	
	//接收客户通过按钮页传过来的参数
	// console.log(req.query)
	const {currentPage=1,size=8,query} = req.query
	let condition = {}
	condition['name'] = new RegExp(query)
	
	const video = await pagination(Video).find(condition).page(currentPage).size(size).exec();
	
	
	if(video){
	  res.json({code:200,msg:'获取列表成功！',data:video})
	}else{
	  res.json({code:201,msg:'暂无数据！'})
	}
})


// 获取video数据列表
router.get('/getVideoOne', async (req, res) => {
	
	//接收客户通过按钮页传过来的参数
	console.log(req.query.id)
	
	const video = await Video.findById(req.query.id)
	
	
	if(video){
	  res.json({code:200,msg:'获取成功！',data:video})
	}else{
	  res.json({code:201,msg:'暂无数据！'})
	}
})


module.exports = router