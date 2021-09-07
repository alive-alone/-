var identity 
function get(item) {
    $.post("http://127.0.0.1:3000/identity", {
        identity:item
    }, function (data, status) {
        console.log(data)
    });
}

$(function() {
    //账号登录
    // $("#loading").click(function(){
    //     // window.location.href="control-admin01.html"  //原生JS
    //     $(location).attr("href","./total/loading02.html")
    //     // window.open("control-admin01.html") //页面跳转
    // });

    //查询申请结果
    $("#apply-result").click(function(){
        $(location).attr("href","../total/query-result.html")
    });
    
/*
    $("#admin-loading").click(function(){
        get("admin");
        // window.location.href="control-admin01.html"  //原生JS
        $(location).attr("href","./admin/admin-loading.html")
        // window.open("control-admin01.html") //页面跳转
        
    });

    
    $("#user-loading").click(function() {
        $(location).attr("href","./users/user-loading.html")
        get("user");
    });

    $("#visitor-loading").click(function() {
        $(location).attr("href","./visitors/visitor-loading.html")
    });
*/
    // $("#register-account").click(function() {
    //     $(location).attr("href","./total/register-account02.html")
    // });

    $("#forget").click(function() {
        $(location).attr("href","../total/forget-password.html")
    });

    $("#admin-apply").click(function(){
        let type = '管理员申请'
        localStorage.setItem("category",JSON.stringify(type));
        $(location).attr("href","../total/application.html")
    });

    $("#user-apply").click(function(){
        let type = '用户申请'
        localStorage.setItem("category",JSON.stringify(type));
        $(location).attr("href","../total/application.html")
    });

    $("#back-load").click(function() {
        // $(location).attr("href","control.html")
        window.history.go(-1);
        console.log('1')
        // window.location.reload()
        //window.history.back();location.reload()
    });
    $("#back01").click(function() {
        window.history.go(-1);
        console.log('1')
    });
    // alert(identity)
})
