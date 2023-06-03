//引入 db 模組
const conn = require('./db');

const userModel = {
  // 新增 user
  add: (user, cb) => {
    conn.query(
      'INSERT INTO users(username, password, nickname)  VALUES ($1, $2, $3) RETURNING *',
      [user.username, user.password, user.nickname],
      (err, results) => {
        if (err) return cb(err);
        cb(null);
      }
    );
  },

  // 登入 -> 讀取 user
  get: (username, cb) => {
    conn.query(
      'SELECT * FROM users WHERE username = $1', [username], (err, results) => {
      if (err) return cb(err);
      cb(null, results.rows[0]);//成功：cb(null,使用者的第一列)
    });
  }
}
//導出userModel給其他模組使用
module.exports = userModel;