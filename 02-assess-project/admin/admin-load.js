$(function() {
    $("#admin-load").click(function(){
    // $(location).attr("href","./admin-interface01.html")
        $.get("http://127.0.0.1:3000/accounts", function (data, status) {
            // console.log(data);
            let result = data;
            let test = 0;
            for(let i =0;i<result.length;i++) {
                if(document.getElementById("adm-name").value == result[i].number) {
                    test = 2;
                    if(result[i].identity == 'admin') {
                        if(document.getElementById("adm-pass").value == result[i].pass) {
                            test = 1
                            $(location).attr("href","./admin-interface01.html")
                            break;
                        }
                    }
                }
            }
            console.log(test)
            if(test == 0) {
                alert("此账号不存在！")
            } else if(test == 2) {
                alert("账号或密码错误！")
            }
        });
    });
    //跳转到物资管理界面
    $("#metarial").click(function() {
        $(location).attr("href","./metarial-control/met-con.html")
    });

    $("#apply").click(function() {
        $(location).attr("href","./apply-control/app-con.html")
    });

    $("#users").click(function() {
        $(location).attr("href","./account-control/acc-con.html")
    });

    function getIdentity() {
        //alert("admin")
        return 'admin'
    }
    
    function getMetarial(iden) {
        $.get("http://127.0.0.1:3000/metarial", function (data, status) {
            // console.log(data);
            let result = data;
            metarials = data;
            let time = getDate();
            for(let i =0;i<result.length;i++) {
                $("#tab01").append("<tbody>")
                $("#tab01").append("<td><input type='checkbox'>已选</td>")
                $("#tab01").append("<td>"+result[i].name+"</td>")
                $("#tab01").append("<td>"+result[i].type+"</td>")
                $("#tab01").append("<td>"+result[i].place+"</td>")
                $("#tab01").append("<td>"+result[i].state+"</td>")
                // $("#tab01").append("<td>"+result[i].date.substring(0,10)+"</td>")
                $("#tab01").append("<td>"+ time +"</td>")
    
                if(iden == 'admin') {
                    $("#tab01").append("<td>"+ "<button class='control' id="+ result[i].id + " type='button'>"+"管理</button>" +"</td>")
                } else {
                    $("#tab01").append("<td>"+ "<button class='apply' id="+ result[i].id + " type='button'>"+"申请</button>" +"</td>")
                }
                
                $("#tab01").append("</tbody>")
            }
        });    
    }
/*
    //跳转到找回密码界面
    $("#forget01").click(function() {
        $(location).attr("href","../total/forget-password.html")
    });

    $("#verify").click(function(){
        $.get("http://127.0.0.1:3000/admin", function (data, status) {
            // console.log(data);
            let result01 = data;
            let test = 0;
            let result02 = getData();
            // console.log("result01");
            // console.log(result01);
            // console.log("result02");
            // console.log(result02);
            for(let i =0;i<result01.length;i++) {
                if(document.getElementById("use-pass").value == document.getElementById("use-pass-again").value) {
                    test = 2;
                    if(result02.name == result01[i].name && result02.sex == result01[i].sex && result02.grade == result01[i].grade && result02.number == result01[i].number && result02.phone == result01[i].phone) {
                        editDtat(result01[i].id,result02.pass);
                        alert("密码修改成功，请返回登录！");
                        window.history.go(-1);
                        test = 1;
                    }
                }
            }
            if(test == 0){
                alert("两次输入的密码不一致，请再次输入")
                document.getElementById("use-pass-again").value = ''
            } else if(test == 2) {
                alert("存在不匹配信息，请重新输入")
            } else {

            }

        });
    });

    //修改数据
    function editDtat(id,pass) {
        $.post("http://127.0.0.1:3000/edit", {
            id: id,
            pass:pass,
          }, function (data, status) {
            // console.log(data)
          });
    };

    //发送信息
    function postData() {
        let result = getData()
        $.post("http://127.0.0.1:3000/add", {
            name: result.name,
            sex: result.sex,
            grade:result.grade,
            number:result.number,
            phone:result.phone,
            pass:result.pass,
        }, function (data, status) {
            // console.log(data)
      });
      console.log("这里没有问题")
      console.log("------"+result.pass)
    };


    //获取密码找回数据
    function getData() {
        if(document.getElementById("use-pass").value == document.getElementById("use-pass-again").value) {
            var data = {
                name:'',
                sex:'',
                grade:'',
                number:'',
                phone:'',
                pass:''
            }
            data.name = document.getElementById("use-name").value
            data.sex = getSex()
            data.grade = document.getElementById("grade01").value
            data.number = document.getElementById("stu-num").value
            data.phone = document.getElementById("phone-num").value
            data.pass = document.getElementById("use-pass").value

            // console.log(data)
        }
        else {
            alert("两次输入的密码不一致，请再次输入")
            document.getElementById("use-pass-again").value = ''
        }
        return data
    };

    //获取性别
    function getSex() {
        var radio = document.getElementsByName("sex");
        for (i=0; i<radio.length; i++) {
            if (radio[i].checked) {
                // alert(radio[i].value)
                return radio[i].value
            }
        }
    }
    */
})