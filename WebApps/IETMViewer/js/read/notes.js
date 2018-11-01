/**
 * 笔记功能
 **/
$(document).ready(function(){
	$(document).bind("contextmenu",function(e){            //屏蔽浏览器默认动作
        return false;
   	});

	function changeText(){                                //文本进入可编辑模式
		var mytext = $("#noteTest").html();
		var result = mytext.split("。");
		for (var i = result.length - 1; i >= 0; i--) {
			$('#noteTest').html(mytext.replace(result[i], "<span>"+result[i]+"</span>"));
			mytext = $('#noteTest').html();
		}
	}
	changeText();
	$("span").bind("taphold", handler);
	function handler(e){                                 //编辑笔记阶段
		var clickSpan = e.target;
		// e.target.style.textDecoration = "underline";
        clickSpan.style.borderBottom="1px solid red";
		function menuHandler(e){                        //显示文本框
            $("span").unbind("taphold", handler);
            $("#Menudiv").css({"top":e.pageY,"left":e.pageX,"display":"block"});
            $("#saveNotes").bind("click",saveHandler);
            function saveHandler(){                     //保存笔记相关内容
            	console.log(clickSpan.innerHTML);
                var transaction = dbGlob.db.transaction('notes', 'readwrite');
                var store = transaction.objectStore('notes');
                var request = store.put({
                    "notes_id": clickSpan.innerHTML,
                    "notes_parent_id": clickSpan.parentNode.id,
					"notes":$("#notes").val()
                });
                request.onsuccess = function (ev) {
                	alert("保存成功");
				}
			}
            $("#undo").bind("click",function () {      //取消笔记编辑页面
                $("#Menudiv").css({"top":e.pageY,"left":e.pageX,"display":"none"});
                $("#saveNotes").unbind("click",saveHandler);
                clickSpan.style.borderBottom="0px";
                $("span").bind("taphold", handler);
            });
            $(document).unbind("touchend",menuHandler);
		}
        $(document).bind("touchend",menuHandler);
	}

	$("#nav-notes").bind("click",notesShow);
	function notesShow() {
		$("#nav-div").html("");
        var transaction = dbGlob.db.transaction('notes', 'readwrite');
        var store = transaction.objectStore('notes');
        store.openCursor().onsuccess = function(event){
        	var cursor = event.target.result;
        	if (cursor){
        		$("#nav-div").append("做笔记语句："+cursor.value.notes_id+"<br>");
                $("#nav-div").append("笔记段落id："+cursor.value.notes_parent_id+"<br>");
                $("#nav-div").append("笔记内容："+cursor.value.notes+"<br>");
                cursor.continue();
			}
		}
    }
});

