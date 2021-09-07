$(function() {
    $.get("http://127.0.0.1:3000/application", function (data, status) {
        let result = data;
        localStorage.setItem("apply-info",JSON.stringify(result));
        loadData()
        // for(let i =0;i<result.length;i++) {
        //     if(result[i].type == '管理员申请' && result[i].result == null) {
        //         $("#app-tab").append("<tbody>")
        //         $("#app-tab").append("<td>"+result[i].name+"</td>")
        //         $("#app-tab").append("<td>"+result[i].sex+"</td>")
        //         $("#app-tab").append("<td>"+result[i].grade+"</td>")
        //         $("#app-tab").append("<td>"+result[i].number+"</td>")
        //         $("#app-tab").append("<td>"+result[i].material+"</td>")
        //         $("#app-tab").append("<td>"+result[i].reason+"</td>")
        //         $("#app-tab").append("<td>"+result[i].time+"</td>")
        //         $("#app-tab").append("<td>"+result[i].amount+"</td>")
        //         $("#app-tab").append("<td>"+result[i].type+"</td>")
        //         $("#app-tab").append("<td><button class='agree-apply' id="+result[i].id+">同意</button> <button class='disagree-apply' id="+result[i].id+">驳回</button></td>")
        //         $("#app-tab").append("</tbody>")
        //     }
        // }
        // for(let i =0;i<result.length;i++) {
        //     if(result[i].type == '用户申请' && result[i].result == null) {
        //         $("#app-tab").append("<tbody>")
        //         $("#app-tab").append("<td>"+result[i].name+"</td>")
        //         $("#app-tab").append("<td>"+result[i].sex+"</td>")
        //         $("#app-tab").append("<td>"+result[i].grade+"</td>")
        //         $("#app-tab").append("<td>"+result[i].number+"</td>")
        //         $("#app-tab").append("<td>"+result[i].material+"</td>")
        //         $("#app-tab").append("<td>"+result[i].reason+"</td>")
        //         $("#app-tab").append("<td>"+result[i].time+"</td>")
        //         $("#app-tab").append("<td>"+result[i].amount+"</td>")
        //         $("#app-tab").append("<td>"+result[i].type+"</td>")
        //         $("#app-tab").append("<td><button class='agree-apply' id="+result[i].id+">同意</button> <button class='disagree-apply' id="+result[i].id+">驳回</button></td>")
        //         $("#app-tab").append("</tbody>")
        //     }
        // }
        // for(let i =0;i<result.length;i++) {
        //     if(result[i].type == '物资申请' && result[i].result == null) {
        //         $("#app-tab").append("<tbody>")
        //         $("#app-tab").append("<td>"+result[i].name+"</td>")
        //         $("#app-tab").append("<td>"+result[i].sex+"</td>")
        //         $("#app-tab").append("<td>"+result[i].grade+"</td>")
        //         $("#app-tab").append("<td>"+result[i].number+"</td>")
        //         $("#app-tab").append("<td>"+result[i].material+"</td>")
        //         $("#app-tab").append("<td>"+result[i].reason+"</td>")
        //         $("#app-tab").append("<td>"+result[i].time+"</td>")
        //         $("#app-tab").append("<td>"+result[i].amount+"</td>")
        //         $("#app-tab").append("<td>"+result[i].type+"</td>")
        //         $("#app-tab").append("<td><button class='agree-apply' id="+result[i].id+">同意</button> <button class='disagree-apply' id="+result[i].id+">驳回</button></td>")
        //         $("#app-tab").append("</tbody>")
        //     }
        // }
    });
    //管理员点击同意按键
    $(document).on('click','.agree-apply',function() {
        let index = $(this).attr("id");
        index = parseInt(index)
        let data = localStorage.getItem("apply-info");
        data = JSON.parse(data);
        let truthBeTold = window.confirm("同意该用户的申请？")
        if (truthBeTold) {
            postResult(index,1)
            alert("已同意申请！")
        }
        location.reload();
    });
    //管理员点击驳回按键
    $(document).on('click','.disagree-apply',function() {
        let index = $(this).attr("id");
        console.log('id1 :'+index )
        localStorage.setItem("dis-id",JSON.stringify(index));
        index = parseInt(index)
        $("#div-02").show(500);
        document.getElementById('iframe_a').src = "disagree.html"
        $("*").click(function (e) {
            if (!$(this).hasClass("div02")) {
                $("#div-02").hide(500);
            }
        })
    })
    //监督驳回的确认键
    $("#determine").click(function() {
        // let index = $(this).parent().prev().attr("id");
        let index = localStorage.getItem("dis-id");
        console.log('index'+index)
        index = JSON.parse(index);
        index = parseInt(index)
        console.log('id222 :'+index)
        let truthBeTold = window.confirm("驳回该用户的申请？")
        if (truthBeTold) {
            postResult(index,2)
            alert("已驳回申请！")
            window.parent.$("#div-02").hide(500);
        }
        window.parent.location.reload();
    })

    //动态搜索功能
 	$(document).on("input propertychange","#search",function () {
		loadData();
	})
    //获取管理员对申请的审核数据
    function postResult(index,req) {
        let a = 0
        let data = localStorage.getItem("apply-info");
        let result = {}
        data = JSON.parse(data);
        for(i = 0;i<data.length;i++) {
            if(data[i].id == index) {
                result.id = data[i].id
                if(data[i].type == '物资申请') {
                    result.id = data[i].id
                    result.result = 1;
                    a = 1;
                    break;
                } else if(data[i].type == '用户申请') {
                    result.number = data[i].number
                    result.material = data[i].material
                    result.identity = 'user'
                    a = 2;
                    break;
                } else {
                    result.number = data[i].number
                    result.identity = 'admin'
                    a = 3;
                    break;
                }
            }
        }
        result.date = getDate();
        if(req == 1) {
            if(a == 1) {
                $.post("http://127.0.0.1:3000/apply-result", {
                    id : result.id,
                    result : 1,
                    date : result.date,
                }, function (data, status) {
                    
                });
            } else {
                $.get("http://127.0.0.1:3000/accounts", function (data, status) {
                        for(i = 0;i<data.length;i++) {
                            if(result.number = data[i].number) {
                                result.id = data[i].id
                                break
                            }
                        }
                })      
                if(a == 2) {
                        $.post("http://127.0.0.1:3000/accounts-edit", {
                            number : result.number,
                            identity : result.identity,
                            department : result.material,
                        }, function (data, status) {
                            console.log('id  '+result.id)
                        }); 

                        $.post("http://127.0.0.1:3000/delete-apply", {
                            id : result.id,
                        }, function (data, status) {
                            console.log('delete-id  '+result.id)
                        }); 

                } else {
                    $.post("http://127.0.0.1:3000/accounts-edit", {
                            number : result.number,
                            identity : result.identity,
                        }, function (data, status) {
                        
                    }); 

                    $.post("http://127.0.0.1:3000/delete-apply", {
                            id : result.id,
                        }, function (data, status) {
                            console.log('delete-id  '+result.id)
                    });
                }
            }  
        } else {
            result.disreason = document.getElementById('reason').value
            console.log('reason'+reason)
            $.post("http://127.0.0.1:3000/apply-result", {
                    id : result.id,
                    result : 0,
                    disreason : result.disreason,
                    date : result.date,
                }, function (data, status) {
                    alert(11)
                });
        }
    }

    //获取当地时间
    function getDate() {
        let time = new Date();
        let month = time.getMonth() + 1
        time = time.getFullYear()+ '-' + month + '-' +time.getDate()+ '-'  +time.getHours() + ':' + time.getMinutes() 
        return time
    }
    //加载搜索数据
	function loadData() {
		let result = [];
		let sstxt= $('#search').val();
		let data = localStorage.getItem("apply-info");
        data = JSON.parse(data);
		if(sstxt == '' || null) {
			result = [];
			$('table tbody,td').remove();
			result = data;
			for(let i =0;i<result.length;i++) {
                if(result[i].type == '管理员申请' && result[i].result == null) {
                    $("#app-tab").append("<tbody>")
                    $("#app-tab").append("<td>"+result[i].name+"</td>")
                    $("#app-tab").append("<td>"+result[i].sex+"</td>")
                    $("#app-tab").append("<td>"+result[i].grade+"</td>")
                    $("#app-tab").append("<td>"+result[i].number+"</td>")
                    $("#app-tab").append("<td>"+result[i].material+"</td>")
                    $("#app-tab").append("<td>"+result[i].reason+"</td>")
                    $("#app-tab").append("<td>"+result[i].time+"</td>")
                    $("#app-tab").append("<td>"+result[i].amount+"</td>")
                    $("#app-tab").append("<td>"+result[i].type+"</td>")
                    $("#app-tab").append("<td class = 'met-btn'><button class='agree-apply' id="+result[i].id+">同意</button> <button class='disagree-apply' id="+result[i].id+">驳回</button></td>")
                    $("#app-tab").append("</tbody>")
                }
            }
            for(let i =0;i<result.length;i++) {
                if(result[i].type == '用户申请' && result[i].result == null) {
                    $("#app-tab").append("<tbody>")
                    $("#app-tab").append("<td>"+result[i].name+"</td>")
                    $("#app-tab").append("<td>"+result[i].sex+"</td>")
                    $("#app-tab").append("<td>"+result[i].grade+"</td>")
                    $("#app-tab").append("<td>"+result[i].number+"</td>")
                    $("#app-tab").append("<td>"+result[i].material+"</td>")
                    $("#app-tab").append("<td>"+result[i].reason+"</td>")
                    $("#app-tab").append("<td>"+result[i].time+"</td>")
                    $("#app-tab").append("<td>"+result[i].amount+"</td>")
                    $("#app-tab").append("<td>"+result[i].type+"</td>")
                    $("#app-tab").append("<td class = 'met-btn'><button class='agree-apply' id="+result[i].id+">同意</button> <button class='disagree-apply' id="+result[i].id+">驳回</button></td>")
                    $("#app-tab").append("</tbody>")
                }
            }
            for(let i =0;i<result.length;i++) {
                if(result[i].type == '物资申请' && result[i].result == null) {
                    $("#app-tab").append("<tbody>")
                    $("#app-tab").append("<td>"+result[i].name+"</td>")
                    $("#app-tab").append("<td>"+result[i].sex+"</td>")
                    $("#app-tab").append("<td>"+result[i].grade+"</td>")
                    $("#app-tab").append("<td>"+result[i].number+"</td>")
                    $("#app-tab").append("<td>"+result[i].material+"</td>")
                    $("#app-tab").append("<td>"+result[i].reason+"</td>")
                    $("#app-tab").append("<td>"+result[i].time+"</td>")
                    $("#app-tab").append("<td>"+result[i].amount+"</td>")
                    $("#app-tab").append("<td>"+result[i].type+"</td>")
                    $("#app-tab").append("<td class = 'met-btn'><button class='agree-apply' id="+result[i].id+">同意</button> <button class='disagree-apply' id="+result[i].id+">驳回</button></td>")
                    $("#app-tab").append("</tbody>")
                }
            }
		} else {
			let result02 = [];
            let result03 = [];
			result = [];
			$('table tbody,td').remove();
			result = data.filter(ele => ele.name.search(sstxt) == 0);
			result02 = data.filter(ele => ele.number.search(sstxt) == 0);
            result03 = data.filter(ele => ele.material.search(sstxt) == 0);
			result = $.extend(result, result02,result03)
			for(let i =0;i<result.length;i++) {
                if(result[i].type == '管理员申请' && result[i].result == null) {
                    $("#app-tab").append("<tbody>")
                    $("#app-tab").append("<td>"+result[i].name+"</td>")
                    $("#app-tab").append("<td>"+result[i].sex+"</td>")
                    $("#app-tab").append("<td>"+result[i].grade+"</td>")
                    $("#app-tab").append("<td>"+result[i].number+"</td>")
                    $("#app-tab").append("<td>"+result[i].material+"</td>")
                    $("#app-tab").append("<td>"+result[i].reason+"</td>")
                    $("#app-tab").append("<td>"+result[i].time+"</td>")
                    $("#app-tab").append("<td>"+result[i].amount+"</td>")
                    $("#app-tab").append("<td>"+result[i].type+"</td>")
                    $("#app-tab").append("<td class = 'met-btn'><button class='agree-apply' id="+result[i].id+">同意</button> <button class='disagree-apply' id="+result[i].id+">驳回</button></td>")
                    $("#app-tab").append("</tbody>")
                }
            }
            for(let i =0;i<result.length;i++) {
                if(result[i].type == '用户申请' && result[i].result == null) {
                    $("#app-tab").append("<tbody>")
                    $("#app-tab").append("<td>"+result[i].name+"</td>")
                    $("#app-tab").append("<td>"+result[i].sex+"</td>")
                    $("#app-tab").append("<td>"+result[i].grade+"</td>")
                    $("#app-tab").append("<td>"+result[i].number+"</td>")
                    $("#app-tab").append("<td>"+result[i].material+"</td>")
                    $("#app-tab").append("<td>"+result[i].reason+"</td>")
                    $("#app-tab").append("<td>"+result[i].time+"</td>")
                    $("#app-tab").append("<td>"+result[i].amount+"</td>")
                    $("#app-tab").append("<td>"+result[i].type+"</td>")
                    $("#app-tab").append("<td class = 'met-btn'><button class='agree-apply' id="+result[i].id+">同意</button> <button class='disagree-apply' id="+result[i].id+">驳回</button></td>")
                    $("#app-tab").append("</tbody>")
                }
            }
            for(let i =0;i<result.length;i++) {
                if(result[i].type == '物资申请' && result[i].result == null) {
                    $("#app-tab").append("<tbody>")
                    $("#app-tab").append("<td>"+result[i].name+"</td>")
                    $("#app-tab").append("<td>"+result[i].sex+"</td>")
                    $("#app-tab").append("<td>"+result[i].grade+"</td>")
                    $("#app-tab").append("<td>"+result[i].number+"</td>")
                    $("#app-tab").append("<td>"+result[i].material+"</td>")
                    $("#app-tab").append("<td>"+result[i].reason+"</td>")
                    $("#app-tab").append("<td>"+result[i].time+"</td>")
                    $("#app-tab").append("<td>"+result[i].amount+"</td>")
                    $("#app-tab").append("<td>"+result[i].type+"</td>")
                    $("#app-tab").append("<td class = 'met-btn'><button class='agree-apply' id="+result[i].id+">同意</button> <button class='disagree-apply' id="+result[i].id+">驳回</button></td>")
                    $("#app-tab").append("</tbody>")
                }
            }
		}
	}
})