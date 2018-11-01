var dbGlob = {
	name: 'daEXHIBITIONS',
	version: 1,
	db: null
};


//初始化数据库
function initDB(name, version) {
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
	
	// window.indexedDB.deleteDatabase(dbGlob.name);

	var version = version || 1;
	

	var request = window.indexedDB.open(name, version);

	request.onerror = function(event) {
		console.log("open db error");
		alert('open db error');
	};

	request.onsuccess = function(event) {
		dbGlob.db = event.target.result;
		console.log('open db successful');
        var db = event.target.result;
        //populateData();
	};

	request.onupgradeneeded = function(event) {
		var db = event.target.result;
		if(!db.objectStoreNames.contains('halls')) {
			var objctStore = db.createObjectStore('halls', { keyPath:"halls_id" });
		}

		if(!db.objectStoreNames.contains('boards')) {
			db.createObjectStore('boards', { keyPath:"id" });

		}


		if(!db.objectStoreNames.contains('elements')) {
			db.createObjectStore('elements', { keyPath:"elements_id" });
		}

		if(!db.objectStoreNames.contains('records')) {
			var objctStore = db.createObjectStore('records', { keyPath:"records_id" });
		}

        if(!db.objectStoreNames.contains('Trecords')) {                     // 非人物档案数据信息
            var objctStore = db.createObjectStore('Trecords', { keyPath:"Trecords_id" });
        }

		if(!db.objectStoreNames.contains('favorites')) {
			db.createObjectStore('favorites', { keyPath:"favorites_board_path" });
		}

		if(!db.objectStoreNames.contains('favorites_board')) {
			db.createObjectStore('favorites_board', { keyPath:"favorites_board_id" });
		}
		if(!db.objectStoreNames.contains('favorites_record')) {
			db.createObjectStore('favorites_record', { keyPath:"favorites_record_id" });
		}
        if(!db.objectStoreNames.contains('favorites_img')) {
            db.createObjectStore('favorites_img', { keyPath:"favorites_img_path" });
        }

        if(!db.objectStoreNames.contains('idx')) {
            db.createObjectStore('idx', { keyPath:"idx_id" });    //创建一个储存对象
        }

        if(!db.objectStoreNames.contains('Time')) {
            db.createObjectStore('Time', { keyPath:"timenow" });    //创建一个储存对象
        }
		console.log("DB version changed to" + version);
	};
}

function getDataByKey(db, storeName, value) {
	var transaction = db.transaction(storeName, 'readwrite');
	var store = transaction.objectStore(storeName);
	var request = store.get(value);
	request.onsuccess = function(event) {
		var halls = event.target.result;
		console.log(halls.favorites_board_path);
	}
}

function updateDataByKey(db, storeName, value) {
	var transaction = db.transaction(storeName, 'readwrite');
	var store = transaction.objectStore(storeName);
	var request = store.get(value);
	request.onsuccess = function(event) {
		var halls = event.target.result;
		halls.name = "九大战役";
		store.put(halls);
	}
}

function addData(db, storeName) {
	var transaction = db.transaction(storeName, 'readwrite');
	
	var store = transaction.objectStore(storeName);

	if(storeName == "halls") {

	}

	if(storeName == "records"){

	}
}


function select(db, storeName, key) {
	var transaction = db.transaction(storeName, 'readwrite');
	var store = transaction.objectStore(storeName);
	if(key){
		var request = store.get(key);
	}
	else{
		var request = store.getAll(all);
	}

	request.onsuccess = function(event) {
		console.log(event.target.result);
	}
}

function getDataByIndex(db, storeName, index, key) {
	var transaction = db.transaction(storeName, 'readwrite');
	var store = transaction.objectStore(storeName);
	var indexName = store.index(index);
	
	indexName.get(key).onsuccess = function(event) {
		alert(event.target.result);
	}
	request.onerror = function(event) {
		alert("error!");
	}
}

function getDataByCursor(db, storeName,data,attribute,callback) {
        var transaction = db.transaction(storeName, 'readwrite');
        var store = transaction.objectStore(storeName);
        store.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;
                if(cursor) {
                	var hallName = cursor.value.hall_name;
                	if (hallName.indexOf("figure")!=-1)
					{
						hallName = hallName.substring(6);
					}else if(hallName.indexOf("other")!=-1){
                		hallName = hallName.substring(5);
					}
					if (attribute==="hall_name") {
							console.log("hall_name:" + cursor.value.hall_name);
							data.push(hallName);
					};
					if (attribute==="halls_id") {
							data.push(cursor.value.halls_id);
					};
					cursor.continue();
                }
                else {
                        // console.log("no more entries" + data);
                }

        }
        transaction.oncomplete = function(){
                if(callback) callback();
        }
}
	
function populateData(){
        //favorites
        var faTransaction = dbGlob.db.transaction(['favorites'], 'readwrite');
        var faObjectStore = faTransaction.objectStore('favorites');
        for(var i = 0; i < favorites.length ; i++) {
            faObjectStore.put(favorites[i]);
        };

        //favorites_record
        var rTransaction = dbGlob.db.transaction(['favorites_record'], 'readwrite');
        var rObjectStore = rTransaction.objectStore('favorites_record');
        for(var i = 0; i < favorites_record.length ; i++) {
            rObjectStore.put(favorites_record[i]);

        };
        //favorites_board
        var bTransaction = dbGlob.db.transaction(['favorites_board'], 'readwrite');
        var bObjectStore = bTransaction.objectStore('favorites_board');
        for(var i = 0; i < favorites_board.length ; i++) {
            bObjectStore.put(favorites_board[i]);
            console.log("ooo");
        };
};