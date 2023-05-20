var express = require('express');
var router = express.Router();

const commentController = require('../controllers/commentController')

// 自己寫的中間介，用來導回上一頁
function redirectBack(req, res, next) {
    res.redirect('back')
}

// 提交表單來新增 comment，同樣以 redirectBack 來導回上一頁
router.post('/', commentController.add, redirectBack)
router.get('/delete_comments/:id', commentController.delete)
// 讀取要編輯的 comment
router.get('/update_comments/:id', commentController.update)
// 執行修改 comment
router.post('/update_comments/:id', commentController.handleUpdate)

module.exports = router;
