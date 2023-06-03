// 引入 commentModel
const commentModel = require('../models/commentModel')

const commentController = {
  //新增留言
  add: (req, res) => {
    //從 req.session 中得到username
    const {username} = req.session
    //從 req.body 中得到留言內容 
    const {content} = req.body
    if (!content) { // 留言內容不存在,傳送errorMessage
      req.flash('errorMessage', '缺少必要欄位');
      return res.redirect('/')//導回首頁
    }
    // 新增失敗就導回首頁
    commentModel.add(username, content, err => {
      return res.redirect('/');
    })
    
  },
  // 在 index 頁面讀取所有留言
  index: (req, res) => {
    //得到所有留言
    commentModel.getAll((err, results) => {
      // 失敗, console 印出error
      if (err) {
        console.log(err);
      }
      // 成功, 渲染 index 頁面並傳遞title、username和comments結果
      res.render('index', {
        title : 'Miary',
        username: req.session.username,
        comments: results
      });
    });
  },
  //刪除留言
  delete: (req, res) => {
    // 除了網址列(URL)上的 id，也需傳入 req.session 確認是否為該 comment 原作者
    commentModel.delete(req.session.username, req.params.id, err => {
      res.redirect('/');//導回首頁
    })
  },
  //修改留言
  update: (req, res) => {
    //得到指定 id 的留言
    commentModel.get(req.params.id, (err, result) => {
      //渲染 update 頁面並傳遞title和comment結果
      res.render('update', {
        title : 'Miary',
        comment: result
      });
    });
  },
  //處理修改留言
  handleUpdate: (req, res) => {
    // 後端驗證: 必須是本人才有權限修改
    commentModel.update(req.session.username, req.params.id, req.body.content, err => {
      res.redirect('/')//導回首頁
    });
  }
  
}

  //導出commentController給其他模組使用
module.exports = commentController;