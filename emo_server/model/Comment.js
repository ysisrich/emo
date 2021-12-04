//引入mongoose
const mongoose = require('mongoose');
//获取Schema
const Schema = mongoose.Schema;
//创建约束对象
const CommentsSchema = new Schema({
  username: String,
  avatar: String,  
  content:String,
  heat: Number,  // ❤热度
  videoId: String,
  createTime: {
    type: Date,
    default: Date.now()
  },
})
//创建模型对象
const Comments = mongoose.model('Comments', CommentsSchema);

//暴露出去
module.exports = Comments;