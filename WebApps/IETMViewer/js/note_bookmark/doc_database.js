// doc_database.js 

//database 数据库相关的操作
function initDB(name, db_version) {
    window.indexedDB=window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
    if(window.indexedDB){
        //alert("您的浏览器支持IndexedDB数据库。");
    } else{
        alert("您的浏览器不支持IndexedDB数据库。");
    };

    request=window.indexedDB.open('Bookmark_Note_DB','1');        
    request.onsuccess=function(event){
        // console.log('Bookmark_Note_DB 打开成功！');
        mydb=request.result;
        // console.log(mydb);
    };

    request.onerror=function(event){
        console.log("打开数据库失败,错误号：" + event.target.errorCode);
    };

    request.onupgradeneeded = function(event) {
        mydb=request.result;
        if(!mydb.objectStoreNames.contains("Bookmark_Note_DB")) {                                   
            var objectStore = mydb.createObjectStore("Bookmark_Note_DB", {keyPath: "id"});
            objectStore.createIndex("db_id","id", {unique: true });
            // objectStore.createIndex("bookmark","bookmark",{ unique: false });
            objectStore.createIndex("doc_bm_pos","doc_bookmark_position",{ unique: false });
            objectStore.createIndex("doc_no_pos","doc_note_position",{ unique: false });
            objectStore.createIndex("pan_bm_id","panel_bookmark_id",{ unique: false });
            objectStore.createIndex("pan_no_id","panel_note_id",{ unique: false });
        };
    }
}


//插入数据
function insert(mydb,data){
    var transaction = mydb.transaction('Bookmark_Note_DB','readwrite');         
    var objStore = transaction.objectStore('Bookmark_Note_DB');
    var request = objStore.add(data);
    request.onsuccess = function(e) {
        console.log(data);
        // console.log("add bookmark: "+Bookmarklist_id+" succeed!" );
        alert("添加书签成功，id=" + e.target.result);
    };
}

//取出数据并跳转
function Select_data_jump(mydb,Index_name,Index_value){
    var transaction = mydb.transaction('Bookmark_Note_DB','readonly');
    var objStore = transaction.objectStore('Bookmark_Note_DB');
    // Index_name= "pan_bm_id";
    // Index_value = Index_value;
    var index = objStore.index(Index_name);//列名
    let promise_select = new Promise(function(resolve,reject){
        var request = index.get(Index_value);//列值
        request.onsuccess=function(e){
            db_result = e.target.result;
            console.log(db_result);
            resolve(db_result);
        }
    });
    promise_select.then(function(){
        // console.log("要跳转的位置id :"+db_result.doc_bookmark_note_position);
        Jump_to_doc(db_result.bookmark.doc_bookmark_position);
        // Jump_to_doc(db_result.note.doc_note_position);
    });
} 

//初始化，游标遍历所有添加书签到书签栏：
function Init_Bm_No_byCursorGet(mydb){
    var transaction = mydb.transaction('Bookmark_Note_DB','readwrite');
    var objStore = transaction.objectStore('Bookmark_Note_DB');
    // var bookmark_count = 0;
    var Bookmarklist_num = 0;//每次初始化笔记都从0开始编id
    var request=objStore.openCursor();
    request.onsuccess = function(e){
        var cursor = e.target.result;
        if(cursor){
                var result = cursor.value;
                var Id_num_ = result.id;

                var Bookmark_div_id = result.panel_bookmark_id;
                var Note_div_id = result.panel_note_id;

                var Bookmark_position_id = result.bookmark.doc_bookmark_position;
                var Note_position_id = result.note.doc_note_position;

                var Index_name = Id_num_ ;
                var Index_value = "Panel_Bookmark"+Bookmarklist_num;
                console.log("初始化中...    要修改的行的id，索引值： " + Index_name);
                console.log("初始化中...    要修改的列的值： " + Index_value);
                Update(mydb,Index_name,Index_value);//初始化时修改panel_bookmark_id的值
                // console.log(result);  
                console.log("data: before excute  " + Bookmarklist_num);
                Add_bookmark_scroll();
                Bookmarklist_num += 1;//与内层的同名变量互不影响
            cursor.continue();
        }else {
            console.log('读取数据库书签数据并生成完成!');
        }
    }

}

//初始化时修改数据，使删掉的空位得以补齐
function Update(mydb,Index_name,Index_value){
    var transaction = mydb.transaction('Bookmark_Note_DB','readwrite');
    var objStore = transaction.objectStore('Bookmark_Note_DB');
    // var index = objStore.index(Index_name);
    var request = objStore.get(Index_name);
    request.onsuccess=function(e){
        var Index_result =e.target.result;
        // console.log("before update the id of bookmark :"+Index_result);
        Index_result.panel_bookmark_id = Index_value;
        objStore.put(Index_result);
        var Index_result =e.target.result;//更新后结果
        console.log(Index_result);
        // console.log("after update the id of bookmark :"+Index_result);
    }
}

//查询ID，并传入remove 进行删除
function get_delete_data(mydb,Index_name,Index_value){
    console.log(Index_name,Index_value);
    var transaction = mydb.transaction('Bookmark_Note_DB','readwrite');
    var objStore = transaction.objectStore('Bookmark_Note_DB');
    // let promise_select = new Promise(function(resolve,reject){
    var index = objStore.index(Index_name);
    var request = index.get(Index_value);                 //按照id查询
    request.onsuccess=function(e){
            var Id_delete = e.target.result.id;
            Index_value = Id_delete;//将id 传入remove进行删除
            remove(mydb,Index_name,Index_value);
     };  
}


//删除数据：
function remove(mydb,Index_name,Index_value){
    var transaction = mydb.transaction('Bookmark_Note_DB','readwrite');
    var objStore = transaction.objectStore('Bookmark_Note_DB');
    // var index = objStore.index(Index_name);//列名
    var request = objStore.delete(Index_value);
    // console.log("remove data of bookmark :"+Index_value);
    request.onsuccess = function(e) {
        alert("成功此条删除数据。"+Index_value);
    };
}

//清除所有
function clear(mydb) {
    var transaction = mydb.transaction('Bookmark_Note_DB','readwrite');
    var objStore = transaction.objectStore('Bookmark_Note_DB');
    var request = objStore.clear();
    request.onsuccess = function(e) {
        alert("成功删除所有数据！！！");
    };  
}  

//利用索引查询：
// function byIndexGet(mydb){
//     var transaction = mydb.transaction('Bookmark_Note_DB','readwrite');
//     transaction.oncomplete = function(event) {};
//     transaction.onerror = function(event) {console.log("onerror");};
//     transaction.onabort = function(event){console.log("onabort");};
//     var objStore = transaction.objectStore('Bookmark_Note_DB');
//     var index = objStore.index('email');                //索引名
//     var request=index.get('liming1@email.com');         //通过索引值获取数据
//     request.onsuccess=function(e){
//         var student=e.target.result;
//         alert(student.name+"：索引查询");
//     }
// }



// IDBKeyRange.only("110");  
// IDBKeyRange.lowerBound("110", true);  
// IDBKeyRange.upperBound("110", false);  
// IDBKeyRange.bound("110", "120", false, true);

// function byCursorGetForRangeAndSort(mydb){
//     var transaction = mydb.transaction('Bookmark_Note_DB','readwrite');
//     transaction.oncomplete = function(event) {};
//     transaction.onerror = function(event) {console.log("onerror");};
//     transaction.onabort = function(event){console.log("onabort");};
//     var objStore = transaction.objectStore('Bookmark_Note_DB');
//     var range = IDBKeyRange.bound("110", "113", false, true);    
//     var request=objStore.openCursor(range,IDBCursor.NEXT);        
//     request.onsuccess = function(e){
//         var cursor1 = e.target.result;
//         if(cursor1){
//             alert(cursor1.value.name);
//             cursor1.continue();
//         }else {
//             alert('遍历完成');
//         }
//     }
// }

