const express = require('express')
const router = express.Router()
// 用于测试,没用
router.get('/', (req, res) => {
  res.send('Hello Express!')
})

module.exports = router