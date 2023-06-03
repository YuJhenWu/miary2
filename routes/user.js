var express = require('express');
var router = express.Router();

//引入了 "../controllers/userController" 路徑下的 userController module
const userController = require('../controllers/userController')

// 自定義中間介，用於導回上一頁
function redirectBack(req, res, next) {
    res.redirect('back')
}

// 處理 GET 請求，顯示註冊頁面
router.get('/register', userController.register)
// 處理 POST 請求，提交表單來新增註冊，並導回上一頁
router.post('/register', userController.handleRegister, redirectBack)
// 處理 GET 請求，顯示登入頁面
router.get('/login', userController.login)
// 處理 POST 請求，提交表單來執行登入，並導回上一頁
router.post('/login', userController.handleLogin, redirectBack)
// 處理 GET 請求，執行登出
router.get('/logout', userController.logout)

//導出router給其他模組使用
module.exports = router;
