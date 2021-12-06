const express = require('express')
const router = express.Router()
const Comment = require('../model/Comment')
const pagination  = require('mongoose-sex-page')


// 创建comment数据
router.post('/addComment', (req, res) => {
    // console.log(req.body)

	console.log(Date.now())
	Comment.create(req.body, (err, Comment) => {
	    if (err) {
	      console.log(err)
	      res.json(err)
	    } else {
	      res.json({code:200,msg:'添加成功！'})
	    }
	  })
})


// 获取Comment数据列表
router.get('/getCommentList', async (req, res) => {
	
	//接收客户通过按钮页传过来的参数
	// console.log(req.query)
	const {currentPage=1,size=8,query} = req.query
	let condition = {}
	condition['name'] = new RegExp(query)
	
	const Comment = await pagination(Comment).find(condition).page(currentPage).size(size).exec();
	
	
	if(Comment){
	  res.json({code:200,msg:'获取列表成功！',data:Comment})
	}else{
	  res.json({code:201,msg:'暂无数据！'})
	}
})



// 根据id获取Comment
router.get('/getCommentOne', async (req, res) => {
	
	//接收客户通过按钮页传过来的参数
	console.log(req.query.id)
	
	const comment = await Comment.find({videoId:req.query.id})
	
	
	if(comment){
	  res.json({code:200,msg:'获取成功！',data:comment})
	}else{
	  res.json({code:201,msg:'暂无数据！'})
	}
})

// 修改Comment数据
router.post('/putCommentOne', async (req, res) => {
	
	//接收客户通过按钮页传过来的参数
	console.log(req.body)
	const {id,isChecked} = req.body
	
	const comment = await Comment.findOne({"_id" :  id});
	console.log(comment.heat)
	if(comment){
		heat = isChecked ? comment.heat + 1 : comment.heat - 1
		const resulet = await Comment.updateOne({"_id" :  id},{$set:{heat}});

		console.log(resulet)
		if(resulet.modifiedCount){
			res.json({code:200,msg:'成功！'})
		}

	}else{
	  res.json({code:201,msg:'暂无数据！'})
	}
})



module.exports = router