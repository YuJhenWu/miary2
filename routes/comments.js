var express = require('express');
var router = express.Router();

//引入了 "../controllers/commentController" 路徑下的 commentController module
const commentController = require('../controllers/commentController')

// 自定義中間介，用於導回上一頁
function redirectBack(req, res, next) {
    res.redirect('back')
}

// 處理 POST 請求，提交表單來新增 comment，並導回上一頁
router.post('/', commentController.add, redirectBack)
// 處理 GET 請求，刪除 comment
router.get('/delete_comments/:id', commentController.delete)
// 處理 GET 請求，讀取要編輯的 comment
router.get('/update_comments/:id', commentController.update)
// 處理 POST 請求，提交表單來修改 comment
router.post('/update_comments/:id', commentController.handleUpdate)

//導出router給其他模組使用
module.exports = router;
