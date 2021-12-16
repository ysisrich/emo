const express = require('express')
const router = express.Router()
const Message = require('../model/Message')
const pagination  = require('mongoose-sex-page')


// 创建comment数据
router.post('/addmessage', (req, res) => {
    // console.log(req.body)

	console.log(Date.now())
	Message.create(req.body, (err, message) => {
	    if (err) {
	      console.log(err)
	      res.json(err)
	    } else {
	      res.json({code:200,msg:'添加成功！'})
	    }
	  })
})


// 获取Message数据列表
router.get('/getmessageList', async (req, res) => {
	
	//接收客户通过按钮页传过来的参数
	// console.log(req.query)
	const {currentPage=1,size=8,query} = req.query
	let condition = {}
	condition['name'] = new RegExp(query)
	
	const message = await pagination(Message).find(condition).page(currentPage).size(size).exec();
	
	
	if(message){
	  res.json({code:200,msg:'获取列表成功！',data:message})
	}else{
	  res.json({code:201,msg:'暂无数据！'})
	}
})



// 根据id获取Message
router.get('/getmessageOne', async (req, res) => {
	
	//接收客户通过按钮页传过来的参数
	console.log(req.query.id)
	
	const message = await Message.find({videoId:req.query.id})
	
	
	if(message){
	  res.json({code:200,msg:'获取成功！',data:message})
	}else{
	  res.json({code:201,msg:'暂无数据！'})
	}
})

// 修改Message数据
router.post('/putmessageOne', async (req, res) => {
	
	//接收客户通过按钮页传过来的参数
	console.log(req.body)
	const {id,isChecked} = req.body
	
	const message = await Message.findOne({"_id" :  id});
	console.log(message.heat)
	if(message){
		heat = isChecked ? message.heat + 1 : message.heat - 1
		const resulet = await Message.updateOne({"_id" :  id},{$set:{heat}});

		console.log(resulet)
		if(resulet.modifiedCount){
			res.json({code:200,msg:'成功！'})
		}

	}else{
	  res.json({code:201,msg:'暂无数据！'})
	}
})



module.exports = router