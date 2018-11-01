var displayBoardEntry = document.getElementById("display-board-entry");
var favoritesEntry = document.getElementById("favorites-entry");
var displayBoardEntryImg = document.getElementById("display-board-entry-img");
var favoritesEntryImg = document.getElementById("favorites-entry-img");
var galleryEntry = document.getElementsByClassName("gallery-entry");
var pullDownMenu = document.getElementById("pull-down-menu");
var isDisplayBoardShowed = false;
var isFavoritesShowed = false;
var favoritesSelector = document.getElementById("favorites-select-dropdown-selector");

 // 改变展板列表图标
displayBoardEntry.onclick = function() {
	if(!isDisplayBoardShowed) {
 		displayBoardEntryImg.src = "icons/display-board-entry-hover.jpg";
 		isDisplayBoardShowed = true;
		$("#pull-down-menu").slideDown();
 	} else {
 		displayBoardEntryImg.src = "icons/display-board-entry.png";
 		isDisplayBoardShowed = false;
 	}
 		/*判断是否展开展板选择菜单*/
	if(pullDownMenu.style.display == "inline") {
		// pullDownMenu.style.display = "none";
        $("#pull-down-menu").slideUp();
	} else {
		pullDownMenu.style.display = "inline";
	}

        InitBoardsSelector();

};

//背景音乐控制
var slider = document.querySelector(".slider");
var buffer = document.querySelector(".buffer");


$(function() {
        AudioControl('commentary-voice');
        function AudioControl(id) {
                var audio = document.getElementById(id);
                $(audio).on('loadedmetadata', function(){


                //设置播放时间
                setInterval(function() {
                        var currentTime = audio.currentTime;
                        setTimeShow(currentTime);
                }, 1000);

                function setTimeShow(t) {
                        t = Math.floor(t);
                        var playTime = secondToMin(audio.currentTime);
                        $("#current").html(playTime+"/");
                        if (!audio.duration) {
                                $("#duration").text("00:00");

                        }else{
                                $("#duration").text(secondToMin(audio.duration));
    
                        }
                        $(".controller").css({ left: (t/audio.duration).toFixed(4)*100 + "%"});
                }

                function secondToMin(s) {
                        var MM = Math.floor(s / 60);
                        var SS = s % 60;
                        if (MM < 10)
                                MM = "0" + MM;
                        if (SS < 10)
                                SS = "0" + SS;
                        var min = MM + ":" + SS;
                        return min.split('.')[0];
                }


                })
        }
});





// function search()
// {
// 	var request = window.indexedDB
// }

// function DBInit()
// {
// 	var request = window.indexedDB.open("database", 2);
// 	request.onsuccess = function(e) {
// 		var db = e.target.result;
// 		var objectStore = db.transaction("Exhibition").objectStore("Exhibition");

// 		objectStore.openCursor().onsuccess = function(event) {

// 		}
// 	}
// }

$(document).on("pageshow", "#gallery-list", function(){

})
