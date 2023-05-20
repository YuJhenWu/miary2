//引入 PostgreSQL 模組
const { Pool } = require('pg')
const pool = new Pool({
  user: 'app_db_no2w_user',
  host: 'dpg-chiubqjhp8ufsblfi260-a.oregon-postgres.render.com',
  database: 'app_db_no2w',
  password: 'biJk2kzwS3wGcRy0BQjQ9G3oqGXLcNYA',
  port: 5432,
  ssl: true
})
/*
//引入 PostgreSQL 模組
var pgp = require("pg-promise")();

// 建立連線
var connection = pgp("postgres://app_db_no2w_user:biJk2kzwS3wGcRy0BQjQ9G3oqGXLcNYA@dpg-chiubqjhp8ufsblfi260-a.oregon-postgres.render.com/app_db_no2w");

//var connection = pgp("postgres://username:password@host:port/database");

// 引入 mysql 模組
var mysql = require('mysql');
// 建立連線
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '509170621',
  database: 'app'
});
*/
module.exports = pool;
