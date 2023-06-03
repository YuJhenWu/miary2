var createError = require('http-errors');
// 引入 library
var express = require('express');
var path = require('path');
var logger = require('morgan');
// 引入 express-session
var session = require('express-session');
// 引入 db 資料庫: mysql 模組 & 連線資料
const db = require('./models/db')
// 引入 body-parser
const bodyParser = require('body-parser')
// 引入 connect-flash
const flash = require('connect-flash');
// 引入 moment 套件
const moment = require('moment');
// 設定時間格式
const shortDateFormat = "YYYY-MM-DD HH:mm:ss";


// 建立一個不易產生衝突的 port 用來測試
//const port = 5001;
const PORT = process.env.PORT || 3030;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var commentsRouter = require('./routes/comments');

// express 引入的是一個 function
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));
// 在 app.js 中設定載入模組 express-session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
// 透過 locals 傳值給 view: session 功能和 errorMessage
app.use(flash())
app.use((req, res, next) => {
  // 有 username 代表有登入狀態
  res.locals.username = req.session.username
  res.locals.errorMessage = req.flash('errorMessage')
  // 記得加上 next() 把控制權轉移到下一個中間介
  next()
})
// 處理 UTF-8 編碼的資料
app.use(bodyParser.urlencoded({ extended: false }))
// 處理 json 資料
app.use(bodyParser.json())

// 將 moment 和 shortDateFormat 放到 locals 全域環境中
app.locals.moment = moment;
app.locals.shortDateFormat = shortDateFormat;

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/comments', commentsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 運行這個 port，參數分別為 port 和要執行的 function
//app.listen(port, () => {
  // 連線資料庫
 // db.connect()
  //console.log(`Example app listening at http://localhost:${port}`)
//})
app.listen(PORT, () => {
  db.connect();
  console.log(`server started on port ${PORT}`);
});

module.exports = app;
