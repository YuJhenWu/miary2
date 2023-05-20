var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')

// 自己寫的中間介，用來導回上一頁
function redirectBack(req, res, next) {
    res.redirect('back')
}

router.get('/register', userController.register)
router.post('/register', userController.handleRegister, redirectBack)
router.get('/login', userController.login)
router.post('/login', userController.handleLogin, redirectBack)
router.get('/logout', userController.logout)


module.exports = router;
