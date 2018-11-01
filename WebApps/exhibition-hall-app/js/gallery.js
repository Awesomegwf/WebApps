var canvas = $("#show-area");
var canvas1= $("#show-area-alt");
var currentCanvas = null;	//定义当前正在使用的canvas
var mainArea = document.getElementById("main-area");
var currentIndex = 0, dstIndex = 0;
var fancyboxResouce = new Array(); //展板关联多媒体资源,
var tableResource = new Array(20);
var seqResource = 0;
var videoSrc = new Array();

var tableVideo = new Array(20);

var seqVideo = 0;

var boardsSelector = document.getElementById("pull-down-menu").children;

var leftpx = 30;
/* 记录canvas和展板背景图的长宽 */
var canvasWidth, canvasHeight;
var imageWidth, imageHeight;

/* 全局变量记录是否已经生成过展板列表 */
var isBoardThumbsGenerated = false;

var board_idx = 0;

$(document).on("pagebeforeshow", "#gallery", function(){
    // alert(isDocDisplayed);
    setFavouriteEntryImage(boardsList[currentIndex].id);
});

function createBoardThumbs(){
    var p =new Promise(function (resolve,reject) {
        if(board_idx>=boardsList.length) {
            reject('genetate all board thumbs!');
        }else{
        	var request = sdcard.get(boardsList[board_idx].bg_path);
            request.onsuccess = function () {
                var file = this.result;
                //obj.src = URL.createObjectURL(file);
                //alert(URL.createObjectURL(file));
                //fBoardsDivList[idx].innerHTML = "<img src='" + URL.createObjectURL(file) + "'/><br>" + "<p>" + fBoardsList[idx].favorites_board_name + "</p>";
                //alert(fBoardsDivList[idx].innerHTML);
                var div = document.createElement('div');
                var img = document.createElement('img');
                div.setAttribute("class", "board");
                div.innerHTML = "<img src='" + URL.createObjectURL(file) + "'/><br>" + "<p>" + boardsList[board_idx].name + "</p>";
                pullDownMenu.appendChild(div);

                resolve(board_idx);
            };

            request.onerror = function() {
            	resolve(board_idx);
            }
        }
    });

    p.then(function(index){
        //alert(index);
        board_idx = board_idx+1;
        return createBoardThumbs();
    });
}


function showBoardsSelector() {
	// for(var i=0; i< boardsList.length; i++) {
	// 	var request = sdcard.get(boardsList[i].bg_path);
	//
	// 	request.onsuccess = function() {
     //        var div = document.createElement('div');
     //        var img = document.createElement('img');
	// 		img.src = URL.createObjectURL(this.result);
	// 		div.setAttribute("class", "fboard");
	// 		div.innerHTML = "<img src='" + URL.createObjectURL(file) + "'/><br>" + "<p>" + fBoardsList[idx].favorites_board_name + "</p>";
	// 		pullDownMenu.appendChild(div);
	// 	}
	// }
    board_idx = 0;

    if(isBoardThumbsGenerated) {
    	//do nothing
    } else {
        pullDownMenu.innerHTML='';
    	createBoardThumbs();
    	isBoardThumbsGenerated = true;
    }
    
}

/* 不会循环中异步函数传参，想的笨办法 */
function InitBoardsSelector() {
	var imgs = pullDownMenu.getElementsByTagName('img');
	console.log(imgs.length);
	for(var i=0; i<imgs.length; i++) {
		// imgs[i].onclick = function() {
		// 	console.log("click :" + i);
		// 	//switchBoard(currentIndex, i, "choose");	
		(function(i) {
			imgs[i].onclick = function() {
				console.log("switch board:" + i);
				dstIndex = i;
				switchBoard(currentIndex, dstIndex, "choose");
                displayBoardEntryImg.src = "icons/display-board-entry.png";
                isDisplayBoardShowed = false;
            	/*判断是否展开展板选择菜单*/
            	if(pullDownMenu.style.display == "inline") {
                	// pullDownMenu.style.display = "none";
                	$("#pull-down-menu").fadeOut();
				}

            }
		})(i);
		
	}
}

$(function () {
	// init music setting
	backgroundMusic.volume = 0.5;
	backgroundMusic.play();
});


/* 对象数组排序 */
function keySort(key,desc) {
  return function(a,b){
    return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
  }
}


/*
function showBoard() {
	var transaction = dbGlob.db.transaction('boards', 'readwrite');
	var store = transaction.objectStore('boards');

	var boardsList = [];

	store.openCursor().onsuccess = function(event) {
		var cursor = event.target.result;
			if(cursor) {
				boardsList.push(cursor.value);
				cursor.continue();
			}
			else {
				boardsList.sort(keySort('seq', false));	//根据seq对展板列表进行排序
				currentCanvas = canvas;
				drawBoards(boardsList[0].bg_path);
				currentCanvas.get(0).addEventListener('click', function(e){
					clickHandler(e.offsetX, e.offsetY, boardsList[0].elements);
		}, false);

			}		
	}
}
*/

function findElem(array, attr, val) {
	for(var i=0; i<array.length; i++) {
		console.log(array[i][attr]);
		if(array[i][attr] == val) {
			return i;
		}
	}
	return -1;
}

function showBoard(boardIndex) {
	// boardsList.sort(keySort('seq', false));
	// var index;
	// index = findElem(boardsList, "seq", boardIndex);
	// if(index < 0) {
	// 	alert("draw board error!")；
	// }
	prepareComment(boardsList[boardIndex].comments_path);
	prepareRes(boardsList[boardIndex].elements);
	drawBoards(boardsList[boardIndex].bg_path);

    setFavouriteEntryImage(boardsList[boardIndex].id);

	currentCanvas.off("click");
	currentCanvas.on("click", function(e){
		clickHandler(e.offsetX, e.offsetY, boardsList[boardIndex].elements);
	})

}

function drawBoards(path) {
	var request = sdcard.get(path);

	canvasWidth = $('#main-area').width()-100;
	canvasHeight = $('#main-area').height()-100;

	imageHeight = canvasHeight;

	imageWidth = 16 * imageHeight / 9;

	request.onsuccess = function(event) {
		var file = event.target.result;
		var url = URL.createObjectURL(file);
		console.log(url);
		var img = new Image();	//展板背景图片
		img.src = url;
		
		/* 绘制展板 */	
		var context = currentCanvas.get(0).getContext("2d");
		
		currentCanvas.show();
		currentCanvas.width(canvasWidth);
		currentCanvas.height(canvasHeight);
		
		currentCanvas.get(0).width = canvasWidth;
		currentCanvas.get(0).height = canvasHeight;


		context.clearRect(0, 0, canvasWidth, canvasHeight);

		img.onload = function() {
			/* 必须将drawImage函数放在img的onload事件中去处理 */
			console.log("draw image");	
   			context.drawImage(img, 0, 0, imageWidth, imageHeight);
   			URL.revokeObjectURL(url);
  		}

	}
}


/* 解说声音加载 */
function prepareComment(comments_path) {
	var request = sdcard.get(comments_path);
	console.log("comment_path" + comments_path);

	request.onsuccess = function() {
		var file = this.result;
		var source = commentaryVoice.children[0];
		source.src = URL.createObjectURL(file);
		commentaryVoice.load();
		commentaryVoice.play();
	}

}

/* 从文件对象直接加载解说声音加载 */
function prepareCommentFromFile(file) {
	var source = commentaryVoice.children[0];
	source.src = URL.createObjectURL(file);
	commentaryVoice.load();
	commentaryVoice.play();
}


String.prototype.replaceAll = function(s1,s2){    
	return this.replace(new RegExp(s1,"gm"),s2);    
};

function prepareRes(elements) {
    fancyboxResouce.splice(0, fancyboxResouce.length);

    _prepareResource(1, 0, elements);
}


/*
 * 当图片热点的对应档案存在时， 需要读取其对应的所有图片档案， 从0-99
 * param subidx 每个图片热点element所对应的多张档案图片的索引.
 * param index  热点索引 0-elements.length
 * param elements 热点数组
 */
function _prepareResource(subidx, index, elements){

	if(index>=elements.length) {
		console.log("genedate all resources for the board");
	}else if(subidx>99) {
        console.log("get all sub pictures for the image element from the related doc folder");
        _prepareResource(1, index + 1, elements);
    }else{
        if (elements[index].type == "video") {
            _prepareResource_video(index, elements);
        } else if (elements[index].type == "audio") {
            _prepareResource_audio(index, elements);
        } else {
            _prepareResource_image(subidx, index, elements);
        }
    }
}


function _prepareResource_video(index, elements){
    var request = sdcard.get(elements[index].src_path);
    request.onsuccess = function() {
        var obj = new Object();
        var file = this.result;
        obj.src = URL.createObjectURL(file);
        var brText = elements[index].description.replaceAll("　　", "<br><div class='doc-table-td-desc-textIndex'></div>");

        fancyboxResouce.push({
            type : "video",
            src  : URL.createObjectURL(file),
            opts : {
            	elementidx: index,
                caption : brText,
                videoFormat : 'video/mp4',
                beforeShow : function( instance, current ) {
                    if(current.type == 'video' || current.type == 'audio'){
                        /* 暂停背景音乐和解说音播放 */
                        commentaryVoice.pause();
                        backgroundMusic.pause();
                    }
                },
                beforeClose: function(instance, current) {
                    if (current.type == 'video' || current.type == 'audio') {
                        if (backgroundMusic.paused) {
                            backgroundMusic.play();
                        }
                        if (commentaryVoice.paused) {
                            commentaryVoice.play();
                        }
                    }
                }
            }
        });

        _prepareResource(1, index+1, elements);
    }

    request.onerror = function() {
        fancyboxResouce.push(
            {
                src  : null,
                opts : {
                    elementidx: index,
                    caption : '资源不存在或损坏!'
                }
            }
        );

        _prepareResource(1, index+1, elements);
    }
}

function _prepareResource_audio(index, elements){
    var request = sdcard.get(elements[index].src_path);
    request.onsuccess = function() {
        var obj = new Object();
        var file = this.result;

        obj.src = URL.createObjectURL(file);
        var brText = elements[index].description.replaceAll("　　", "<br><div class='doc-table-td-desc-textIndex'></div>");

        fancyboxResouce.push(
            {
                type: "audio",
                src: URL.createObjectURL(file),
                opts: {
                    elementidx: index,
                    caption: brText,
                    audioFormat: 'audio/mpeg',
                    beforeShow: function (instance, current) {
                        if (current.type == 'video' || current.type == 'audio') {
                            /* 暂停背景音乐和解说音播放 */
                            commentaryVoice.pause();
                            backgroundMusic.pause();
                        }
                    },
                    beforeClose: function (instance, current) {
                        if (current.type == 'video' || current.type == 'audio') {
                            if (backgroundMusic.paused) {
                                backgroundMusic.play();
                            }
                            if (commentaryVoice.paused) {
                                commentaryVoice.play();
                            }
                        }
                    }
                }
            }
        );

        _prepareResource(1, index+1, elements);
    }

    request.onerror = function() {
        fancyboxResouce.push(
            {
                src  : null,
                opts : {
                    elementidx: index,
                    caption : '资源不存在或损坏!'
                }
            }
        );

        _prepareResource(1, index+1, elements);
    }
}

/**
 * 先从档案文件夹(通过others字段生成)读取文档, 如果读取第一张文档出错, 就使用默认的热点图片
 *
 * @param subidx
 * @param index
 * @param elements
 * @private
 */
function _prepareResource_image(subidx, index, elements) {

	//pCurrentHall should not be null if we are in hall
	var path = ARCHIVES_PATH+'/'+
		pCurrentHall.type+'/'+
		pCurrentHall.docname+'/'+
		elements[index].others.slice(0, 4)+'/'+
		elements[index].others.slice(0, 6)+padding(subidx, 2, '0')+'.jpg';
	var request = sdcard.get(path);
	console.log(path);


    request.onsuccess = function() {
        var obj = new Object();
        var file = this.result;
        console.log(file);
		if(file!=null && file!=undefined){
            obj.src = URL.createObjectURL(file);
            var brText = elements[index].description.replaceAll("　　", "<br><div class='doc-table-td-desc-textIndex'></div>");

            fancyboxResouce.push(
                {
                    type : 'image',
                    src  : URL.createObjectURL(file),
                    opts : {
                        elementidx: index,
                        caption : brText,
                        beforeShow : function( instance, current ) {
                            /* 暂停背景音乐和解说音播放 */
                            if (backgroundMusic.paused) {
                                backgroundMusic.play();}
                            if (commentaryVoice.paused) {
                                commentaryVoice.play();
                            }

                        }
                    }
                }
            );
		}

		_prepareResource(subidx+1, index, elements);

    }

    request.onerror = function() {

        if(subidx>1) {
            _prepareResource(1, index+1, elements);
        }else {

        	var hotspotRequest = sdcard.get(elements[index].src_path);
			hotspotRequest.onsuccess = function() {
                var obj = new Object();
                var file = this.result;
                console.log(file);
                if(file!=null && file!=undefined){
                    obj.src = URL.createObjectURL(file);
                    var brText = elements[index].description.replaceAll("　　", "<br><div class='doc-table-td-desc-textIndex'></div>");

                    fancyboxResouce.push(
                        {
                            type : 'image',
                            src  : URL.createObjectURL(file),
                            opts : {
                                elementidx: index,
                                caption : brText,
                                beforeShow : function( instance, current ) {
                                    /* 暂停背景音乐和解说音播放 */
                                    if (backgroundMusic.paused) {
                                        backgroundMusic.play();}
                                    if (commentaryVoice.paused) {
                                        commentaryVoice.play();
                                    }

                                }
                            }
                        }
                    );
                }
                _prepareResource(1, index+1, elements);
			}

			hotspotRequest.onerror = function(){
                fancyboxResouce.push(
                    {
                        src  : null,
                        opts : {
                            elementidx: index,
                            caption : '资源不存在或损坏!'
                        }
                    }
                );
                _prepareResource(1, index+1, elements);
			}


        }
    }

}

function clickHandler(x, y, elements) {
	var x1, y1, x2, y2;
	var flag = Array(elements.length);
	var find = -1;
	for(var i=0; i<elements.length; i++) {
		x1 = imageWidth * elements[i].p1_x, y1 = imageHeight * elements[i].p1_y;
		x2 = imageWidth * elements[i].p2_x, y2 = imageHeight * elements[i].p2_y;
		if(x > x1 && x < x2 && y > y1 && y < y2 ){
            find = i;
			console.log("Click the " + i + " Area");
			break;
		} 
	}

	if(find>=0) {

		var idx = 0;

		for(var i = 0; i < fancyboxResouce.length; i++){
			if(fancyboxResouce[i].opts.elementidx == find){
				idx = i;
				break;
			}
		}

		switch(elements[find].type)
		{
			case "image":
			case "video":
			case "audio":
                $.fancybox.open(fancyboxResouce,{
                    loop : false,
                    buttons : [
                        'thumbs',
                        'close'
                    ]
                },idx);
				break;
			default:
				alert("wrong type:" + elements[find]);
		}
	}
}


function switchBoard(oriIndex, _dstIndex, switchtype) {
	
	console.log("switchBoard");
	switch(switchtype)
	{
		case "swipeleft":
			/* 左滑处理 */
			console.log("swipeleft");
			if(currentCanvas == canvas) {
				$("#show-area").stop().animate({left: "-1920px"}, {
            		duration: 1000});
        		$("#show-area-alt").css("left", "1920px");
        		currentCanvas = canvas1;
        		currentIndex = _dstIndex;
                dstIndex = _dstIndex;
        		showBoard(dstIndex);
        		$("#show-area-alt").stop().animate({"left": leftpx}, {
            		duration: 1000});
			}
			else {
				$("#show-area-alt").stop().animate({left: "-1920px"}, {
            		duration: 1000});
        		$("#show-area").css("left", "1920px");
        		currentCanvas = canvas;
        		currentIndex = _dstIndex;
                dstIndex = _dstIndex;
        		showBoard(dstIndex);
        		$("#show-area").stop().animate({"left": leftpx}, {
            		duration: 1000});
			}
			break;
		case "swiperight":
			/* 右滑处理 */
			console.log("swiperight");
			if(currentCanvas == canvas){
				console.log("currentCanvas:canvas");
				$("#show-area").stop().animate({left: "1920px"}, {
		            duration: 1000});
        		$("#show-area-alt").css("left", "-1920px");
        		currentCanvas = canvas1;
        		currentIndex = _dstIndex;
                dstIndex = _dstIndex;
        		showBoard(dstIndex);
        		$("#show-area-alt").stop().animate({"left": leftpx}, {
            		duration: 1000});
			}
			else {
				console.log("currentCanvas:canvas1");
				$("#show-area-alt").stop().animate({left: "1920px"}, {
            		duration: 1000});
        		$("#show-area").css("left", "-1920px");
        		currentCanvas = canvas;
        		currentIndex = _dstIndex;
                dstIndex = _dstIndex;
        		showBoard(dstIndex);
				$("#show-area").stop().animate({"left": leftpx}, {
            		duration: 1000});
			}
			break;
		case "choose":
			/* 展板列表选择 */
            dstIndex = _dstIndex;

			if(currentCanvas == canvas) {
				if(oriIndex < dstIndex) {
					$("#show-area").stop().animate({'left': "-1920px"}, {
            			duration: 1000});
        			$("#show-area-alt").css("left", "1920px");
        			currentCanvas = canvas1;
        			currentIndex = dstIndex;
        			showBoard(dstIndex);
        			$("#show-area-alt").stop().animate({"left": leftpx}, {
            			duration: 1000});
				} else if(oriIndex > dstIndex){
					$("#show-area").stop().animate({'left': "1920px"}, {
			            duration: 1000});
	        		$("#show-area-alt").css("left", "-1920px");
	        		currentCanvas = canvas1;
	        		currentIndex = dstIndex;
	        		showBoard(dstIndex);
	        		$("#show-area-alt").stop().animate({'left': leftpx}, {
	            		duration: 1000});
				}
			} else {
				if(oriIndex < dstIndex) {
					$("#show-area-alt").stop().animate({'left': "-1920px"}, {
            			duration: 1000});
        			$("#show-area").css("left", "1920px");
        			currentCanvas = canvas;
        			currentIndex = dstIndex;
        			showBoard(dstIndex);
        			$("#show-area").stop().animate({"left": leftpx}, {
            			duration: 1000});
				} else if(oriIndex > dstIndex){
					$("#show-area-alt").stop().animate({'left': "1920px"}, {
			            duration: 1000});
	        		$("#show-area").css("left", "-1920px");
	        		currentCanvas = canvas;
	        		currentIndex = dstIndex;
	        		showBoard(dstIndex);
	        		$("#show-area").stop().animate({"left": leftpx}, {
	            		duration: 1000});
				}
			}
			break;
		default:
			alert("error");

	}

}


$("#show-area").on("swiperight",function() {
	if(currentIndex-1 < 0){
		dstIndex = boardsList.length-1;
	} else {
		dstIndex = currentIndex - 1;
	}
	switchBoard(currentIndex, dstIndex, "swiperight");
});

$("#show-area").on("swipeleft", function() {
	if(currentIndex+1 >= boardsList.length){
		dstIndex = 0;
	} else {
		dstIndex = currentIndex + 1;
	}
	switchBoard(currentIndex, dstIndex, "swipeleft");
});

$("#show-area-alt").on("swiperight", function(){
	if(currentIndex-1 < 0){
		dstIndex = boardsList.length-1;
	} else {
		dstIndex = currentIndex - 1;
	}
	switchBoard(currentIndex, dstIndex, "swiperight");
});

$("#show-area-alt").on("swipeleft", function(){
	if(currentIndex+1 >= boardsList.length){
		dstIndex = 0;
	} else {
		dstIndex = currentIndex + 1;
	}
	switchBoard(currentIndex, dstIndex, "swipeleft");
})


/**
 * 依据boardid切换展板。首先依据boardid来搜索展板的index，然后调用switchToBoardByIndex完成切换
 */
function switchToBoardByID(_boardid){
	var i;
	for(i=0; i<boardsList.length;i++){
		if(boardsList[i].id == _boardid){
            dstIndex = i;
            location.href="#gallery"; //会触发函数$(document).on("pageshow", "#gallery" ....
            break;
		}

	}
}

/**
 * 依据board在数组里面的index来切换展板
 */
function switchToBoardByIndex(_desindex){
    dstIndex = _desindex;
    location.href="#gallery"; //会触发函数$(document).on("pageshow", "#gallery" ....
}

function clearBoardInfo(){
    currentCanvas = null;
    currentIndex = 0;
    dstIndex = 0;
    $("#show-area").css("left", leftpx);
    $("#show-area-alt").css("left", "1920px");

    isBoardThumbsGenerated=0; //重新生成展板缩略图
}

$(document).on("pageshow", "#gallery", function(){
	if(!currentCanvas){
		console.log("sssss");
		currentCanvas = canvas;
        currentIndex = dstIndex;
		showBoard(currentIndex);
		showBoardsSelector();
		InitBoardsSelector();
	}else{
		if(currentIndex!=dstIndex){
            switchBoard(currentIndex, dstIndex, "choose");
		}
	}
});



function setFavouriteEntryImage(boards_id){
    $('#favorites-entry').attr('boards-id', boards_id);
    var transaction = dbGlob.db.transaction(['favorites_board'], 'readwrite');
    var store = transaction.objectStore('favorites_board');
    var request = store.get(boards_id);

    //找到，已加入收藏
    request.onsuccess = function(event) {

        var fboard = event.target.result;

        if(fboard){
            console.log(fboard.favorites_board_name);
            //展示图片
            $("#favorites-entry-img").attr('src', 'icons/saved.png');
            //禁止添加功能函数，将处理函数设为空
            $("#favorites-entry").off('click');
        }else{
            $("#favorites-entry-img").attr('src', 'icons/favorites-entry.png');
            $('#favorites-entry').off('click').on('click', handleClickFavoritesEntry);
        }
    }
}

//attach 点击添加收藏处理函数; 加入收藏夹，改变收藏图标，点击后弹出提示框
  //          $("#favorites-entry").bind('click', handleClickFavoritesEntry);
function handleClickFavoritesEntry() {
                var boards_id = $(this).attr("boards-id");
                var btransaction = dbGlob.db.transaction(['boards'], 'readwrite');
                var bstore = btransaction.objectStore('boards');
                var requ = bstore.get(boards_id);

                requ.onsuccess = function(e) {
                    var board = e.target.result;
                    var fbtransaction = dbGlob.db.transaction(['favorites_board'], 'readwrite');
                    var fbstore = fbtransaction.objectStore('favorites_board');
                    var brequest = fbstore.put({
                        "favorites_board_index": currentIndex,
                        "favorites_board_id": board.id,
                        "favorites_board_name" : board.name,
                        "favorites_board_path" : board.bg_path,
                        "favorites_board_halls_id": board.boards_halls_id
                    });
                    brequest.onsuccess = function(event){
                        favoritesEntryImg.src = "icons/saved.png";
                        isCollected = true;
                        $(".popwindow").slideDown().delay(1000).slideUp();
                        // setTimeout(function(){
                        //     favoritesEntryImg.src = "icons/saved.png";
                        // },1000);
                        $("#favorites-entry").off('click');
                    }
                }
            }
