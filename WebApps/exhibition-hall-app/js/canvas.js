var canvas = document.getElementById("show-area");
var canvas2= document.getElementById("show-area-alt");
var mainArea = document.getElementById("main-area");
var context = canvas.getContext("2d");

var boardList = document.getElementById("pull-down-menu").children;
var isDisplayBoardShowed = false;

canvas.addEventListener('click', function(e){
	getClickArea(e.offsetX, e.offsetY);
},false);

canvas2.addEventListener('click', function (e) {
    getClickArea(e.offsetX, e.offsetY);
},false);

var img1 = new Image();
img1.src = "resources/display-board/display-board-001.png";
var img2 = new Image();
img2.src = "resources/display-board/display-board-002.jpg";
var currarea=true;
var leftpx = 30;

$(function () {
    $('#video-box').VideoPopUp({
        backgroundColor: "#17212a",
        opener: "video1",
        maxweight: "340",
        idvideo: "v1"
    });

	//init music setting
	backgroundMusic.volume = 0.5;
	backgroundMusic.play();
});

//展板列表下拉菜单选择
for(var i=0; i < boardList.length; i++) {
    boardList[i].onclick = function(event) {
		if(event.target.id == "board-1" && !currarea) {
			console.log("board-1");
			var pullDownMenu = document.getElementById("pull-down-menu");
            if(!isDisplayBoardShowed) {
                displayBoardEntryImg.src = "icons/display-board-entry-hover.jpg";
                isDisplayBoardShowed = true;
            } else {
                displayBoardEntryImg.src = "icons/display-board-entry.png";
                isDisplayBoardShowed = false;
            }
            /*判断是否展开展板选择菜单*/
            if(pullDownMenu.style.display == "inline") {
				$("#pull-down-menu").fadeOut();
            } else {
                pullDownMenu.style.display = "inline";
            }
      $('#show-area-alt').stop().animate({left: "-1920px"}, {duration: 1000});
			$("#show-area").css("left", "1920px");
			currarea=true;
			isLoaded = false;
			drawImage();
			$("#show-area").stop().animate({"left": leftpx}, {
            duration: 1000});
		}

		if(event.target.id == "board-2" && currarea) {
			console.log("board-2");
						if(!isDisplayBoardShowed) {
                displayBoardEntryImg.src = "icons/display-board-entry-hover.jpg";
                isDisplayBoardShowed = true
            } else {
                displayBoardEntryImg.src = "icons/display-board-entry.png";
                isDisplayBoardShowed = false;
            }
            /*判断是否展开展板选择菜单*/
            var pullDownMenu = document.getElementById("pull-down-menu");
            if(pullDownMenu.style.display == "none") {
                pullDownMenu.style.display = "inline";
            } else {
				$("#pull-down-menu").fadeOut();
            }
			$('#show-area').stop().animate({left: "1920px"}, {
            duration: 1000});
			$("#show-area-alt").css("left", "-1920px");
			currarea=false;
			isAltLoaded = false;
			drawImage();
			$("#show-area-alt").stop().animate({"left": leftpx}, {
            duration: 1000});
		}
}
}
$(document).on("pageshow","exhibition-hall", function(){
})

$("#show-area").on("swipeleft",function(){

	$(this).stop().animate({left: "-1920px"}, {
            duration: 1000});
	$("#show-area-alt").css("left", "1920px");
	currarea=false;
	isAltLoaded = false;
	drawImage();
	$("#show-area-alt").stop().animate({"left": leftpx}, {
            duration: 1000});


//	$(this).animate({left:"0px"});
	//$(this).animate({left:'0px'}).fadeIn("fast");
});

$("#show-area-alt").on("swipeleft",function(){

	$(this).stop().animate({left: "-1920px"}, {
            duration: 1000});
	$("#show-area").css("left", "1920px");
	currarea=true;
	isLoaded = false;
	drawImage();
	$("#show-area").stop().animate({"left": leftpx}, {
            duration: 1000});
	
//	$(this).animate({left:"0px"});
	//$(this).animate({left:'0px'}).fadeIn("fast");
});

$("#show-area").on("swiperight",function(){

	$(this).stop().animate({left: "1920px"}, {
            duration: 1000});
	$("#show-area-alt").css("left", "-1920px");
	currarea=false;
	isAltLoaded = false;
	drawImage();
	$("#show-area-alt").stop().animate({"left": leftpx}, {
            duration: 1000});


//	$(this).animate({left:"0px"});
	//$(this).animate({left:'0px'}).fadeIn("fast");
});

$("#show-area-alt").on("swiperight",function(){

	$(this).stop().animate({left: "1920px"}, {
            duration: 1000});
	$("#show-area").css("left", "-1920px");
	currarea=true;
	isLoaded = false;
	drawImage();
	$("#show-area").stop().animate({"left": leftpx}, {
            duration: 1000});


//	$(this).animate({left:"0px"});
	//$(this).animate({left:'0px'}).fadeIn("fast");
});


$(document).on("pageshow", "#gallery", drawImage);

function drawImage(){
	var canvas;
	var canvaswidth= $("#main-area").width()-100;
  var canvasheight= $("#main-area").height()-100;
	if(currarea==false){
		$("#show-area-alt").show();
		canvas= document.getElementById("show-area-alt");
        $("#show-area-alt").width(canvaswidth);
        $("#show-area-alt").height(canvasheight);
	}else{
		$("#show-area").show();
		canvas= document.getElementById("show-area");
        $("#show-area").width(canvaswidth);
        $("#show-area").height(canvasheight);
	}

	var context = canvas.getContext("2d");
	var imageHeight = canvasheight;
	var imageWidth = 16 * imageHeight / 9;
	canvas.width = canvaswidth;
	canvas.height= canvasheight;
	context.clearRect(0, 0, canvaswidth, canvasheight);
  var commentaryVoice = document.getElementById("commentary-voice");
	if(currarea){
		context.drawImage(img1, 0, (canvasheight-imageHeight)/2,imageWidth, imageHeight);
		var source = commentaryVoice.children[0];
		source.src = "media/audio/1.mp3";
		if(!isLoaded){
			isLoaded = true;
			commentaryVoice.load();
			commentaryVoice.play();
		} else {
			commentaryVoice.currenttime = commentaryProgressSave;
			commentaryVoice.play();
		}


        setFavouriteEntryImage(boards[0].boards_id);

	} else {
		context.drawImage(img2, 0, (canvasheight-imageHeight)/2,imageWidth, imageHeight);
		var source = commentaryVoice.children[0];
		console.log("play 2");
		source.src = "media/audio/2.mp3";
		if(!isAltLoaded){
			console.log(isAltLoaded);
			isAltLoaded = true;
			commentaryVoice.load();
			commentaryVoice.play();
		} else {
			commentaryVoice.currenttime = commentaryProgressSave;
			commentaryVoice.play();
		}

        setFavouriteEntryImage(boards[1].boards_id);

	}
}

function getClickArea(x, y)
{
    var number=-1;
    var imageHeight = $("#main-area").height() - 100;
    var imageWidth = 16 * imageHeight / 9;
    if(x > imageWidth*0.08 && x< imageWidth*0.234285714&& y > (imageHeight*0.033022862+((canvas.height-imageHeight)/2)) && y < (imageHeight*0.399661304+((canvas.height-imageHeight)/2))){
        number=0;
    }else if(x > imageWidth *0.446666667 && x< imageWidth *0.697142857  && y >(imageHeight*0.033840948+((canvas.height-imageHeight)/2)) && y < (imageHeight*0.475465313+((canvas.height-imageHeight)/2))){
        number=1;

    }else if(x > imageWidth *0.729047619 && x< imageWidth *0.962380952  && y >(imageHeight*0.040609137+((canvas.height-imageHeight)/2))  && y < (imageHeight*0.366328257+((canvas.height-imageHeight)/2))){
        number=2;

    }else if(x > imageWidth *0.037142857 && x< imageWidth *0.358095238  && y >(imageHeight*0.519458545+ ((canvas.height-imageHeight)/2))  && y < (imageHeight*0.930626058+((canvas.height-imageHeight)/2))){
        // number=3;
        // alert("该区域播放视频");
		commentaryVoice.pause();
		backgroundMusic.pause();

        $("#video-box").show();

        if(currarea==true){
        	$('#videosrc').attr('src', "media/video/marshal.webm");
            $('#videosrc').attr('type', "video/webm");
		}else{
            $('#videosrc').attr('src', "media/video/zhude-2.mp4");
            $('#videosrc').attr('type', "video/mp4");
		}
        $('#v1').trigger('load');
        $('#v1').trigger('play');


    }else if(x > imageWidth *0.4 && x< imageWidth *0.687619048  && y >(imageHeight* 0.521150592+((canvas.height-imageHeight)/2))  && y < (imageHeight*0.934010152+((canvas.height-imageHeight)/2))){
        number=3;

    }else if(x > imageWidth *0.729047619 && x< imageWidth *0.962380952&& y >(imageHeight*0.460236887 +((canvas.height-imageHeight)/2)) && y < (imageHeight*0.933164129+((canvas.height-imageHeight)/2))){
        number=4;
    }

	if(number>=0){
		if(currarea) {
        	$.fancybox.open(displayBoardOne, {
	            loop : false
    	    });
        	$.fancybox.getInstance().jumpTo(number);
        } else {
            $.fancybox.open(displayBoardTwo, {
	            loop : false
    	    });
        	$.fancybox.getInstance().jumpTo(number);
        }
	}

}

function getEventPosition(ev) {
	var x, y;
	if(ev.layerX || ev.layerX == 0) {
		e = ev.layerX;
		y = ev.layerY;
	} else if(ev.offsetX || ev.offsetX == 0) {
		alert(off)
		x = ev.offsetX;
		y = ev.offsetY;
	}

	return {x: x, y: y};
}

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
            $("#favorites-entry").unbind();
		}else{
            $("#favorites-entry-img").attr('src', 'icons/favorites-entry.png');

            //attach 点击添加收藏处理函数; 加入收藏夹，改变收藏图标，点击后弹出提示框
            $("#favorites-entry").click(function() {
                var boards_id = $(this).attr("boards-id");
                var btransaction = dbGlob.db.transaction(['boards'], 'readwrite');
                var bstore = btransaction.objectStore('boards');
                var requ = bstore.get(parseInt(boards_id));

                requ.onsuccess = function(e) {
                    var board = e.target.result;
                    var fbtransaction = dbGlob.db.transaction(['favorites_board'], 'readwrite');
                    var fbstore = fbtransaction.objectStore('favorites_board');
                    var brequest = fbstore.put({
                        "favorites_board_id": board.boards_id,
                        "favorites_board_name" : board.boards_name,
                        "favorites_board_path" : board.img_path,
                        "favorites_board_halls_id" : board.boards_halls_id
                    });
                    brequest.onsuccess = function(event){
                        favoritesEntryImg.src = "icons/saved.png";
                        $("#popwindow").slideDown().delay(1000).slideUp();
                        // setTimeout(function(){
                        //     favoritesEntryImg.src = "icons/saved.png";
                        // },1000);
                        $("#favorites-entry").unbind();
                    }
                }



            });
		}


    }
}


