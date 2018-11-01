var galleryIconsArea;


var pCurrentHall;  //当前所在展厅

$("#gallery-list").load('gallery-list.html', function(){
    galleryIconsArea = document.getElementById('gallery-list-icons');
});
var hall = null;	//定义当前浏览的展厅

// function getHallsList() {
// 	var hallsList;

// 	var transaction = dbGlob.db.transaction('halls', 'readwrite');
// 	var store = transaction.objectStore('halls');

// 	var result;	//保存展厅数据

// 	/* 拿到所有的展厅数据 */
// 	var request = store.getAll();

// 	request.onsuccess = function(event) {
// 		result = event.target.result;

// 		for(var i=0; i<result.length; i++) {
// 			//展厅封面
// 			var img = document.createElement('img');
// 			hall = result[i].halls_id;

// 			var request = sdcard.get(result[i].cover);
// 			request.onsuccess = function() {
// 				var file = this.result;
// 				img.src = URL.createObjectURL(file);
// 				galleryListArea.appendChild(img);
// 			}

// 			img.onclick = function() {
// 				window.location.assign("#gallery");				
// 			}
// 		}

// 	}
// }
function showHalls() {
	console.log("showhalls");
	console.log(hallsList);

    hallsList.sort(function(hall1, hall2){
        if (hall1.halls_id < hall2.halls_id) return -1;
        if (hall1.halls_id > hall2.halls_id) return 1;
        return 0;
    });

    // personHallid = hallsList[0].halls_id;
	for(var i=0; i < hallsList.length; i++){

		(function(idx) {
            console.log(hallsList[idx]);
            let img = document.createElement('img');
            if (galleryIconsArea) galleryIconsArea.appendChild(img);
            hall = null;
            img.setAttribute('hallid', hallsList[idx].halls_id);
            var request = sdcard.get(hallsList[idx].cover);
            request.onsuccess = function () {
                var file = this.result;
                img.src = URL.createObjectURL(file);
            }

            img.onclick = function () {

                var _hall = this.getAttribute('hallid');
                switchHall(_hall); //切换展厅数据

                location.href = "#gallery";

                // sdcard.get("0/.AppData/backgroundMusic/molihua.mp3").onsuccess = function (){
                //            	var file = this.result;
                //           	 	document.getElementById("backgroundmusic").children[0].src = URL.createObjectURL(file);
                //           	 	document.getElementById("backgroundmusic").load();
                //       			document.getElementById("backgroundmusic").play();
                //        	}
            }
        })(i);
	}
}

/**
 * 切换展厅。
 * 主要是切换展厅展板数据
 *
 * @param hallid 欲切换的展厅id
 */
function switchHall(hallid){

    if(hall==null || hall!=hallid){
        $("#record-div").html("");
    	hall = hallid;

        for(var i=0; i < hallsList.length; i++) {

            if (hallsList[i].halls_id == hallid) {
                boardsList = hallsList[i].boards;
                pCurrentHall = hallsList[i];
                break;
            }
        }

        clearBoardInfo();
    }


}
