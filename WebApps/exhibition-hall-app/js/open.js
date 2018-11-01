/* 从sdcard中读取JSON文件，写入到数据库中 */

var sdcard;
var hallsInfoPath = "0/.AppData/hall/config";
var recordsInfoPath = "0/.AppData/JSON";
var ARCHIVES_PATH = "0/.AppData/archives";


var boardsReady = false;

var hallsList = Array();

var boardsList = Array();    //存储当前展示展厅的展板
var recordsList = Array();	//将档案信息记录在该Array中
var p=0;

var personHallidList=[];




/* 获取设备存储：sdcard picture video等*/
function getDevice(device) {
	sdcard = navigator.getDeviceStorage(device);
}




/**
 * 读取展厅、展板信息
 * @param file file object in system
 */
function getHallsInfo(file) {
	var reader = new FileReader();
	var hallsJson;

	
	var elements = new Object();
	var boardsArray;
	

		console.log("get halls json file:" + file.name);

		reader.addEventListener("loadend", function(event){
			hallsJson = JSON.parse(reader.result);	//读取到JSON文件，将其内容写入数据库
			var hallsObj = new Object();



			for(var i in hallsJson) {
				if(i == "halls_id")
					hallsObj.halls_id = hallsJson[i];
				if(i == "hall_name")
					hallsObj.hall_name = hallsJson[i];
				if(i == "cover")
					hallsObj.cover = hallsJson[i];
				if(i == "boards")
					boardsArray = hallsJson[i];
			}

            console.log(hallsObj.hall_name);
            if (hallsObj.hall_name.indexOf("figure")!=-1) {
                console.log(hallsObj.halls_id);
                hallsJson.type = 'figure'; //人物展厅类型
                hallsJson.docname = hallsObj.hall_name.replace('figure',''); //该展厅对应的档案文件夹名字, 在解析档案json时进行关联
                personHallidList.push(hallsObj.halls_id);
            }else{
                hallsJson.type = 'other'; //非人物展厅类型
                hallsJson.docname = hallsObj.hall_name.replace('other','');
            }
            
            // if (hallsObj.hall_name.indexOf("figure")!=-1) {

            // }

			// if (file.name.indexOf("开国将帅_config.js")!=-1) {
			// 	personHallid = hallsObj.halls_id;
			// }

			/* 插入halls表 */
			var transaction = dbGlob.db.transaction("halls", "readwrite");
			//alert('transaction');
			var store = transaction.objectStore("halls");
			var req = store.put(hallsObj);
			req.onsuccess = function(event){
			//	alert('adding hall');
			};
			req.onerror = function(event){
				//alert('为什么失败了');
			};

			hallsList.push(hallsJson);

			for(var i=0; i<boardsArray.length; i++) {

				var boardsObj = new Object();
				for(var j in boardsArray[i]){
					if(j == "id")
						boardsObj.id = boardsArray[i][j];
					if(j == "name")
						boardsObj.name = boardsArray[i][j];
					if(j == "bg_path")
						boardsObj.bg_path = boardsArray[i][j];
					if(j == "boards_halls_id")
						boardsObj.boards_halls_id = boardsArray[i][j];
					if(j == "comments_path")
						boardsObj.comments_path = boardsArray[i][j];
					if(j == "elements"){
						/*
						elements = boardsArray[i][j];
						for(var k=0; k<elements.length; k++)
							console.log(elements[k]);
							 插入elements表 */
						boardsObj.elements = boardsArray[i][j];
					}
					
					

				}



				boardsObj.seq = i;

                //boardsList.push(boardsObj);

				/* 插入boards表*/
				var transaction = dbGlob.db.transaction('boards', 'readwrite');
				var store = transaction.objectStore('boards');

				store.put(boardsObj);
			}



		});

		reader.readAsText(file);
		


}

/*
 *   configOfFigure 人物档案配置文件所属数组
 *
 *   configOfThing  非人物档案配置文件所属数组
　*/
var configOfFigure = [];
var configOfThing = [];

function getConfigOfRecord(path){
    return new Promise(function(resolve,reject){
      var request = sdcard.enumerate(path);
      request.onsuccess = function(){
        var file = this.result;
        var file_ = file;
        // var name = file ? file.name : null;
        if (file) {
            if (file.name.search("figure")!=-1) {
                console.log("name:" + file.name);
                configOfFigure.push(file_);
            }
            else if(file.name.search("other")!=-1){
                console.log(file.name);
                configOfThing.push(file_);
            }
            this.continue();
        } else {
            console.log(configOfThing);
            console.log(configOfFigure);
            resolve("getAllFiles");
        }
      }
    }); 
}


var configOfFigureIdex = 0;
/* 读取多份人物档案信息 */
function getRecordsInfo(config) {
    var PM = new Promise(function(resolve,reject){
        var reader = new FileReader();
        reader.readAsText(config);
        reader.addEventListener("loadend", function(event){
            recordsJson = JSON.parse(reader.result);
            console.log(recordsJson);
            for(var i=0; i<recordsJson.length; i++){
                /* 直接写到数据库中去 */
                var transaction = dbGlob.db.transaction("records", "readwrite");
                var store = transaction.objectStore("records");
                store.put(recordsJson[i]);
                recordsList.push(recordsJson[i]);
            }

            resolve("records info is ready in database");   
        })
    });

	PM.then(function(r){
        console.log(r);
        configOfFigureIdex++;
        if (configOfFigureIdex<configOfFigure.length) {
           getRecordsInfo(configOfFigure[configOfFigureIdex]);
        }
    });
}

/*
*获取非人物档案信息
*1.解析Json获取档案目录路径（dirPath）
*2.遍历每个目录的文件内容，将文件的路径（filePath）/目录的名称(dirName)/文件的类型(fileType)/档案的名称()存入数据库
*
*/

var updataTimeJS='';
var lastTROJ=''; //last Time when Reading Other Record Json file
var configOfThingIndex = 0;
// var PromisePm;
var isUpDateOtherRecord = false;
var allThingJsonInfo = [];
function getThingRecords(config){
    var recordsJson;
    var otherAchivesPath;
    //TPM： 非人物 promise
	var TPM= new Promise(function(resolve,reject){
			var reader = new FileReader();
			reader.readAsText(config);
            console.log(config);
			reader.addEventListener("loadend", function(event){
			    recordsJson = JSON.parse(this.result);
			    console.log(recordsJson);
                console.log(recordsJson[0].time);
                var currentTime = localStorage.getItem(config.name);
                console.log(currentTime);
                //判断是否有更新
                if (currentTime == null || currentTime!=config.lastModified) {
                    isUpDateOtherRecord = true; 
                }
                resolve(recordsJson);	
			});
        }); 

    	TPM.then(function(r){
            if (configOfThingIndex<configOfThing.length) {
               console.log(r);
               configOfThingIndex++;
               postMessageByJson(r);    //向webworker发送档案数据。
               var otherFilelist = [];  //一个文件夹（比如解放战争文件夹）中的所有档案数组。
               var otherRcordList = [];　//一个文件夹的所有档案对象
               var otherAchivesPathTemp = r[0].fileDirPath;
               var otherAchivesPath = otherAchivesPathTemp.slice(0,otherAchivesPathTemp.length-6);   //获取到当前配置文件所对应的非人物档案路径
               getAllRecord(r,otherRcordList);
               console.log(otherAchivesPath);
               getAllFiles(otherAchivesPath,otherFilelist).then(function(rr){
                    console.log(rr);
                    console.log(otherRcordList);
                    bindRecordAndFiles(otherRcordList,rr);　//
                    for (var i = 0; i < otherRcordList.length; i++) {
                        allRecordList.push(otherRcordList[i]);
                    } 
                    console.log(allRecordList);

                    console.log(configOfThing.length);
                    console.log(configOfThingIndex);
               });  
            }

            if(configOfThingIndex==configOfThing.length){
                worker.postMessage("postover");
                console.log(isUpDateOtherRecord);
                if (isUpDateOtherRecord == true) {
                    deleteIdx();
                   recFromThread().then(function(r){       //直接从线程中获取结果
                        console.log(r);
                        finalIdx = jsonToObject();
                        console.log(finalIdx);
                        localStorageHandler(configOfThing); 
                        console.log("bingobingo");  
                    }); 
                }else{
                    console.log("read by db");
                    recFromDb().then(function(r){　　　　　　　　　//直接从数据库中获取结果
                        finalIdx = jsonToObject();
                        console.log(finalIdx);
                    })
                }
            }else{
                getThingRecords(configOfThing[configOfThingIndex]);
            }
        });
}

//为每个文件设置localstore的值
function localStorageHandler(config){
    for (var i = 0; i < configOfThing.length; i++) {
        localStorage.setItem(configOfThing[i].name,configOfThing[i].lastModified);
    }
    
}


//将文件的字符串信息发送给线程
function postMessageByJson(jsonObj){
    console.log(jsonObj);
    var recordInfoWords = [];
    for (var i = 0; i < jsonObj.length; i++) {
        var rdata = jsonObj[i].wjm+"@kylin@"+jsonObj[i].smc;
        recordInfoWords.push(rdata);
    }
    console.log(recordInfoWords);
    worker.postMessage(recordInfoWords);
}



//默认图片获取
var fileDefault; //默认图片
function getDefaultImage(path){
    var request = sdcard.get(path);
    request.onsuccess=function(){
        fileDefault = this.result;
    };
}

function checkHalls() {
	var transaction = dbGlob.db.transaction("halls", "readwrite");
	var store = transaction.objectStore("halls");

	var request = store.getAll();

	request.onsuccess = function(event) {
		var result = event.target.result;
		console.log(result[0]);
	}
}

function checkBoards() {
	var transaction = dbGlob.db.transaction("boards", "readwrite");
	var store = transaction.objectStore("boards");

	var request = store.get("0de3f6e2bdbe4672976a82d29f13900a");

	request.onsuccess = function(event) {
		result = event.target.result;
		console.log(result);
		
	}
}


function checkRecords() {
	var transaction = dbGlob.db.transaction("records", "readwrite");
	var store = transaction.objectStore("records");

	var request = store.get("0001");

	request.onsuccess = function(event) {
		result = event.target.result;
		console.log(result);
	}

}


var bgAudio = document.getElementById("backgroundmusic");
var bgMusicSrc = document.getElementById("bgSrc");
function  bgMusicInit(){
	var cursor = sdcard.enumerate("0/.AppData/bgmusic");
        cursor.onsuccess = function () {
        	if (this.result) {
            	var file = this.result;
                bgMusicSrc.src = URL.createObjectURL(file);
                bgAudio.load();
                if (bgAudio.paused) {
                	bgAudio.play();
                	return;
                }else{
                	bgAudio.pause();
                	return;
                }
            }
        }
};



/************************************
 *以下代码是为了配合全文检索的主线程代码
 *
 ************************************/
var worker;   //线程对象

var rData;

var fiel; 
var invertedI;
var tokenS;
var fieldV;
var finalIdx;

//创建线程接受线程发送的消息
function createWorker() {
    if(typeof(Worker)!=="undefined"){
           worker = new Worker("js/webworker.js");
           console.log("webworkers webworkers");
    }else{
        alert("Sorry, your browser does not support Web Workers...");
    }   
}



//读取数据库將档案字符串信息传递给线程
function getRecordFromDb(){
    return new Promise(function(resolve,reject){
       var transaction = dbGlob.db.transaction('Trecords', 'readwrite');
        var store = transaction.objectStore('Trecords');
        store.openCursor().onsuccess = function(event) {
            // console.log("here is getRecordFromDb");
            var cursor = event.target.result;
            if(cursor) {
                // console.log(cursor.value.xh);
                // console.log(cursor.value.records_name);
                // console.log(cursor.value.text);
                rData = cursor.value.Trecords_id+"@kylin@"+cursor.value.smc;
                // console.log(rData);
                recordInfo.push(rData);
                cursor.continue();
            }else {
                // console.log("no more entries" + data);
                worker.postMessage(recordInfo);                  //将得到的消息一并传递给分线程
            }
            resolve("getData ok");
        } 
        store.openCursor().onerror = function(event) {
            reject("getData error");
        }
    });
}


//从线程接受消息
function recFromThread(){
    return new Promise(function(resolve,reject){
        worker.onmessage = function (e) {
            console.log("here is getRecordTread");
            // console.log(e.data);
            var result = e.data.split("#@");
            fiel = result[0];
            // console.log(fiel);
            invertedI = result[1];
            tokenS = result[2];
            fieldV = result[3];
            saveIdx();
            resolve("idx data is over");
        };
    });   
}

//直接从数据库中得到idx的相关信息
function recFromDb(){
    return new Promise(function(resolve,reject){
        var transaction = dbGlob.db.transaction('idx', 'readwrite');
        var store = transaction.objectStore('idx');
        var request = store.get("full");
        request.onsuccess = function(event) {
            var idxInfo = event.target.result;
            tokenS = idxInfo.tokenSet;
            invertedI = idxInfo.invertedIndex;
            fiel = idxInfo.fields;
            fieldV = idxInfo.fieldVectors;
            resolve("get from db over");
        }
    });
}



//模板idx
function  creIdxModel(){
    var documents = [
        {
           "name": "Lodash",
           "text": "lunr test text."
        }];
        var idx = lunr(function () {
            this.ref('name')
            this.field('text')
            this.metadataWhitelist = ['position']

            documents.forEach(function (doc) {
                this.add(doc);
            }, this)
        });
        return idx;
};

//将Json转换成对象 idx。

function jsonToObject(){
    var idx = creIdxModel();
    var tokenSGet = JSON.parse(tokenS);
    var invertedIGet = JSON.parse(invertedI);
    var fielGet = JSON.parse(fiel);
    var fieldVGet = JSON.parse(fieldV);
    var fieldArray = Object.getOwnPropertyNames(fieldVGet);
    for (var k = 0;k<fieldArray.length; k++) {
        idx.fieldVectors[fieldArray[k]]=idx.fieldVectors["text/Lodash"];
        idx.fieldVectors[fieldArray[k]].elements.splice(0,idx.fieldVectors[fieldArray[k]].elements.length);
        idx.fieldVectors[fieldArray[k]].elements=[].concat(fieldVGet[fieldArray[k]]);
    }
    idx.fields =fielGet;
    idx.invertedIndex=invertedIGet;
    idx.tokenSet.edges = tokenSGet.edges;
    idx.tokenSet.id = tokenSGet.id;
    return idx;
}

//将分线程传输的数据存储在数据库里
function  saveIdx(){
        var transactionIdx = dbGlob.db.transaction(['idx'],'readwrite');
        var storeIdx = transactionIdx.objectStore('idx');
        var requestIdx = storeIdx.put({
            "idx_id":"full",
            "fields": fiel,
            "invertedIndex":invertedI,
            "tokenSet":tokenS,
            "fieldVectors":fieldV
        });
        requestIdx.onsuccess = function(){
            console.log("idxinfo save ok!");
        }
}

//删除旧的索引数据
function deleteIdx(){
    var transaction = dbGlob.db.transaction('idx', 'readwrite');
    var store = transaction.objectStore('idx');
    store.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            cursor.delete();
        }else{
            console.log("here is nothing to delete");
        }
    }
}

function getHallData(path){
	var allConfigFiles=[];
    var promise = new Promise(function(resolve,reject){
      var request = sdcard.enumerate(path);
      request.onsuccess = function(){
        var file = this.result;
        if (file) {
        	if(file.name.indexOf("config.js")!=-1){
            	console.log(file.name);
            	allConfigFiles.push(file);
            }
            this.continue();
        }else{
            console.log(allConfigFiles);
            resolve("get ok");
        }
      }
    });
    promise.then(function(rr){

        console.log(allConfigFiles);
    	for(var i =0; i< allConfigFiles.length; i++){

    		getHallsInfo(allConfigFiles[i]);
    	}
    });
}

// var tempPromise;
window.onload = function() {
    initDB(dbGlob.name, dbGlob.version);
    createWorker();
    getDevice('sdcard');
    /* 设置延时读取数据再插入数据库 */
    setTimeout(function(){
        bgMusicInit();
        getHallData(hallsInfoPath);
        getDefaultImage("0/.AppData/archives/default/default.jpg");
        
        getConfigOfRecord(recordsInfoPath).then(function(r){
               configOfFigureIdex = 0;
               configOfThingIndex = 0;
               getRecordsInfo(configOfFigure[configOfFigureIdex]); 
               getThingRecords(configOfThing[configOfThingIndex]);
                 
        });
    }, 500);

    setTimeout(function(){
        showHalls();
    }, 1000);
}




/* 以下代码待删 

var thingRecordObj = {
	xh: null,
	wjm: null,
	smc: null,
	filePath: null,
	img: null,
	files: null
};
var thingRecordObjList = [];

function readThingListFromJSON()
{
	var reader = new FileReader();
	var request = sdcard.get(TrecordsInfoPath);
	var recordsJson;
	request.onsuccess = function() {
		var file = this.result;
		reader.readAsText(file);
		reader.addEventListener("loadend", function(event){
			recordsJson = JSON.parse(reader.result);
			for (var i = 0; i < recordsJson.length; i++) {
				thingRecordObj.xh = recordsJson[i].xh;
				thingRecordObj.wjm = (recordsJson[i].wjm).slice(0,6);       //档案名称 key
				thingRecordObj.smc = recordsJson[i].smc;					 //档案说明词
				thingRecordObj.filePath = recordsJson[i].fileDirPath; 		//档案所在路径
				thingRecordObjList.push(thingRecordObj);         
			}
		}
	}

	console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&thingRecordObjList:"+thingRecordObjList);
}
*/