//数据库对象
var dbGlob = {
    name: 'beidou',
    version: 1,
    db:null
};
//初始化数据库
function initDB(name, version) {
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
            if(!db.objectStoreNames.contains('number')) {
                var objctStore = db.createObjectStore('number', { keyPath:"num" });    //创建一个储存对象
            }
            console.log("DB version changed to" + version);
        }; 
    }); 
}

//数据库相关的调用
initDB(dbGlob.name,dbGlob.version).then(function(r){
    console.log(r)
    //存储用户信息
    $("#abtnum").bind("click",function(){
        $("#done").html("存储中...");
        var name = $("#username").val();
        var number = $("#usernum").val();
        if ((name!=undefined&&name!=""&&name!=null)&&(number!=undefined&&number!=""&&number!=null)) {
            var transaction = dbGlob.db.transaction(['number'], 'readwrite');
            var store = transaction.objectStore('number');
            var request = store.put({
                "num": number,
                "name": name
            });
            request.onsuccess = function(event){
                $("#numrecord").html("");
                readUserinfo();
                $("#done").html("存储成功");
                setTimeout(function(){
                    $("#done").html("");
                    animateEdit();
                },1500);
            }
            request.onerror = function(){
                $("#done").html("存储失败");
                setTimeout(function(){
                    $("#done").html("");
                },1500);
            }
        }
    })
});
    //读取用户信息
    function readUserinfo(){
        var rtransaction = dbGlob.db.transaction('number', 'readwrite');
        var rstore = rtransaction.objectStore('number');
        rstore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
          if(cursor) {
            $("#numrecord").append("<div class='onenumber1'>\
                <div class='onenumber-frame'>\
                    <table class='onenumber-table1'>\
                        <tr>\
                            <td class='number'>"+cursor.value.num+"</td>\
                            <td class='company'>"+cursor.value.name+"</td>\
                        </tr>\
                    </table>\
                </div>\
                <div class='editanddelete1'> \
                    <div class='onenumber-delete'>\
                        删除\
                    </div>\
                    <div class='onenumber-edit'>\
                        编辑\
                    </div>\
                </div>  \
                </div>");
            cursor.continue();
          }
        }
    }    
    
