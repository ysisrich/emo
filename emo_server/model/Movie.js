//引入mongoose
const mongoose = require('mongoose');
//获取Schema
const Schema = mongoose.Schema;
//创建约束对象
const MoviesSchema = new Schema({
  title: String,
  category: Number, //  电影  电视剧 
  views:{
    type:Number,
    default:0
  },  // 浏览数
  cover: String,  // 封面
  createTime: {
    type: Date,
    default: Date.now()
  },
  movie_url:Array,
  country:String,
  description:String,
  starring:String, // 主演
  releaseTime:String, // 上映时间
  clarity:Number // 清晰度 0 蓝光 1 超清 2 高清 3 清晰 4 枪版
})
//创建模型对象
const Movies = mongoose.model('Movies', MoviesSchema);

//暴露出去
module.exports = Movies;