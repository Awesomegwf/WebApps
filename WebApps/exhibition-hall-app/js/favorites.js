//load settings page, function is execued after loading the page
var hallsName = [];
var hallsId = [];

var optionAdd;
var pannel;
var file;
var deleteId;
var chooseAll;
var edit;
var flag = 0;
var flag2 = 0;
/* 加载收藏夹页面  */
$("#favorites").load('favorites.html', function() {
   
	optionAdd = document.getElementById("favorites-select-dropdown-selector");
    pannel = document.getElementById("favorites-display-board-text");
    file = document.getElementById("favorites-display-board-div");
    deleteId = document.getElementById("favorites-delete");
    chooseAll = document.getElementById("favorites-chooseAll");
    edit = document.getElementById("favorites-edit");



var loadTime = 0;
$(document).on("pageshow", "#favorites", function(){
    if(loadTime == 0){
		getDataByCursor(dbGlob.db,'halls',hallsName,"hall_name",optionCreate);
    	getDataByCursor(dbGlob.db,'halls',hallsId,"halls_id",changeHandle);
        loadTime = 1;
    }else if(isCollected == true){
        flag = 1;
    	editInfo();
        isCollected = false;
	}
	checkHalls();


	// console.log(hallsName[0]);
	// console.log("lllll");
	// console.log(hallsId[0]);
});

	//遍历展厅数据库，动态生成文件夹选项
	function optionCreate(){
		for (var i = 0; i < hallsName.length; i++) {
			var b = document.createElement("option");
    		b.innerHTML=hallsName[i]+"收藏夹";
    		b.value = i+1;
    		optionAdd.appendChild(b);
		}
		let width = $("#favorites-select-dropdown-selector").width();
        $("#favorites-select-dropdown-selector").width(width+40);
    };

// 在页面内展现展板与档案

	var fboard_cursor, fboard_div;
	var fBoardsList = [], fBoardsDivList = [];
	var idx = 0;

	function createFBoardDivs(){
        var p =new Promise(function (resolve,reject) {
        	if(idx>=fBoardsList.length) {
                reject('get all favorite boards!');
                for(var i=0; i<fBoardsDivList.length;i++){
                    pannel.appendChild(fBoardsDivList[i]);
				}
            }
        	else{
            	sdcard.get(fBoardsList[idx].favorites_board_path).onsuccess = function () {
                	var fileBoard = this.result;
                	//obj.src = URL.createObjectURL(file);
               	 	//alert(URL.createObjectURL(file));
                	fBoardsDivList[idx].innerHTML = "<img src='" + URL.createObjectURL(fileBoard) + "'/><br>" + "<p>" + fBoardsList[idx].favorites_board_name + "</p>";
                	//alert(fBoardsDivList[idx].innerHTML);
                	resolve(idx);
            	};
            }
        });

        p.then(function(index){
            //alert(index);
            idx = idx+1;
            return createFBoardDivs();
        });
	}

	function fBoardClickHander(){
        switchHall(this.getAttribute('hallid'));
        switchToBoardByIndex(parseInt(this.getAttribute('bindex')));
    	//location.href="#gallery";
    	//switchBoard(currentIndex, parseInt(this.getAttribute('bindex')), "choose");
    	//showBoard(parseInt(this.getAttribute('bindex')));
	}


function displayFile(){
    	location.href="#doc";
	   	viewRecord($(this).attr('records-id'),'');
} 

var pathRecordIndex=0;

function createRecord(){
	if(pathRecordIndex>=favoritesRecord.length)
		return;
		sdcard.get(favoritesRecord[pathRecordIndex].favorites_record_path).onsuccess = function () {
    		var fileRecord = this.result;
    		var b = document.createElement("div");
			b.style.float="left";
			b.style.marginRight="15px";
			b.style.marginBottom="22px";
			b.style.marginTop="8px";
			b.style.marginLeft="15px";
			// b.style.display="inline-block";
			b.class = "record";
			b.id = favoritesRecord[pathRecordIndex].favorites_record_id;
			b.setAttribute('records-id', favoritesRecord[pathRecordIndex].favorites_record_id);
    		b.innerHTML="<img src='"+URL.createObjectURL(fileRecord)+"'style='max-width:300px;max-height:200px'/><br>"+"<p>"+favoritesRecord[pathRecordIndex].favorites_record_name+"</p>";
    		file.appendChild(b);
    		b.addEventListener("click",displayFile);
    		pathRecordIndex++;
    		createRecord();
		};
};



	var favoritesRecord=[];

	function changeHandle(){
		favoritesRecord.splice(0,favoritesRecord.length);
		pannel.innerHTML="";
		file.innerHTML="";
        var db = dbGlob.db;
        var count = 0;
        fBoardsList = [];
        fBoardsDivList = [];
        idx = 0;
		count = optionAdd.selectedIndex;
		if (optionAdd.selectedIndex==-1) {
           count = 0;
   		};
        var btransaction = db.transaction('favorites_board', 'readwrite');
		var bstore = btransaction.objectStore('favorites_board');
        bstore.openCursor().onsuccess = function(event){
            var fboard_cursor = event.target.result;
            if (fboard_cursor) {
                if (fboard_cursor.value.favorites_board_halls_id==hallsId[count]) {
                    var fboard_div = document.createElement("div");
                    // b.style.display="inline-block";
                    fboard_div.style.float = "left";
                    fboard_div.setAttribute("class", "favorites-board");
                    fboard_div.setAttribute("bindex", fboard_cursor.value.favorites_board_index);
                    fboard_div.setAttribute("hallid", fboard_cursor.value.favorites_board_halls_id);
                    fboard_div.id = fboard_cursor.value.favorites_board_id;
                    fboard_div.addEventListener("click", fBoardClickHander);

                    fBoardsList.push(fboard_cursor.value);
                    fBoardsDivList.push(fboard_div);
                    //alert(fboard_cursor.value.favorites_board_id);
                }
				fboard_cursor.continue();
            }else{
                createFBoardDivs();
			}
		};



   		// bstore.openCursor().onsuccess = function(event){
           //
            // fboard_cursor = event.target.result;
   		// 	if (fboard_cursor) {
   		// 		if (fboard_cursor.value.favorites_board_halls_id==hallsId[count]) {
            //         fboard_div = document.createElement("div");
            //         // b.style.display="inline-block";
            //         fboard_div.style.float = "left";
            //         fboard_div.style.marginRight = "14px";
            //         fboard_div.style.marginLeft = "14px";
            //         fboard_div.style.marginTop = "60px";
            //         fboard_div.class = "board";
            //         fboard_div.id = fboard_cursor.value.favorites_board_id;
            //         pannel.appendChild(fboard_div);
            //         //fboard_div.addEventListener("click", displayPannel(fboard_cursor.value.favorites_board_index));
            //         new Promise(function(resovle,reject){
            //             sdcard.get(fboard_cursor.value.favorites_board_path).onsuccess = function () {
            //                 var file = this.result;
            //                 //obj.src = URL.createObjectURL(file);
            //                 //alert(URL.createObjectURL(file));
            //                 fboard_div.innerHTML = "<img src='" + URL.createObjectURL(file) + "'style='max-width:350px;max-height:200px'/><br>" + "<p style='width:'>" + fboard_cursor.value.favorites_board_name + "</p>";
            //                 resovle(fboard_div);
            //             };
            //         }).then(function(data){
            //         	alert(data.innerHTML);
            //             fboard_cursor.continue();
			// 		});
            //     }else{
            //         fboard_cursor.continue();
			// 	}
   		// 	}
   		// };

		var rtransaction = db.transaction('favorites_record', 'readwrite');
		var rstore = rtransaction.objectStore('favorites_record');
		rstore.openCursor().onsuccess = function(event) {
		var cursor = event.target.result;
		if(cursor) {
			favoritesRecord.push(cursor.value);
			// alert(cursor.value.favorites_record_id);
			    // alert(cursor.value.favorites_record_path);
			// if (cursor.value.favorites_record_halls_id==hallsId[count]) {
			// };
			cursor.continue();
		}
		else {
			// console.log("no more entries" + data);
			pathRecordIndex=0;
			createRecord();
		}
	}
	}
	function optionClick(){
		chooseAll.style.display="none";
		deleteId.style.display="none";
		edit.firstChild.src="icons/favorites-edit.png";
		edit.style.backgroundColor="#D9C3AC";
		changeHandle();
		flag=0;
	}
	optionAdd.addEventListener("change",optionClick);

	//点击单个

	var deleteNum =[];
	function changeColor(e){
		if (e.target.src.indexOf("favorites-choose.png")!=-1) {
			e.target.src="icons/favorites-nonechoose.png";
			for (var i = 0; i < deleteNum.length; i++) {
				if (deleteNum[i]==e.target.parentNode.id) {
					deleteNum[i]=null;
				};
			};
		}else if (e.target.src.indexOf("favorites-nonechoose.png")!=-1) {
			e.target.src="icons/favorites-choose.png";
    		deleteNum.push(e.target.parentNode.id);
    		// alert(e.target.parentNode.id);
		};    			
   	};

   	//全选

   	var recordPannel=[];
   	var boardPannel=[];
   	function changeAll(){
   		var boardNow = pannel.childNodes;
		var recordNow = file.childNodes;
		deleteNum = [];
		for (var i = 0; i < boardNow.length; i++) {
			deleteNum.push(boardNow[i].id);
			for (var j = 0; j < boardNow[i].childNodes.length; j++) {
				if (boardNow[i].childNodes[j].class == "boardPannel") {
					boardPannel.push(boardNow[i].childNodes[j]);
				};
			};
		};
		for (var i = 0; i < recordNow.length; i++) {
			deleteNum.push(recordNow[i].id);
			 for (var j = 0; j < recordNow[i].childNodes.length; j++) {
				if (recordNow[i].childNodes[j].class == "recordPannel") {
					recordPannel.push(recordNow[i].childNodes[j]);
				};
			};
		};
		if (flag2==0) {
			for (var i = 0; i < boardPannel.length; i++) {
				boardPannel[i].innerHTML="<img src='icons/favorites-choose.png' style='width:30px;height:30px'>";
			};
			for (var i = 0; i < recordPannel.length; i++) {
				recordPannel[i].innerHTML="<img src='icons/favorites-choose.png' style='width:30px;height:30px'>";
			};
			flag2=1;
			return;
		};
		if (flag2==1) {
			deleteNum=[];
			for (var i = 0; i < boardPannel.length; i++) {
				boardPannel[i].innerHTML="<img src='icons/favorites-nonechoose.png' style='width:30px;height:30px'>";
			};
			for (var i = 0; i < recordPannel.length; i++) {
				recordPannel[i].innerHTML="<img src='icons/favorites-nonechoose.png' style='width:30px;height:30px'>";
			};
			flag2=0;
			return;
		};
   	}
	chooseAll.addEventListener("click",changeAll);

    // 编辑与取消编辑

	function editInfo(){
		var boardNow = pannel.childNodes;
		var recordNow = file.childNodes;
		if (flag==1) {
			chooseAll.style.display="none";
			deleteId.style.display="none";
			edit.firstChild.src="icons/favorites-edit.png";
			edit.style.backgroundColor="#D9C3AC";
			changeHandle();
			flag=0;
            flag2 = 0;
			return;
		};
		if (flag==0) {
			chooseAll.style.display="inline";
			deleteId.style.display="inline";
			edit.firstChild.src="icons/favorites-cancel-edit.png";
			edit.style.backgroundColor="red";
			for (var i = 0; i < boardNow.length; i++) {
				boardNow[i].removeEventListener("click",fBoardClickHander);
				var b = document.createElement("div");
				b.style.float="right";
				b.style.width="30px";
				b.style.height="30px";
				b.style.backgroundColor="white";
				b.style.position="relative";
				b.style.top="-250px";
				b.style.right="5px";
				b.class = "boardPannel";
				b.id = boardNow[i].id;
				b.innerHTML = "<img src='icons/favorites-nonechoose.png' style='width:30px;height:30px'>";
    			boardNow[i].appendChild(b);
    			b.addEventListener("click",changeColor);
			};
			for (var i = 0; i < recordNow.length; i++) {
				recordNow[i].removeEventListener("click",displayFile);
				var b = document.createElement("div");
				b.style.float="right";
				b.style.width="30px";
				b.style.height="30px";
				b.style.backgroundColor="white";
				b.style.position="relative";
				b.style.top="-252px";
				b.style.right="5px";
				b.class = "recordPannel";
				b.id=recordNow[i].id;
				b.innerHTML = "<img src='icons/favorites-nonechoose.png' style='width:30px;height:30px'>";
    			recordNow[i].appendChild(b);
    			b.addEventListener("click",changeColor);
			};
			flag = 1;
			return;
		};
	}
	edit.addEventListener("click",editInfo);

	var deleteFlag = 0;
	//删除
	function deleteDate(){
		var btransaction = dbGlob.db.transaction('favorites_board', 'readwrite');
		var bstore = btransaction.objectStore('favorites_board');
   		bstore.openCursor().onsuccess = function(event){
   			var cursor = event.target.result;
   			if (cursor) {
   				for (var i = 0; i < deleteNum.length; i++) {
   					if(deleteNum[i]==cursor.value.favorites_board_id){
   						cursor.delete();
   					}
   				};
			cursor.continue();
   			};
   		}

   		var rtransaction = dbGlob.db.transaction('favorites_record', 'readwrite');
		var rstore = rtransaction.objectStore('favorites_record');
		rstore.openCursor().onsuccess = function(event) {
			var cursor = event.target.result;
			if(cursor) {
			    for (var i = 0; i < deleteNum.length; i++) {
			    	// alert(deleteNum[i])
   					if(deleteNum[i]==cursor.value.favorites_record_id){
   						cursor.delete();
   					}
   				};
				cursor.continue();
			}
		}
   		optionClick();
    }
    deleteId.addEventListener("click",deleteDate);
});
// $("#favorites").load('favorites.html', function(){

// });









