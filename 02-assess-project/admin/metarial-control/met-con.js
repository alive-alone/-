$(function() {
    // 加载物资信息
    $.get("http://127.0.0.1:3000/metarial", function (data, status) {
        let result = data;
        localStorage.setItem("metarial",JSON.stringify(result));
        loadData() 
    });
    //展示用户点击“申请”后的界面
    $(document).on('click','.apply',function() {
        let index = $(this).attr("id");
        index = parseInt(index)
        localStorage.setItem("id",JSON.stringify(index));
        let data = localStorage.getItem("metarial");
        data = JSON.parse(data);
        $("#div-03").show(500);
        document.getElementById('iframe_b').src = "apply01.html"
        $("*").click(function (e) {
            if (!$(this).hasClass("div02")) {
                $("#div-03").hide(500);
            }
        })
    })
    //展示管理员点击“管理”后的界面
    $(document).on('click','.control',function() {
        let index = $(this).attr("id");
        index = parseInt(index)
        localStorage.setItem("id02",JSON.stringify(index));
        
        $("#div-02").show(500);
        document.getElementById('iframe_a').src = "change.html"
        //点击空白处弹出框消失
        $("*").click(function (e) {
            if (!$(this).hasClass("div02")) {
                $("#div-02").hide(500);
            } 
        })
          
    })
    $("#add").click(function() {
        $("#div-04").show(500);
        document.getElementById('iframe_b').src = "apply01.html"
        $("*").click(function (e) {
            let _con = $('.container');
            if(!_con.is(e.target) && _con.has(e.target).length === 0 ) {
                $("#div-04").hide(500);
            }
        })
    })
    //管理员添加物资
    $("#add-met").click(function() {
        let data = getMet();
        $.post("http://127.0.0.1:3000/add-meterial", {
            name : data.name,
            type : data.type,
            place : data.place,
            state : data.state,
            attribute : data.attribute,
        }, function (data, status) {
            
        });
        alert("添加成功!")
        window.parent.$("#div-04").hide(500);
        window.parent.location.reload()
    })
    //管理员物资删除操作
    $("#del-met").click(function() {
        let index = localStorage.getItem("id02");
        index = parseInt(index)
        console.log(index)
        let truthBeTold = window.confirm("删除该物资信息？")
        if (truthBeTold) {
            $.post("http://127.0.0.1:3000/delete", {
                id:index,
            }, function (data, status) {
                alert('删除成功')
            });     
        } 
        window.parent.$("#div-02").hide(500);
        setTimeout(function() {
            window.parent.location.reload()
        },500)
    });
    //管理员物资状态修改
    $("#determine").click(function() {
        let truthBeTold = window.confirm("确认修改物资信息？")
        if (truthBeTold) {
            getData02();
            alert('修改成功!');
        } 
        window.parent.$("#div-02").hide(500);
        setTimeout(function() {
            window.parent.location.reload()
        },500)
    })
    //用户提交物资申请
    $("#submit01").click(function() {
        
        let data = getData();
        $.post("http://127.0.0.1:3000/applicant", {
            name : data.name,
            sex : data.sex,
            grade : data.grade,
            number : data.number,
            material : data.material,
            reason : data.reason,
            time : data.time,
            amount : data.amount,
            type:data.type,
        }, function (data, status) {
            
        });
        alert("申请已发出，等待管理员审核！")
        window.parent.$("#div-02").hide(500);
    });
    //获取物资的原状态信息
    getDefault()
    function getDefault() {
        let index = localStorage.getItem("id02");
        let datas = localStorage.getItem("metarial");
        let id01
        let id02
        index = parseInt(index)
        datas = JSON.parse(datas);
        for(let i = 0;i<datas.length;i++) {
            if(datas[i].id == index) {
                id01 = datas[i].place
                id02 = datas[i].state
            }
        }
        // $("input[name=position][value="+id01+"]").attr("checked",true); -->这种方式可以
        // $("input[id="+id01+"]").attr("checked",true);                   -->这种也方式可以
        $("input[name=position][id="+id01+"]").attr("checked",true);
        $("input[name=state][value="+id02+"]").attr("checked",true);
    }

    //动态搜索功能
    $(document).on("input propertychange","#search",function () {
        loadData();
    })

    //获取当地时间
    function getDate() {
        let time = new Date();
        let month = time.getMonth() + 1
        time = time.getFullYear()+ '-' + month + '-' +time.getDate()+ '-'  +time.getHours() + ':' + time.getMinutes() 
        return time
    }
    //获取申请人信息和申请物资的信息
    function getData() {
        let data = {
            name:'',
            sex:'',
            grade:'',
            number:'',
            material:'',
            reason:'',
            time:'',
            amount:''
        }

        let result = localStorage.getItem("applicant");
        let datas = localStorage.getItem("metarial");
        let index = localStorage.getItem("id");
        let id01
        datas = JSON.parse(datas);
        result = JSON.parse(result);
        for(let i = 0;i<datas.length;i++) {
            if(datas[i].id == index) {
                id01 = datas[i].name
            }
        }
        data.name = result.name
        data.sex = result.sex
        data.grade = result.grade
        data.number = result.number
        data.material = id01;
        data.reason = document.getElementById("reason").value
        data.time = document.getElementById("start").value +'--'+ document.getElementById("end").value
        data.amount = document.getElementById("amount").value
        data.type = '物资申请'
        return data
    }
       //获取添加物资的信息
    function getMet() {
        let data = {
            name:'',
            type:'',
            place:'',
            attribute:'',
            state:'',
        }
        let result = getAdd();
        data.name = document.getElementById("met-name").value 
        data.type = document.getElementById("met-type").value
        data.place = result[0]
        data.attribute = result[1]
        data.state = document.getElementById("status01").value
        return data
    };

    //获取管理员修改物资状态的信息
    function getData02() {
        let index = localStorage.getItem("id02");
        let place = getPosition();
        let state = getState();

        index = parseInt(index)
        $.post("http://127.0.0.1:3000/met-edit",{
            id : index,
            place : place,
            state : state,
        },function(data,status) {

        });
    }
    //获取管理员物资位置修改信息
    function getPosition() {
        let radio = document.getElementsByName("position");
        for (i=0; i<radio.length; i++) {
            if (radio[i].checked) {
                return radio[i].value
            }
        }
    }
    //获取管理员物资状态修改信息
    function getState() {
        let radio = document.getElementsByName("state");
        for (i=0; i<radio.length; i++) {
            if (radio[i].checked) {
                return radio[i].value
            }
        }
    }

    function getAdd() {
        let data = ['','']
        let radio = document.getElementsByName("place");
        for (i=0; i<radio.length; i++) {
            if (radio[i].checked) {
                data[0] = radio[i].value
            }
        }
        radio = document.getElementsByName("attribute");
        for(i=0;i<radio.length;i++) {
            if (radio[i].checked) {
                data[1] = radio[i].value
            }
        }
        console.log(data)
        return data
    }
   //加载搜索数据
	function loadData() {
        let time = getDate();
        let iden = localStorage.getItem("identity");
        iden = JSON.parse(iden);
		let result = [];
		let sstxt= $('#search').val();
		let data = localStorage.getItem("metarial");
        data = JSON.parse(data);
		if(sstxt == '' || null) {
			result = [];
			$('table tbody,td').remove();
			result = data;
			for(let i =0;i<result.length;i++) {
                $("#tab01").append("<tbody>")
                $("#tab01").append("<td><input type='checkbox'>已选</td>")
                $("#tab01").append("<td>"+result[i].name+"</td>")
                $("#tab01").append("<td>"+result[i].type+"</td>")
                $("#tab01").append("<td>"+result[i].place+"</td>")
                $("#tab01").append("<td>"+result[i].state+"</td>")
                // $("#tab01").append("<td>"+result[i].date.substring(0,10)+"</td>")
                $("#tab01").append("<td>"+ time +"</td>")
                //判断身份
                if(iden == 'admin') {
                    $("#tab01").append("<td class='met-btn'>"+ "<button class='control' id="+ result[i].id + " type='button'>"+"管理</button>" +"</td>")
                } else {
                    $("#add").hide()
                    if(result[i].state == '缺少' || result[i].state == '忙碌') {
                        $("#tab01").append("<td> </td>")
                    } else {
                        $("#tab01").append("<td class='met-btn'>"+ "<button class='apply' id="+ result[i].id + " type='button'>"+"申请</button>" +"</td>")
                    }  
                }
                $("#tab01").append("</tbody>")
            }
		} else {
			let result02 = [];
            let result03 = [];
			result = [];
			$('table tbody,td').remove();
			result = data.filter(ele => ele.name.search(sstxt) == 0);
			result02 = data.filter(ele => ele.type.search(sstxt) == 0);
            result03 = data.filter(ele => ele.state.search(sstxt) == 0);
			result = $.extend(result, result02,result03)
			for(let i =0;i<result.length;i++) {
                $("#tab01").append("<tbody>")
                $("#tab01").append("<td><input type='checkbox'>已选</td>")
                $("#tab01").append("<td>"+result[i].name+"</td>")
                $("#tab01").append("<td>"+result[i].type+"</td>")
                $("#tab01").append("<td>"+result[i].place+"</td>")
                $("#tab01").append("<td>"+result[i].state+"</td>")
                // $("#tab01").append("<td>"+result[i].date.substring(0,10)+"</td>")
                $("#tab01").append("<td>"+ time +"</td>")
                //判断身份
                if(iden == 'admin') {
                    $("#tab01").append("<td class='met-btn'>"+ "<button class='control' id="+ result[i].id + " type='button'>"+"管理</button>" +"</td>")
                } else {
                    $("#add").hide()
                    if(result[i].state == '缺少' || result[i].state == '忙碌') {
                        $("#tab01").append("<td> </td>")
                    } else {
                        $("#tab01").append("<td class='met-btn'>"+ "<button class='apply' id="+ result[i].id + " type='button'>"+"申请</button>" +"</td>")
                    }  
                }
                $("#tab01").append("</tbody>")
            }
		}
	}
})