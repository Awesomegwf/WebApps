//数据库对象
var dbGlob = {
    name: 'IETM',
    version: 1,
    db:null
};

//初始化数据库
function initData(name, version) {
	return new Promise(function(resolve,reject){
		window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
		window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    	window.indexedDB.deleteDatabase(dbGlob.name);
    	var version = version || 1;
		var request = window.indexedDB.open(name, version);

		request.onerror = function(event) {
			console.log("open db error");
			alert('open db error');
			reject("init database failed");
		};

		request.onsuccess = function(event) {
			dbGlob.db = event.target.result;
			// alert('open db successful');
			resolve("Database init successfully");
		};

		//当数据库被创建时||数据库名称发生改变||数据库版本更新时触发
		request.onupgradeneeded = function(event) {
        	var db = event.target.result;
        	if(!db.objectStoreNames.contains('idx')) {
            	var objctStore = db.createObjectStore('idx', { keyPath:"idx_id" });    //创建一个储存对象
        	}
        	if(!db.objectStoreNames.contains('fullwords')) {						   //全文检索段落存储
            	var objctStore = db.createObjectStore('fullwords', { keyPath:"fullwords_id" });    
        	}
        	if(!db.objectStoreNames.contains('saveFlag')) {						   //全文检索存储flag
            	var objctStore = db.createObjectStore('saveFlag', { keyPath:"saveFlag_id" });    
        	}
            if(!db.objectStoreNames.contains('notes')) {						   //全文检索存储flag
                var objctStore = db.createObjectStore('notes', { keyPath:"notes_id" });
            }
        	// console.log("DB version changed to" + version);
    	}; 
	});	
}
