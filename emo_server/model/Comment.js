//引入mongoose
const mongoose = require('mongoose');
//获取Schema
const Schema = mongoose.Schema;
//创建约束对象
const CommentsSchema = new Schema({
  username: String,
  avatar: String,  
  content:String,
  heat: {
    type:Number,
    default:0
  },  // ❤热度
  videoId: String,
  commentId:{
    type:String,
    default:"0"
  }, // 评论人的id
  createTime: {
    type:Number,
    default:new Date().getTime()
  }
})
//创建模型对象
const Comments = mongoose.model('Comments', CommentsSchema);

//暴露出去
module.exports = Comments;