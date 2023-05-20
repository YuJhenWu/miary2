
const conn = require('./db');

const userModel = {
  // 新增 user 功能
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

  // 登入 -> 讀取 user 功能
  get: (username, cb) => {
    conn.query(
      'SELECT * FROM users WHERE username = $1', [username], (err, results) => {
      if (err) return cb(err);
      cb(null, results.rows[0]);
    });
  }
}

module.exports = userModel;