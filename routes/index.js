var express = require('express');
var router = express.Router();

const commentController = require('../controllers/commentController')

router.get('/', commentController.index)

module.exports = router;
