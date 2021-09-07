$(function() {
	$.get("http://127.0.0.1:3000/accounts", function (data, status) {
		let result = data;
		localStorage.setItem("loadData",JSON.stringify(result));
		loadData()
	});
	//删除账号操作
	$(document).on('click','.account-con',function() {
		let index = $(this).attr("id");
		index = parseInt(index)
		let truthBeTold = window.confirm("确认删除该账号？")
		if (truthBeTold) {
			getAccount(index,function(data) {
				location.reload();
			});
		}
	});

	//动态搜索功能
 	$(document).on("input propertychange","#search",function () {
		loadData();
	})

	//判断是否达到删除条件
	function getAccount(id,callback) {
		$.get("http://127.0.0.1:3000/accounts", function (data, status) {
			let result = localStorage.getItem("applicant");
			result = JSON.parse(result);
			for(let i =0;i<data.length;i++) {
				if(data[i].id == id) {
					if(data[i].times == 1) {
						if(data[i].reviewer == result.name) {
							alert("你已审核过该账号，等待其他管理员审核！")
						} else {
							$.post("http://127.0.0.1:3000/account-delete", {
								id : data[i].id,
							}, function (data, status) {
								alert('已删除该账号!')
							});
						}
					}else {
						$.post("http://127.0.0.1:3000/acc-edit", {
							id : data[i].id,
							times : 1,
							reviewer : result.name,
        		}, function (data, status) {
							alert('等待其他管理员审核！')
        		});
					}
				}
			}
			callback(11)
		})
	}

	//加载搜索数据
	function loadData() {
		let result = [];
		let sstxt= $('#search').val();
		let data = localStorage.getItem("loadData");
    data = JSON.parse(data);
		if(sstxt == '' || null) {
			result = [];
			$('table tbody,td').remove();
			result = data;
			for(let i =0;i<result.length;i++) {
				$("#acc-tab").append("<tbody>")
				$("#acc-tab").append("<td>"+result[i].name+"</td>")
				$("#acc-tab").append("<td>"+result[i].sex+"</td>")
				$("#acc-tab").append("<td>"+result[i].grade+"</td>")
				$("#acc-tab").append("<td>"+result[i].number+"</td>")
				if(result[i].department == null || result[i].department == '') {
					$("#acc-tab").append("<td>无</td>")
				} else {
					$("#acc-tab").append("<td>"+result[i].department+"</td>")
				}
				$("#acc-tab").append("<td>"+result[i].identity+"</td>")
				if(result[i].times == null || result[i].times == '') {
					$("#acc-tab").append("<td>-</td>")
					$("#acc-tab").append("<td>-</td>")
				} else {
					$("#acc-tab").append("<td>"+result[i].times+"</td>")
					$("#acc-tab").append("<td>"+result[i].reviewer+"</td>")
				}
				// $("#acc-tab").append("<td><button class='account-con' id="+result[i].id+">删除</button></td>")
				$("#acc-tab").append("<td class = 'met-btn'><button class='account-con' id="+result[i].id+">删除</button></td>")
				$("#acc-tab").append("</tbody>")
			}
		} else {
			let result02 = [];
			result = [];
			$('table tbody,td').remove();
			result = data.filter(ele => ele.name.search(sstxt) == 0);
			result02 = data.filter(ele => ele.number.search(sstxt) == 0);
			result = $.extend(result, result02)
			for(let i =0;i<result.length;i++) {
				$("#acc-tab").append("<tbody>")
				$("#acc-tab").append("<td>"+result[i].name+"</td>")
				$("#acc-tab").append("<td>"+result[i].sex+"</td>")
				$("#acc-tab").append("<td>"+result[i].grade+"</td>")
				$("#acc-tab").append("<td>"+result[i].number+"</td>")
				if(result[i].department == null || result[i].department == '') {
					$("#acc-tab").append("<td>无</td>")
				} else {
					$("#acc-tab").append("<td>"+result[i].department+"</td>")
				}
				$("#acc-tab").append("<td>"+result[i].identity+"</td>")
				if(result[i].times == null || result[i].times == '') {
					$("#acc-tab").append("<td>-</td>")
					$("#acc-tab").append("<td>-</td>")
				} else {
					$("#acc-tab").append("<td>"+result[i].times+"</td>")
					$("#acc-tab").append("<td>"+result[i].reviewer+"</td>")
				}
				$("#acc-tab").append("<td class = 'met-btn'><button class='account-con' id="+result[i].id+">删除</button></td>")
				$("#acc-tab").append("</tbody>")
			}
		}
	}
})