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
	      res.json({code:200,msg:'添加成功！'})
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


// 根据id获取video
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

// 获取video数据推荐列表
router.get('/getVideoRecommendList', async (req, res) => {
	
	//接收客户通过按钮页传过来的参数
	// console.log(req.query)
	const {id} = req.query
	
	const video = await Video.find({"_id" : {"$ne": id}}).sort([['heat','desc']]).limit(10).exec();
	
	if(video){
	  res.json({code:200,msg:'获取列表成功！',data:video})
	}else{
	  res.json({code:201,msg:'暂无数据！'})
	}
})


// 修改video数据
router.post('/putVideoOne', async (req, res) => {
	
	//接收客户通过按钮页传过来的参数
	console.log(req.body)

	const {id,isChecked} = req.body
	
	const video = await Video.findOne({"_id" :  id});
	console.log(video.heat)
	if(video){
		heat = isChecked ? video.heat + 1 : video.heat - 1
		const resulet = await Video.updateOne({"_id" :  id},{$set:{heat}});

		console.log(resulet)
		if(resulet.modifiedCount){
			res.json({code:200,msg:'成功！'})
		}

	}else{
	  res.json({code:201,msg:'暂无数据！'})
	}
})



module.exports = router