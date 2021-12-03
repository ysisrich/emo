//引入mongoose
const mongoose = require('mongoose');
//获取Schema
const Schema = mongoose.Schema;
//创建约束对象
const videosSchema = new Schema({
  title: String,
  category: Number, //  伤感 幽默  影视  游戏
  heat: Number,  // ❤热度
  commentId: { 		// 评论
    type: String,
    unique: true
  },
  cover: String,  // 封面
  createTime: {
    type: Date,
    default: Date.now()
  },
  time:String,
  video_url:String
})
//创建模型对象
const Videos = mongoose.model('Videos', videosSchema);

//暴露出去
module.exports = Videos;