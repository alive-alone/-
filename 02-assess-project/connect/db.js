const mysql = require("E:/Develop/nodejs/node_global/node_modules/mysql");


var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Root',
    database:'foot'
});
connection.connect();
/*
let name = "李华";
let sex = "男";
// 执行sql语句
connection.query(
  `insert into text(name,sex) values("${name}","${sex}")`,
  function (error, results) {
    if (error == null) {
      console.log(results); // 返回结果是一个对象
      console.log(results.affectedRows); // 受影响的行数，如果大于0，说明新增成功
      console.log(results.insertId); // 插入的这条数据的id
    }
  }
);
*/
connection.query('SELECT * from met01',function(error,result,fields){
  if(error) throw error;
  console.log('result:',result);
  // res = result;
  // console.log('---'+res)
  // for(let i = 0;i< res.length;i++) {
  //   console.log(res[i])
  // }
  res = result;
});

function getData(){
  return res
}

connection.end();//wjdQdvsph1,g//Root


