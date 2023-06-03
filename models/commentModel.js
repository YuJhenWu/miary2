//引入 db 模組
const db = require('./db');

const commentModel = {
    // 新增 comment
    add: (username, content, cb) => {
      //查詢db，參數(SQL字串,參數值（[username, content]）,callback函數)
      db.query(
        //SQL INSERT
        'INSERT INTO comments(username, content) VALUES($1, $2) RETURNING *',
        [username, content],
        (err, results) => {
          //失敗：cb(err)
          if (err) return cb(err);
          cb(null);//成功：cb(null)
        }
      );
    },
    // 讀取 所有comment
    getAll: (cb) => {
      db.query(
        `
        SELECT U.nickname, U.created_at, C.content, C.id, C.username, C.created_at 
        FROM comments as C
        LEFT JOIN users as U on U.username = C.username
        ORDER BY C.created_at DESC       
        `,
        (err, results) => {
        if (err) return cb(err);
        cb(null, results.rows);//成功：cb(null,每一列留言)
      });
    },

    // 讀取 指定id的 comment
    get: (id, cb) => {
      db.query(
        `
        SELECT U.nickname, U.created_at, C.content, C.id, C.username, C.created_at 
        FROM comments as C
        LEFT JOIN users as U on U.username = C.username
        WHERE C.id = $1  
        `, [id],
        (err, results) => {
          if (err) return cb(err);
          // 如果結果是 undefined 就會傳空物件，可避免程式出現錯誤
          cb(null, results.rows[0] || {});//成功：cb(null,留言的第一列)
        }
      );
    },
    //刪除 comment
    delete: (username, id, cb) => {
      db.query(
        `
          DELETE FROM comments WHERE id=$1 AND username=$2
        `, [id, username], 
        (err, results) => {
          if (err) return cb(err);
          cb(null);
      });  
    },
    //編輯 comment
    update: (username, id, content, cb) => {
      db.query(
        `
          UPDATE comments SET content=$1 WHERE  id=$2 AND username=$3
        `, [content, id, username],
        (err, results) => {
          if (err) return cb(err);
          cb(null);
        });
      }
  }
  //導出commentModel給其他模組使用
  module.exports = commentModel;