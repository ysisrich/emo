const express = require('express')
const router = express.Router()
const Movie = require('../model/movie')
const pagination  = require('mongoose-sex-page')



// 上传movie
router.get('/', (req, res) => {
	
  res.send('Hello Express!')
})

// 创建movie数据
router.post('/addmovie', (req, res) => {
	Movie.create(req.body, (err, movie) => {
	    if (err) {
	      console.log(err)
	      res.json(err)
	    } else {
	      res.json({code:200,msg:'添加成功！'})
	    }
	  })
})


// 获取movie数据列表
router.get('/getmovieList', async (req, res) => {
	
	//接收客户通过按钮页传过来的参数
	// console.log(req.query)
	const {currentPage=1,size=8,query} = req.query
	let condition = {}
	condition['title'] = new RegExp(query)
	
	const movie = await pagination(Movie).find(condition).page(currentPage).size(size).exec();
	
	
	if(movie){
	  res.json({code:200,msg:'获取列表成功！',data:movie})
	}else{
	  res.json({code:201,msg:'暂无数据！'})
	}
})


// 根据id获取movie
router.get('/getmovieOne', async (req, res) => {
	
	//接收客户通过按钮页传过来的参数
	console.log(req.query.id)
	
	const movie = await Movie.findById(req.query.id)
	
	
	if(movie){
	  res.json({code:200,msg:'获取成功！',data:movie})
	}else{
	  res.json({code:201,msg:'暂无数据！'})
	}
})

// 获取movie数据推荐列表
router.get('/getmovieRecommendList', async (req, res) => {
	
	//接收客户通过按钮页传过来的参数
	// console.log(req.query)
	const {id} = req.query
	
	const movie = await movie.find({"_id" : {"$ne": id}}).sort([['heat','desc']]).limit(10).exec();
	
	if(movie){
	  res.json({code:200,msg:'获取列表成功！',data:movie})
	}else{
	  res.json({code:201,msg:'暂无数据！'})
	}
})


// 修改movie数据
router.post('/putmovieOne', async (req, res) => {
	
	//接收客户通过按钮页传过来的参数
	console.log(req.body)

	const {id,isChecked} = req.body
	
	const movie = await movie.findOne({"_id" :  id});
	console.log(movie.heat)
	if(movie){
		heat = isChecked ? movie.heat + 1 : movie.heat - 1
		const resulet = await movie.updateOne({"_id" :  id},{$set:{heat}});

		console.log(resulet)
		if(resulet.modifiedCount){
			res.json({code:200,msg:'成功！'})
		}

	}else{
	  res.json({code:201,msg:'暂无数据！'})
	}
})



module.exports = router