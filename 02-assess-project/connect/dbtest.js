const express = require('E:/Develop/nodejs/node_global/node_modules/express') // 引入express模块
const mysql = require('E:/Develop/nodejs/node_global/node_modules/mysql') // 引入mysql模块
const bodyParser = require('E:/Develop/nodejs/node_global/node_modules/body-parser');/*支持post方法*/
// const md5 = require('E:/Develop/module/md5/node_modules/md5');

const app = express()  // 创建express的实例
const port = 3000  // 定义监听端口
//https://www.cnblogs.com/zhengweijie/p/13026539.html
app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({ extended: false }));

// 定义连接的数据库
const connection = mysql.createConnection({
  host: 'localhost',   // 服务器端口
  user: 'root',        // 用户名称
  password: 'Root',  // 密码
  database: 'foot'         // 连接的数据库
});

// 允许接口跨域  这里指定允许所有接口跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


connection.connect();  // 启动连接数据库

// MySQL语法，这句意思为查询 SELECT * FROM表示查询，tets2表示查询的数据表
const showSql01 = 'SELECT * FROM met01' //物资信息

const showSql02 = 'SELECT * FROM admin'  //管理员信息

const showSql03 = 'SELECT * FROM users'  //用户信息

const showSql04 = 'SELECT * FROM applicant'  //游客信息

const showSql05 = 'SELECT * FROM accounts'  //游客信息

const showSql06 = 'SELECT * FROM identity'  //游客信息

// // 服务端响应login接口，POST请求方式
// app.post('/login', function (req, res, next) {
//   const username = req.body.name; //获取post请求参数
//   const pwd = req.body.passwor;
//   res.json({ name: username, pwd: pwd });//数据返回前端
// });

// // 服务器响应请求 当前端发起 /list 接口的请求后，会触发这个逻辑
// app.get('/list', (req, res) => {
//   connection.query(showSql, function (err, result) {
//     if (err) {  // 操作失败报错
//       console.log('[SELECT ERROR]:', err.message);
//     }
//     res.send(result)  // 将查询结果返回给页面
//   });
// })

// 服务器响应请求---01物资加载
app.get('/metarial', (req, res) => {
  connection.query(showSql01, function (err, result) {
    if (err) {  // 操作失败报错
      console.log('[SELECT ERROR]:', err.message);
    }
    // console.log(result);  //数据库查询结果返回到result中
    res.send(result)
  });
  // setTimeout(function(){
  //   connection.end();
  // })
})
/*
//2.管理员账户信息
app.get('/admin', (req, res) => {
  connection.query(showSql02, function (err, result) {
    if (err) {  // 操作失败报错
      console.log('[SELECT ERROR]:', err.message);
    }
    // console.log(result);  //数据库查询结果返回到result中
    res.send(result)
  });
})

//3.用户账号信息
app.get('/users', (req, res) => {
  connection.query(showSql03, function (err, result) {
    if (err) {  // 操作失败报错
      console.log('[SELECT ERROR]:', err.message);
    }
    // console.log(result);  //数据库查询结果返回到result中
    res.send(result)
  });
})
*/
//获取各类申请信息
app.get('/application', (req, res) => {
  connection.query(showSql04, function (err, result) {
    if (err) {  // 操作失败报错
      console.log('[SELECT ERROR]:', err.message);
    }
    // console.log(result);  //数据库查询结果返回到result中
    res.send(result)
  });
})

//3.获取账号信息
app.get('/accounts', (req, res) => {
  connection.query(showSql05, function (err, result) {
    if (err) {  // 操作失败报错
      console.log('[SELECT ERROR]:', err.message);
    }
    // console.log(result);  //数据库查询结果返回到result中
    res.send(result)
  });
})

app.get('/identity', (req, res) => {
  connection.query(showSql06, function (err, result) {
    if (err) {  // 操作失败报错
      console.log('[SELECT ERROR]:', err.message);
    }
    // console.log(result);  //数据库查询结果返回到result中
    res.send(result)
  });
})


//保存用户注册账户信息
app.post('/add', function (req, res, next) {
  const name = req.body.name;
  const sex = req.body.sex;
  const grade = req.body.grade;
  const number = req.body.number;
  const phone = req.body.phone;
  const pass = req.body.pass;
  const identity = req.body.identity;

  const addSqlParams = [name,sex,grade,number,phone,pass,identity];
  // MySQL语法，这句意思为查询 INSERT INTO表示新增，tets2表示查询的数据表 (name,email,age) VALUES(?,?,?) 表示新增的字段
  const addSql = 'INSERT INTO accounts(name,sex,grade,number,phone,pass,identity) VALUES(?,?,?,?,?,?,?)';

  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    res.json(result);//数据返回结果
  });

});

//保存增加物资信息
app.post('/add-meterial', function (req, res, next) {
  const name = req.body.name;
  const type = req.body.type;
  const place = req.body.place;
  const attribute = req.body.attribute;
  const state = req.body.state;

  const addSqlParams = [name,type,place,attribute,state];
  // MySQL语法，这句意思为查询 INSERT INTO表示新增，tets2表示查询的数据表 (name,email,age) VALUES(?,?,?) 表示新增的字段
  const addSql = 'INSERT INTO met01(name,type,place,attribute,state) VALUES(?,?,?,?,?)';

  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    res.json(result);//数据返回结果
  });

});

//找回密码时的密码修改
app.post('/edit', function (req, res, next) {
  const id = req.body.id;
  const pass = req.body.pass;

  const modSqlParams = [pass, id];
  // MySQL语法，这句意思为改数据 UPDATE 表示更改，tets2表示更改的数据表 SET  name= ?,email = ? 表示更改name 和 email字段，WHERE Id = ? 表示更改条件 
  const modSql = 'UPDATE accounts SET  pass = ? WHERE Id = ?';

  connection.query(modSql, modSqlParams, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    res.json(result);//数据返回结果
  });

});

//储存登录者的身份信息
app.post('/identity', function (req, res, next) {
  const id = 1;
  const identity = req.body.identity;

  const modSqlParams = [identity, id];
  // MySQL语法，这句意思为改数据 UPDATE 表示更改，tets2表示更改的数据表 SET  name= ?,email = ? 表示更改name 和 email字段，WHERE Id = ? 表示更改条件 
  const modSql = 'UPDATE identity SET  identity = ? WHERE Id = ?';

  connection.query(modSql, modSqlParams, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    res.json(result);//数据返回结果
  });

});

//储存申请信息
app.post('/applicant', function (req, res, next) {
  const name = req.body.name;
  const sex = req.body.sex;
  const grade = req.body.grade;
  const number = req.body.number;
  const material = req.body.material;
  const reason = req.body.reason;
  const time = req.body.time;
  const amount = req.body.amount;
  const type = req.body.type;

  const addSqlParams = [name,sex,grade,number,material,reason,time,amount,type];
  // MySQL语法，这句意思为查询 INSERT INTO表示新增，tets2表示查询的数据表 (name,email,age) VALUES(?,?,?) 表示新增的字段
  const addSql = 'INSERT INTO applicant(name,sex,grade,number,material,reason,time,amount,type) VALUES(?,?,?,?,?,?,?,?,?)';

  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    res.json(result);//数据返回结果
  });

});

//返回管理员对物资修改的信息
app.post('/met-edit', function (req, res, next) {
  const id = req.body.id;
  const place = req.body.place;
  const state = req.body.state

  const modSqlParams = [place,state, id];
  // MySQL语法，这句意思为改数据 UPDATE 表示更改，tets2表示更改的数据表 SET  name= ?,email = ? 表示更改name 和 email字段，WHERE Id = ? 表示更改条件 
  const modSql = 'UPDATE met01 SET  place = ?,state = ? WHERE Id = ?';

  connection.query(modSql, modSqlParams, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    res.json(result);//数据返回结果
  });

});

//修改权限
app.post('/accounts-edit', function (req, res, next) {
  const number = req.body.number;
  const identity = req.body.identity;
  if(req.body.department == null || undefined) {
    const modSqlParams = [identity, number];
    const modSql = 'UPDATE accounts SET  identity = ? WHERE number = ?';
    connection.query(modSql, modSqlParams, function (err, result) {
      if (err) {
        console.log('[UPDATE ERROR] - ', err.message);
        return;
      }
      res.json(result);
    });
  } else {
    const department = req.body.department
    const modSqlParams = [identity,department,number];
    const modSql = 'UPDATE accounts SET  identity = ?,department = ? WHERE number = ?';
    connection.query(modSql, modSqlParams, function (err, result) {
      if (err) {
        console.log('[UPDATE ERROR] - ', err.message);
        return;
      }
      res.json(result);
    });
  }
});

//记录账号删除次数
app.post('/acc-edit', function (req, res, next) {
  const id = req.body.id;
  const times = req.body.times;
  const reviewer = req.body.reviewer
  const modSqlParams = [times,reviewer, id];
  // MySQL语法，这句意思为改数据 UPDATE 表示更改，tets2表示更改的数据表 SET  name= ?,email = ? 表示更改name 和 email字段，WHERE Id = ? 表示更改条件 
  const modSql = 'UPDATE accounts SET times = ?,reviewer = ? WHERE Id = ?';

  connection.query(modSql, modSqlParams, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    res.json(result);//数据返回结果
  });

});

// 删除物资
app.post('/delete', function (req, res, next) {
  const id = req.body.id;
  const delSql = `DELETE FROM met01 where id=${id}`; //数据库代码，tets2表中删除id为传入值的那一行。

  connection.query(delSql, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    res.json(result);//数据返回结果
  });
});

// 管理员删除账号
app.post('/account-delete', function (req, res, next) {
  const id = req.body.id;
  const delSql = `DELETE FROM accounts where id=${id}`; //数据库代码，tets2表中删除id为传入值的那一行。

  connection.query(delSql, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    res.json(result);//数据返回结果
  });
});


//返回申请结果
app.post('/apply-result', function (req, res, next) {
  const id = req.body.id;
  const result = req.body.result;
  const date = req.body.date;
  if(req.body.disreason == null || undefined) {
    const modSqlParams = [result,date, id];
    // MySQL语法，这句意思为改数据 UPDATE 表示更改，tets2表示更改的数据表 SET  name= ?,email = ? 表示更改name 和 email字段，WHERE Id = ? 表示更改条件 
    const modSql = 'UPDATE applicant SET  result = ?,date = ? WHERE id = ?';

    connection.query(modSql, modSqlParams, function (err, result) {
      if (err) {
        console.log('[UPDATE ERROR] - ', err.message);
        return;
      }
      res.json(result);//数据返回结果
    });
  } else {
    const disreason = req.body.disreason
    const modSqlParams = [result,disreason,date, id];
    const modSql = 'UPDATE applicant SET  result = ?,disreason=?,date = ? WHERE id = ?';
    connection.query(modSql, modSqlParams, function (err, result) {
      if (err) {
        console.log('[UPDATE ERROR] - ', err.message);
        return;
      }
      res.json(result);//数据返回结果
    });
  }
});

// 用户和管理员申请通过后删除申请
app.post('/delete-apply', function (req, res, next) {
  const id = req.body.id;
  const delSql = `DELETE FROM applicant where id=${id}`; //数据库代码，tets2表中删除id为传入值的那一行。
  connection.query(delSql, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    res.json(result);//数据返回结果
  });
});

// 监听3000端口
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//connection.end(); //结束连接！！！不能一直连着！！