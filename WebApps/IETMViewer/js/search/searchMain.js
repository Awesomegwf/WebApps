/**
 *全文检索功能
 */
function SearchReady(){

}
SearchReady.prototype ={
    /**
     *启动webworker,并将worker对象（thread）返回,workerPath为webwork的脚本路径，
     *eg:“./webworker.js”
    */
    startWorker:function(workerPath){                    
        var thread;
        if(typeof(Worker)!=="undefined"){
            if(typeof(thread)=="undefined"){
                thread=new Worker(workerPath);
                return thread;
            }    
        }else{
            alert("Sorry, your browser does not support Web Workers...");
        }   
    },
    /**
     *关闭worker
    */
    stopWorker:function(thread){                        
        tread.terminate();
    },
    /**
     *发送要分词的段落，info是需要进行分词的段落info[i]=id+@kylin@+text
    */
    sendInfo:function(thread,info){                     
        // console.log(info);
        thread.postMessage(info);
    },
    /**
     *result存储返回分词结果，由resolve函数传递给下一个需要使用它的函数 
    */
    receiveInfo:function(thread,result){                               
    return new Promise(function(resolve,reject){
        thread.onmessage = function(event){
                result = event.data; 
                resolve(result); 
        }
    });  
    },
    /**
     *分析返回结果封装成对象存入documents数组
    */
    alysResult:function(result,documents){          
        for (var i = result.length - 1; i >= 0; i--) {
            var resultInfo = {};
            var spiltResult = result[i].split("@nudt@");
            resultInfo.name = spiltResult[0];
            resultInfo.text = spiltResult[1];
            documents.push(resultInfo);
        }
        // console.log(documents);
    },
    /**
     *创建索引
    */
    createIdex:function(documents){                          
        var idx = lunr(function () {
            this.ref('name')
            this.field('text')
            // this.metadataWhitelist = ['position']
            documents.forEach(function (doc) {
                this.add(doc);
            }, this)
        });
        return idx;
    },
    /**
     *将索引信息存储进入数据库,其中的uid是指所做用途的名称，比如“full”，指的是全文搜索功能的储存信息，
     *如果想要做单页标题定位等功能可以，可以取另一个名称存储。比如“single”。
    */
    saveIndex:function(idx,uid,db){                         
        return new Promise(function(resolve,reject){
            var fiel = JSON.stringify(idx.fields);
            var invertedI = JSON.stringify(idx.invertedIndex);
            var tokenS = JSON.stringify(idx.tokenSet);
            var fieldV = JSON.stringify(idx.fieldVectors);   
                                                                                 //利用数据库存储idx的fields
            var transactionIdx = db.transaction(['idx'],'readwrite');
            var storeIdx = transactionIdx.objectStore('idx');
            var requestIdx = storeIdx.put({
                "idx_id": uid,
                "fields": fiel,
                "invertedIndex":invertedI,
                "tokenSet":tokenS,
                "fieldVectors":fieldV
            });
            requestIdx.onsuccess = function(){
                resolve(" save ok!");
            }
        });   
    },
    /**
     *创建模板idx,用于复制数据库存储的索引信息
    */
    indexModel:function(){                                                   
        var documents = [
        {
           "name": "Lodash",
           "text": "A modern JavaScript utility library delivering modularity."
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
    },
    /**
     *idx为模板idx，必须使用模板idx，最终会返回一个promise,
     *表示已经从数据库读取数据并且将储存的索引信息复制给模板idx.
    */
    getNewIndex:function(idx,uid,db){                         
        var getpromise;
        var tokenS,invertedI,fiel,fieldV;
        return new Promise(function(resolve,reject){
            var transaction = db.transaction('idx', 'readwrite');
            var store = transaction.objectStore('idx');
            var request = store.get(uid);
            request.onsuccess = function(event) {
                var idxInfo = event.target.result;
                tokenS = idxInfo.tokenSet;
                invertedI = idxInfo.invertedIndex;
                fiel = idxInfo.fields;
                fieldV = idxInfo.fieldVectors;

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
                // console.log("FSFSSFDFS");
                // var temp = idx.search("系统 由于");
                // console.log(temp);
                resolve("here is ok");
            }
        });
    }
};


String.prototype.replaceAll = function(s1,s2){    
    return this.replace(new RegExp(s1,"gm"),s2);    
}


/**
 *以下代码是我自己对于SearchReady对象的实例化调用，目的是为了实现全文检索功能
 *其他开发人员可以利用该对象自行做搜索或者定位相关的功能
 */
$(document).ready(function(e) {
    var Search = new SearchReady();
    var workerPath = "js/search/webworker.js";
    // var words = ["tom@kylin@905型“太仓”级补给船(北约代号福清级)\n ，为我国第一艘油水干货补给船。20世纪70年代初海军，为了完成远程运载火箭的发射保障任务，中国海军开始建造以“旅大”级导弹驱逐舰和“远望”1、2号测量船为主体的远洋测量保障船队，为了延长编队在远海区域活动的时间，同时开始研制我国第一型综合补给舰——“太仓”级综合补给舰，由大连造船厂负责设计建造。该舰较好地解决了油水补给的问题，但是在干货补给能力方面，由于当时技术水平限制，解决方案不够理想，单次干货输送能力不高，同时横向补给时的高海况适应能力不足，这也成为我国引进第二代补给舰的原因之一。",
    // "jerry@kylin@052C型驱逐舰（北约代号：旅洋II级，英文：Luyang II），又通称兰州级驱逐舰，补给船是中国海军第一种安装四面有源相控阵雷达（“海之星”H/LJG346型）以及采用防空导弹舰载垂直发射系统的战舰，被外界称为“中华神盾”。与此相对比的是，美国海军现役62艘安装神盾系统的战舰采用的都是无源相控阵雷达，但下一代驱逐舰DDG-1000将也会装备主动有源相控阵雷达。首舰“兰州”号（舷号：170）于2005年9月服役，同级共有六艘。"];

    function createWords(){
        //遍历要储存的信息
        var wordsList = [];
        var contexList=$("#Page_content_div").find("*");
        console.log(contexList);
        for (var i = 0; i < contexList.length; i++) {
            var tempStr=contexList[i].textContent+'';
            tempStr=tempStr.replaceAll('\n','');
            tempStr=tempStr.replaceAll(' ','');
            tempStr=tempStr.replaceAll('\t','');
            if (tempStr!=null&&tempStr!=undefined&&tempStr!=" "&&contexList[i].id!=""&&contexList[i].innerHTML!=""&&contexList[i].innerHTML!="\n"&&contexList[i].innerHTML!="\t") {
                console.log("aa"+tempStr);
                wordsList.push(contexList[i].id+"@kylin@"+tempStr+"BB");
            }
            
        }
        console.log("context:");
        console.log(wordsList);
        return wordsList;
    };

    function getWords(){           //如果遍历太慢就考虑存入数据库
        //从数据库中取出words?  
        //结果返回words?
    };

    var words = createWords();
    // console.log(words);

    function fullSearchSave(workerPath,words){
        var resultWorker;
        var documents = [];
        var thread = Search.startWorker(workerPath);
        Search.sendInfo(thread,words);
        Search.receiveInfo(thread,resultWorker).then(function(r){
            Search.alysResult(r,documents);           //获取分词
            var idx = Search.createIdex(documents);   //使用分词
            Search.saveIndex(idx,"full",dbGlob.db).then(function(r){
                // console.log(r);
                var transaction = dbGlob.db.transaction('saveFlag', 'readwrite');
                var store = transaction.objectStore('saveFlag');
                var request = store.put({
                    "saveFlag_id": "full",
                    "saveFlag_state": "true"
                });
                request.onsuccess = function(){
                    console.log("标记成功");
                    var newidx = Search.indexModel();
                    Search.getNewIndex(newidx,"full",dbGlob.db).then(function(){
                        index = newidx;
                    });
                }
            });
        });
    }

    function FullSearchReady(workerPath,words){
        var transaction = dbGlob.db.transaction('saveFlag', 'readwrite');
        var store = transaction.objectStore('saveFlag');
        var request = store.get("full");
        request.onsuccess = function(event){
            var resultState = event.target.result;
            if (resultState==undefined) {
                // console.log("data is not saved");
                fullSearchSave(workerPath,words);
            }else{
                // console.log(resultState.saveFlag_state);
                if(resultState.saveFlag_state == "true"){
                    var newidx = Search.indexModel();
                    Search.getNewIndex(newidx,"full",dbGlob.db).then(function(){
                        index = newidx;
                    });
                }else if (resultState=="false") {
                    console.log("数据库里什么也没有");
                    fullSearchSave(workerPath,words);
                }else{
                    resultState.saveFlag_state =  "false";
                    store.put(resultState);
                }
            }
        } 
    }

    var index;
    function doSearch() {
        if (index ==undefined){
            alert("数据正在初始化");
        }else{
            var text = $("#search-text-input").val();
            var resultSearch = index.search(text);
            console.log(resultSearch);
            $("#showSearch").html("");
            for(var i=0;i<resultSearch.length;i++){
                $("#showSearch").append(
                    "<p>搜索结果所属id为:"+"<a href='#manual' class = 'idlink' title='"+resultSearch[i].ref+"'>"+resultSearch[i].ref+"</a>"+"</p>"
                );
            }
            var linkList = $('.idlink');
            for (var i = 0; i < linkList.length; i++) {
                linkList[i].addEventListener("click",function(e){
                    var hrefid="#"+e.target.title;
                    console.log(hrefid);
                    setTimeout(function(){
                        $("#manual").on("pageshow",function(){
                            window.location.hash = hrefid;
                            // $("#manual").animate({scrollTop:$(hrefid).offset().top},0);
                        })
                    },200)
                })
            }
        }
    }

    $("#searchButton").on("click",doSearch);

    initData(dbGlob.name,dbGlob.version).then(function(r){
        console.log(r);
            FullSearchReady(workerPath,words);
    });
});