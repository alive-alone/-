$(function() {
    //点击注册按钮后的界面
    $("#reg-account").click(function(){
        // $(location).attr("href","./admin-interface01.html")
        //查询是否有重复学号
        $.get("http://127.0.0.1:3000/accounts", function (data, status) {
            let result02 = data;
            let result = getData()
            let test = 1
            for(let i =0;i<result02.length;i++) {
                if (result02[i].number == result.number) {
                    test = 0;  
                    break; 
                }
            }
            if(document.getElementById("use-pass").value != document.getElementById("use-pass-again").value) {
                alert("两次输入的密码不一致！")
            }
            else if(test == 1) {
                $.post("http://127.0.0.1:3000/add", {
                    name: result.name,
                    sex: result.sex,
                    grade:result.grade,
                    number:result.number,
                    phone:result.phone,
                    pass:result.pass,
                    identity:'visitor'
                }, function (data, status) {
                    // console.log("另一个数据")
                    // console.log(data)
                });
                alert("注册成功，请返回登录！")
                window.history.go(-1);
            } else {
                alert("该学号已注册，请返回重试！");
            }
        })
        
    });
    //验证账号修改密码
    $("#verify").click(function(){
        $.get("http://127.0.0.1:3000/accounts", function (data, status) {
            // console.log(data);
            let result01 = data;
            let test = 0;
            let result02 = getData();
            for(let i =0;i<result01.length;i++) {
                if(document.getElementById("use-pass").value == document.getElementById("use-pass-again").value) {
                    test = 2;
                    if(result02.identity == result01[i].identity) {
                        if(result02.name == result01[i].name) {
                            if(result02.sex == result01[i].sex && result02.grade == result01[i].grade && result02.number == result01[i].number && result02.phone == result01[i].phone) {
                                editData(result01[i].id,result02.pass);
                                alert("密码修改成功，请返回登录！");
                                // window.history.go(-1);
                                test = 1;
                            }
                            test = 3;
                        }
                    }
                }
            }
            if(test == 0){
                alert("两次输入的密码不一致，请再次输入")
                document.getElementById("use-pass-again").value = ''
            } else if(test == 3) {
                alert("存在不匹配信息，请重新输入")
            } else {
                alert("该用户名不存在！")
            }

        });
    });
    //修改密码
    $("#verify02").click(function(){
        let data = localStorage.getItem("applicant");
        let result = {}
        let test = 0;
        data = JSON.parse(data);
        result.phone = document.getElementById("phone").value
        result.oldpass = document.getElementById("old-pass").value
        result.newpass = document.getElementById("new-pass").value
        result.again = document.getElementById("pass-again").value
        if(result.newpass == result.again) {
            test = 1;
            if(result.oldpass == data.pass && result.phone == data.phone) {
                test = 2;
                editData(data.id,result.newpass);
                alert("修改成功，请重新登录！")
                $(location).attr("href","./loading.html")
                // window.history.go(-2);
            } else {
                alert("存在不匹配信息，请重新输入！")
            }
        } else {
            alert("两次输入密码不一致，请重新输入！")
        }
    })
    
    $("#submit").click(function() {
        let result = getAdminApply()
        let type = localStorage.getItem("category");
        type = JSON.parse(type);
        $.post("http://127.0.0.1:3000/applicant", {
                name    : result.name,
                sex     : result.sex,
                grade   : result.grade,
                number  : result.number,
                material: result.material,
                reason  : result.reason,
                time    : result.time,
                amount  : result.amount,
                type    : type,
            }, function (data, status) {
        });
        alert("申请已发出，等待管理员审核！")
    })

    $("#loadings").click(function(){
        $.get("http://127.0.0.1:3000/accounts", function (data, status) {
            // console.log(data);
            let result = data;
            let test = 0;
            for(let i =0;i<result.length;i++) {
                if(document.getElementById("account-name").value == result[i].number) {
                    test = 2;
                    if(document.getElementById("account-pass").value == result[i].pass) {
                        localStorage.setItem("applicant",JSON.stringify(result[i]));
                        localStorage.setItem("identity",JSON.stringify(result[i].identity));
                        if(result[i].identity == 'admin'){
                            $(location).attr("href","../admin/admin-interface01.html")
                            test = 1;
                            break;
                        } else if(result[i].identity == 'user') {
                            $(location).attr("href","../users/user-interface.html")
                            test = 1;
                            break;
                        } else {
                            $(location).attr("href","../visitors/visitor-interface.html")
                            test = 1;
                            break;
                        }
                    }
                }
            }
            if(test == 0) {
                alert("此账号不存在！")
            } else if(test == 2) {
                alert("账号或密码错误！")
                // window.close()
            }
            // window.history.go(-1);
            // location.reload()
        });
    });

    $.get("http://127.0.0.1:3000/application", function (data, status) {

        let result = data;
        let datas = localStorage.getItem("applicant");

        datas = JSON.parse(datas);

        for(let i =0;i<result.length;i++) {
            if(datas.number == result[i].number) {
                $("#table").append("<tbody>")
                $("#table").append("<td>"+result[i].type+"</td>")
                if(result[i].date == null) {
                    $("#table").append("<td> </td>")
                } else {
                    $("#table").append("<td>"+result[i].date+"</td>")
                }
                if(result[i].type == '物资申请') {
                    $("#table").append("<td>"+result[i].material+"</td>")
                    $("#table").append("<td>"+result[i].time+"</td>")
                } else {
                    $("#table").append("<td> </td>")
                    $("#table").append("<td> </td>")
                }
                if(result[i].result == 1) {
                    $("#table").append("<td>已通过</td>")
                } else if(result[i].result == 0) {
                    $("#table").append("<td>驳回</td>")
                } else {
                    $("#table").append("<td>审核中</td>")
                }
                if(result[i].disreason == null) {
                    $("#table").append("<td> </td>")
                } else {
                    $("#table").append("<td>"+result[i].disreason+"</td>")
                }
                $("#table").append("<td><button class='delete-req' id="+result[i].id+">删除</button></td>")
                $("#table").append("</tbody>")
            }
        }
    });

    $(document).on('click','.delete-req',function() {
		let index = $(this).attr("id");
		index = parseInt(index)
		let truthBeTold = window.confirm("确认删除该申请？")
		if (truthBeTold) {
            $.post("http://127.0.0.1:3000/delete-apply", {
                id : index,
            }, function (data, status) {
                alert('删除成功！')
                location.reload();
            });
		}
	});
    
    //获取注册数据
    function getData() {
        let data = {
            name  :'',
            sex   :'',
            grade :'',
            number:'',
            phone :'',
            pass  :'',
            identity:''
        }
        data.name = document.getElementById("use-name").value
        data.sex = document.getElementById("sexual").value
        data.grade = document.getElementById("grade01").value
        data.number = document.getElementById("stu-num").value
        data.phone = document.getElementById("phone-num").value
        data.pass = document.getElementById("use-pass").value
        data.identity = getIden()
        // console.log("获取用户输入数据")
        return data
    };
    //获取管理员申请资料
    function getAdminApply() {
        let data = {};
        let state = getState()
        let result = localStorage.getItem("applicant");
        result = JSON.parse(result);
        data.name = result.name
        data.sex = result.sex
        data.grade = result.grade
        data.number = result.number
        data.material = document.getElementById("department").value
        data.reason = document.getElementById("admin-reason").value
        data.time = document.getElementById("job").value
        data.amount = state
        return data
    }
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
    //获取身份
    function getIden(){
        var radio = document.getElementsByName("identity");
        for (i=0; i<radio.length; i++) {
            if (radio[i].checked) {
                alert(radio[i].value)
                return radio[i].value
            }
        }
    }
    //获取申请管理员时是否已声明
    function getState(){
        var radio = document.getElementsByName("statement");
        for (i=0; i<radio.length; i++) {
            if (radio[i].checked) {
                return radio[i].value
            }
        }
    }
    //修改密码
    function editData(id,pass) {
        $.post("http://127.0.0.1:3000/edit", {
            id: id,
            pass:pass,
          }, function (data, status) {
            // console.log(data)
          });
    };

})