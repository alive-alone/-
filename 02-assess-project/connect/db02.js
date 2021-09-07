const express = require('E:/Develop/nodejs/node_global/node_modules/express') // 引入express模块
const mysql = require('E:/Develop/nodejs/node_global/node_modules/mysql') // 引入mysql模块

// 创建mysql实例
const connection = mysql.createConnection({
  host: 'localhost',   // 服务器端口
  user: 'root',        // 用户名称
  password: 'Root',  // 密码
  database: 'foot'         // 连接的数据库
});
const app = express()  // 创建express的实例
const port = 3000  // 定义监听端口


connection.connect();  // 启动连接数据库

// MySQL语法，这句意思为查询 SELECT * FROM表示查询，test1表示查询的数据表
const showSql = 'SELECT * FROM met01'
/*
// MySQL语法，这句意思为增加数据 INSERT INTO表示增加，test1表示增加的数据表 (name, age, email)为数据格式 VALUES(?,?,?) 为值
const addSql = "INSERT INTO tets2 (name, age, email) VALUES (?,?,?)";
const addSqlParams = ['菜鸟', 18, 'https://c.xxrunoob.com']; // 这是想增加的数据

// 写入数据
connection.query(addSql, addSqlParams, function (err, result) {
  if (err) {  // 操作失败报错
    console.log('[SELECT ERROR]:', err.message);
  }
  console.log(result);  //数据库查询结果返回到result中
});
*/
// 查询数据
connection.query(showSql, function (err, result) {
  if (err) {  // 操作失败报错
    console.log('[SELECT ERROR]:', err.message);
  }
  console.log("****************************")
  console.log(result);  //数据库查询结果返回到result中
});

// 服务器响应请求
app.get('/', (req, res) => {
  connection.query(showSql, function (err, result) {
    if (err) {  // 操作失败报错
      console.log('[SELECT ERROR]:', err.message);
    }
    console.log(result);  //数据库查询结果返回到result中

  });
})

// 监听3000端口
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


connection.end(); //结束连接！！！不能一直连着！！