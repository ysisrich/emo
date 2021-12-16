//引入mongoose
const mongoose = require('mongoose');
//获取Schema
const Schema = mongoose.Schema;
//创建约束对象
const MessagesSchema = new Schema({
  username: String,
  avatar: String,  
  content:String,
  heat: {
    type:Number,
    default:0
  },  // ❤热度
  createTime: {
    type:Number,
    default:new Date().getTime()
  }
})
//创建模型对象
const Messages = mongoose.model('Messages', MessagesSchema);

//暴露出去
module.exports = Messages;