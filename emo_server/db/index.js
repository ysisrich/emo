//引入mongoose
const mongoose = require('mongoose');

const { db_config } = require('../config/db.json')

module.exports = new Promise((resolve, reject) => {
  //连接数据库
  // mongodb://host:port/database?options…
  // mongodb://username:password@host:port/database?options…
  const params= db_config.password ? `${db_config.user}:${db_config.password}@` : ''
  const url = `mongodb://${params}${db_config.host}:${db_config.port}/${db_config.database}`
 
  mongoose.connect(url, {
	  useNewUrlParser: true,
	  useUnifiedTopology: true
  })
 
  //绑定事件监听
  mongoose.connection.once('open', err => {
    if (!err) {
      resolve('数据库连接成功了~~');
    } else {
      reject('数据库连接失败：' + err);
    }
  })


})
