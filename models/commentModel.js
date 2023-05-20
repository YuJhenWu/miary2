const conn = require('./db');

const commentModel = {
    // 新增 comment 功能
    add: (username, content, cb) => {
      conn.query(
        'INSERT INTO comments(username, content) VALUES($1, $2) RETURNING *',
        [username, content],
        (err, results) => {
          if (err) return cb(err);
          cb(null);
        }
      );
    },
    // 讀取 comment 功能
    getAll: (cb) => {
      // 資料庫關聯
      conn.query(
        `
        SELECT U.nickname, U.created_at, C.content, C.id, C.username, C.created_at 
        FROM comments as C
        LEFT JOIN users as U on U.username = C.username
        ORDER BY C.created_at DESC       
        `,
        (err, results) => {
        if (err) return cb(err);
        cb(null, results.rows);
      });
    },

    get: (id, cb) => {
      conn.query(
        `
        SELECT U.nickname, U.created_at, C.content, C.id, C.username, C.created_at 
        FROM comments as C
        LEFT JOIN users as U on U.username = C.username
        WHERE C.id = $1  
        `, [id],
        (err, results) => {
          if (err) return cb(err);
          // 如果結果是 undefined 就會傳空物件，可避免程式出現錯誤
          cb(null, results.rows[0] || {});
        }
      );
    },

    delete: (username, id, cb) => {
      conn.query(
        `
          DELETE FROM comments WHERE id=$1 AND username=$2
        `, [id, username], 
        (err, results) => {
          if (err) return cb(err);
          cb(null);
      });  
    },
    update: (username, id, content, cb) => {
      conn.query(
        `
          UPDATE comments SET content=$1 WHERE  id=$2 AND username=$3
        `, [content, id, username],
        (err, results) => {
          if (err) return cb(err);
          cb(null);
        });
      }
  }
  module.exports = commentModel;