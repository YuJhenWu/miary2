var express = require('express');
var router = express.Router();

//引入了 "../controllers/commentController" 路徑下的 commentController module
const commentController = require('../controllers/commentController')

// 處理 GET 請求，顯示所有評論
router.get('/', commentController.index)

//導出router給其他模組使用
module.exports = router;
