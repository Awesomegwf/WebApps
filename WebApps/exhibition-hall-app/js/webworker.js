console.log("here is webworker");

importScripts("../fragmentjs/lunr.js");
importScripts("./dict.js");

function splitWords(words) {
    var start = 0, end = words.length - 1, result = [];
    while (start != end) {
        var str = [];
        for (var i = start; i <= (start+9); i++) {
            var s = words.substring(i, i + 1);
            // 如果是停止词，则跳过
            if (s in stop) {
                break;
            }
            str.push(s);
            // 如果在字典中，则添加到分词结果集
            if (str.join('') in dict) {
                result.push(str.join(''));
            }
        }

        start++;
    }

    return result;
}


//全文检索功能代码
function SearchReady(){
}

SearchReady.prototype ={
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
}; //end SearchReady Prototype



//全文检索类的调用
var Search = new SearchReady();
var iii = Search.indexModel();
// postMessage(iii.invertedIndex);

// var words = ["tom@kylin@905型“太仓”级补给船(北约代号福清级) ，为我国第一艘油水干货补给船。20世纪70年代初海军，为了完成远程运载火箭的发射保障任务，中国海军开始建造以“旅大”级导弹驱逐舰和“远望”1、2号测量船为主体的远洋测量保障船队，为了延长编队在远海区域活动的时间，同时开始研制我国第一型综合补给舰——“太仓”级综合补给舰，由大连造船厂负责设计建造。该舰较好地解决了油水补给的问题，但是在干货补给能力方面，由于当时技术水平限制，解决方案不够理想，单次干货输送能力不高，同时横向补给时的高海况适应能力不足，这也成为我国引进第二代补给舰的原因之一。",
// "jerry@kylin@052C型驱逐舰（北约代号：旅洋II级，英文：Luyang II），又通称兰州级驱逐舰，补给船是中国海军第一种安装四面有源相控阵雷达（“海之星”H/LJG346型）以及采用防空导弹舰载垂直发射系统的战舰，被外界称为“中华神盾”。与此相对比的是，美国海军现役62艘安装神盾系统的战舰采用的都是无源相控阵雷达，但下一代驱逐舰DDG-1000将也会装备主动有源相控阵雷达。首舰“兰州”号（舷号：170）于2005年9月服役，同级共有六艘。"];


//数据接受代码
var splitArray = [];
var documents = [];
var allInfoList = [];
onmessage = function(e){
    var  strfinal= e.data;
    // console.log(strfinal);
    for (var i = 0; i < strfinal.length; i++) {
        if (strfinal!="postover") {
            allInfoList.push(strfinal[i]);
        }
        
    }
    // console.log(allInfoList);
    if (strfinal=="postover") {
        console.log(allInfoList);
        for (var i = allInfoList.length-1;i >=0; i--) {
            var resultArray = allInfoList[i].split("@kylin@");
            // console.log(resultArray);
            var result = splitWords(resultArray[1]);
            var str = "";
            for (var j = result.length - 1; j >= 0; j--) {
                str=result[j]+" "+str;
            }
            var poststr = resultArray[0]+"@nudt@"+str;
            splitArray.push(poststr);
        }

        // console.log(splitArray);

        Search.alysResult(splitArray,documents);
        var idx = Search.createIdex(documents);

        var fiel = JSON.stringify(idx.fields);
        var invertedI = JSON.stringify(idx.invertedIndex);
        var tokenS = JSON.stringify(idx.tokenSet);
        var fieldV = JSON.stringify(idx.fieldVectors); 

        var finalMessage = fiel+"#@"+invertedI+"#@"+tokenS+"#@"+fieldV;

        postMessage(finalMessage);  
    }
    
}








