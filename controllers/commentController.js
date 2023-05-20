// 引入 commentModel
const commentModel = require('../models/commentModel')

const commentController = {
  add: (req, res) => {
    const {username} = req.session
    const {content} = req.body
    if (!content) {
      req.flash('errorMessage', '缺少必要欄位');
      return res.redirect('/')
    }
    // 若新增失敗就導回首頁
    commentModel.add(username, content, err => {
      return res.redirect('/');
    })
    
  },
  // 在 index 頁面讀取資料
  index: (req, res) => {
    commentModel.getAll((err, results) => {
      if (err) {
        console.log(err);
      }
      res.render('index', {
        title : 'Miary',
        username: req.session.username,
        comments: results
      });
    });
  },

  delete: (req, res) => {
    // 除了網址列上的 id，也需傳入 session 以確認是否為該 comment 作者
    commentModel.delete(req.session.username, req.params.id, err => {
      res.redirect('/');
    })
  },

  update: (req, res) => {
    commentModel.get(req.params.id, (err, result) => {
      res.render('update', {
        title : 'Miary',
        comment: result
      });
    });
  },

  handleUpdate: (req, res) => {
    // 後端驗證: 必須是本人才有權限修改
    commentModel.update(req.session.username, req.params.id, req.body.content, err => {
      res.redirect('/')
    });
  }
  
}

// 輸出commentController
module.exports = commentController;