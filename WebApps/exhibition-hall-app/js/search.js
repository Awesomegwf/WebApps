//load search page, function is execued after loading the page

var isFilterShowed = false;
var rankSelected = null;
var birthplaceSelected = null;
var abbrSelected = null;

var isDocDisplayed = false;

var localRecordData = []; //局部档案数组，用来存储搜索到的档案数据
var localRecordIndex = 0; //局部档案索引，记录当前处理档案在localRecordData中的index


var gotoRecordID; //全局变量，用于档案查询和档案查看页面间档案ID的传递
var listStyle = false;//全局变量，默认为平铺

var isCollected = false;

var mescroll;

var audiosList = [];//全局变量，非人物档案音频播放

var isThingSearch = false;  //
var isPersonHallid = false; //判断是否为人物展厅的ｉｄ


$('#record-show').load("doc/doc-template.html", function() {
    $('#link-to-board').bind('click', gotoBoardByID);
});

$(document).on("pagebeforeshow", "#search", function() {
    for (var i = 0; i < personHallidList.length; i++) {
        if (hall==personHallidList[i]) {
            isPersonHallid=true;
            break;
        }else{
            isPersonHallid=false;
        }
    }

    if (isPersonHallid) {
        $("#currenthall #firstHallOption").text("人物展厅");
        $("#currenthall #secondHallOption").text("普通展厅");
        $('#currenthall option:eq(0)').attr('selected','selected');
        if(isDocDisplayed){
            // window.location.href = "#doc"
            setDocTextSize();
            $.mobile.changePage("#doc", {transition: "none"});
        } else 
        {
            $.mobile.changePage("#search", {transition: "none"});
        }
    }else{
        $("#currenthall #firstHallOption").text("普通展厅");
        $("#currenthall #secondHallOption").text("人物展厅");
        $('#currenthall option:eq(0)').attr('selected','selected');
        $.mobile.changePage("#search", {transition: "none"});
    }
});

$("#docBack").on('click', function() {
    isDocDisplayed = false;
})



//依据设置中的数值来设置DOC中文本显示大小
function setDocTextSize(){
    var fontsizeinc = getGlobalFontSizeInc();
    $('#doc-intro').css('font-size', 1+fontsizeinc+'em');
    $('.doc-table-td-desc').css('font-size', 1.5+fontsizeinc+'em');
}


$("#search").load('search.html', function(){

    $(document).on("pageshow", '#search', function() {

        for (var i = 0; i < personHallidList.length; i++) {
            if (hall == personHallidList[i]) {
                isPersonHallid=true;
                break;
            } else {
                isPersonHallid=false;
            }
        }
        
        if (isPersonHallid == false && $("#currenthall option:selected").text() == "普通展厅") {
            $("#search-text-input").val("");
            $("#filter-entry").hide();
        }else　if(isPersonHallid == true && $("#currenthall option:selected").text() == "人物展厅"){
            $("#search-text-input").val("");
            $("#filter-entry").show();
        }else if($("#currenthall option:selected").text()=="人物展厅"){
            $("#search-text-input").val("");
            $("#filter-entry").show();
        }else　if($("#currenthall option:selected").text()=="普通展厅"){
            $("#search-text-input").val("");
            $("#filter-entry").hide();
        }
    });


    $("#currenthall").change(function() {
        
        $("#record-div").height($("#search-result-area").height());
        $("#search-footer").text("中华人民解放军档案馆");

        if ($("#currenthall option:selected").text()=="普通展厅") {
            $('#record-div').empty();
            $("#filter-box").css("display","none");
            $("#search-text-input").val("");
            $("#filter-entry").hide();
        }else　if($("#currenthall option:selected").text()=="人物展厅"){
            $('#record-div').empty();
            $("#filter-box").css("display","none");
            $("#search-text-input").val("");
            $("#filter-entry").show();
            $("#filter-entry-img").attr("src", "icons/filter.png");
            isFilterShowed = false;
        } 
    });


    
    $('#style-switch').click(function() {
        if (!listStyle) {
            $('#list-style').attr("src", "icons/list.png");
            document.getElementById('search-css').href='css/search-list.css';

            if ($('#currenthall option:selected').text() == "普通展厅") {
                $(".record-short-text").css("display", "none");
            } else {
                $(".record-short-text").css("display", "inline");
            }
            listStyle = true;
        } else {
            $('#list-style').attr("src", "icons/tile.png");
            $('.record-short-text').css("display", "inline");
            document.getElementById('search-css').href='css/search-tile.css';
            listStyle = false;
        }
    });

    $("#filter-entry").click(function() {
        if(!isFilterShowed) {
            $("#filter-entry-img").attr("src", "icons/filter-hover.png");
            isFilterShowed = true;
        } else {
            $("#filter-entry-img").attr("src", "icons/filter.png");
            isFilterShowed = false;
        }

        if($("#filter-box").css("display") == "none") {
            $("#filter-box").slideDown(function(){
                $("#record-div").height($("#search-result-area").height()-$("#filter-box").height()-20);
            });
            //$("#opt1").slideDown();

        }else{
            $("#filter-box").slideUp(function(){
                $("#record-div").height($("#search-result-area").height());
            });

        }
    });

    var rankSpan = document.getElementsByClassName("rank");
    var birthplaceSpan = document.getElementsByClassName("birthplace");
    var abbrSpan = document.getElementsByClassName("abbr");



    /* 条件筛选下拉菜单处理 */
    for(var i = 0; i < rankSpan.length; i++) {
        rankSpan[i].isSelected = false;
        rankSpan[i].type = "rank";
        rankSpan[i].addEventListener("click", spanHandler, false);



    }

    for(var i = 0; i < birthplaceSpan.length; i++) {
        birthplaceSpan[i].isSelected = false;
        birthplaceSpan[i].type = "birthplace";
        birthplaceSpan[i].addEventListener("click", spanHandler, false);

    }

    for(var i = 0; i < abbrSpan.length; i++) {
        abbrSpan[i].isSelected = false;
        abbrSpan[i].type = "abbr";
        abbrSpan[i].addEventListener("click", spanHandler, false);

    }

    

    

    $("#search-confirm").click(function(){
        //添加判断确定用哪种方式进行搜索
        if ($("#currenthall option:selected").text() == "普通展厅") {
            if (!finalIdx) {
                alert("索引文件尚未准备好！请稍后再试");
            }
            thingSearch(finalIdx);
        } else　if ($("#currenthall option:selected").text() == "人物展厅"){
            searchRecords();
        } else {
            thingSearch(finalIdx);
        } 

    });


    mescroll = new MeScroll("record-div", {
        down: {
            use: false,
            auto: false,
            callback: function() {
            }
        },
        up: {
            use: true,
            auto: false,
            offset: 20,
            callback: function() {
                if ($("#currenthall option:selected").text() == "人物展厅") {
                    recordCount = 0;
                    mescroll.lockUpScroll(true);
                    createRecordThumbs();
                }
                
            }
        }
    });


});

var recordCount = 0;    //用来记录每次加载


/* 创建搜索档案出来的小图标 */
function createRecordThumbs(){
    var p =new Promise(function (resolve,reject) {
        if (localRecordIndex >= localRecordData.length || recordCount >= 18) {
              
              $("body").mLoading("hide");
              $("#search-footer").text("搜索到记录 " + localRecordData.length + " 条");

              mescroll.endSuccess();
              mescroll.lockUpScroll(false);
              reject('genetate all record thumbs!');

        } else {
            var req = sdcard.get(localRecordData[localRecordIndex].records_img);
            req.onsuccess = function () {

                var file = this.result;
                var recordDiv = document.createElement('div');
                var img = document.createElement('img');

                recordDiv.setAttribute("class", "tile");
                recordDiv.setAttribute("records-id", localRecordData[localRecordIndex].records_id);

                recordDiv.addEventListener("click", function(){
                    isDocDisplayed = true;
                    $.mobile.changePage("#doc", {transition: "none"});
                    var text = $("#search-text-input").val();
                    viewRecord(this.getAttribute('records-id'),text);
                    findRecord(this.getAttribute('records-id'));
                });

                var description = localRecordData[localRecordIndex].text;

                if (description.length > 160) {
                    description = description.substring(0,160) + "...";
                }

                if (listStyle) {
                    recordDiv.innerHTML = "<div class='record-thumbnail-container'><img class = 'record-thumbnail' src='" + URL.createObjectURL(file) + "'/></div> " + "<p class='record-short-text'>" + localRecordData[localRecordIndex].records_name + "</p>" + "<p  class='record-long-text'>" + description + "</p>";
                    $('#record-div').append(recordDiv);
                }

                if (!listStyle) {
                    recordDiv.innerHTML = "<div class='record-thumbnail-container'><img class = 'record-thumbnail' src='" + URL.createObjectURL(file) + "'/></div> " + "<p class='record-short-text'>" + localRecordData[localRecordIndex].records_name + "</p>" + "<p  class='record-long-text'>" + description + "</p>";
                    $('#record-div').append(recordDiv);
                }

                resolve(localRecordIndex);
            };

            req.onerror = function () {
                resolve(localRecordIndex);
            }
        }
    });

    p.then(function(index){
        //alert(index);
        localRecordIndex = localRecordIndex+1;
        recordCount = recordCount + 1;
        return createRecordThumbs();
    });
}


var docPhotoList; //档案首页图片列表，从档案json文件中获取

var docIndex = 0; //档案编号
var docPhotoIndex = 0; //一份档案有多张图片，标识档案中某张图片的index

var fancyboxPhotoIndex = 0;
var fancyboxPhotos = []; //档案所有图片列表

var audioIndex = 0;
var docAudioList = [];
var scList =[];

function findRecord(recordID, text) {
    var result = recordsList.find(function(x) {
        return x.records_id == recordID;
    });


}


function viewRecord(recordID,searchText){
    var transaction = dbGlob.db.transaction("records", 'readwrite');
    var store = transaction.objectStore("records");

    fancyboxPhotos = [];
    docAudioList = [];
    audioIndex = 0;

    docIndex = 0;
    docPhotoIndex = 0; //一份档案有多张图片，标识档案中某张图片的index
    fancyboxPhotoIndex = 0;

    var req = store.get(recordID);
    String.prototype.replaceAll = function(s1,s2){    
        return this.replace(new RegExp(s1,"gm"),s2);    
    }
    req.onsuccess = function(event){
        var record = event.target.result;
        if(record){
            if (record.panel_id==null||record.panel_id==""||record.panel_id==undefined) {
                $('#link-to-board').hide();
            }else{
                $('#link-to-board').show();
                $('#link-to-board').attr('boards-id', record.panel_id);
                $('#link-to-board').attr('halls-id', record.hall_id);
            }
            //动态填充档案档案查看页面
            $('#doc-intro').empty(); 
            var recordText = record.text.replaceAll("　　", "<br><div class='doc-table-td-desc-textIndex'></div>");
            if(searchText!=null && searchText!=undefined && searchText!='')
                $('#doc-intro').html(recordText.replaceAll(searchText, "<span style='color: red;'>"+searchText+"</span>"));
            else
                $('#doc-intro').html(recordText);
            $('#doc-name').empty();$('#doc-name').html(record.records_name);

            $('#doc-photo').attr('src', "#");

            docPhotoList = record.items;

            $('#doc-images-div-table').empty();

            var photoreq = sdcard.get(record.records_img);
            photoreq.onsuccess = function(event) {
                var file = event.target.result;
                var url = URL.createObjectURL(file);
                $('#doc-photo').attr('src', url);
                $('#doc-photo').addClass('imageanchor');
                $('#doc-photo').attr('fancyboxindex', fancyboxPhotoIndex);
                fancyboxPhotoIndex++;
                fancyboxPhotos.push({
                    src  : url,
                    opts : {
                        caption : "",
                        docindex: 0
                    }
                });
                createDocPhotoTable();
            }

            if(record.audio == "") {
                docAudioList.push('');
                createDocAudioTable();
            } else {
                var audioreq = sdcard.get(record.audio);
                audioreq.onsuccess = function(event) {  
                    var file = event.target.result;
                    var url = URL.createObjectURL(file);
                    docAudioList.push(url);
                    createDocAudioTable();
                };

                audioreq.onerror = function(event) {
                    var file = event.target.result;
                    docAudioList.push('');
                    createDocAudioTable();
                };
            }
            // //产生档案图片内容
            // photoIndex = 0;
            // docPhotoList = record.items;
            // $('#doc-images-div-table').empty();
            // createDocPhotoTable();
        }

        //产生档案图片内容

        
        
        
        setFavouriteEntryImage_record(record.records_id);
    };
    req.onerror = function(event){
        var record = event.target.result;
    };


}

/**
 * 递归为每份人物档案生成fancybox展示, 要求所有档案图片必须顺序编号
 */
function createDocPhotoTable(){
    var p = new Promise(function (resolve,reject) {
        if(docIndex>=docPhotoList.length) {
            // var tdList = $(".fileSc");
            // for (var i = 0;i<tdList.length;i++){
            //     tdList[i].addEventListener("click",scClickHandler);
            // }
            reject('get all doc photos!');
            // 调整table div块离顶端的高度, 不然显示有重叠（笨办法，Long Peng）
            // var heightportrait = $('#doc-portrait').height();
            // var heightintro = $('#doc-intro').height();
            // $('#doc-images-div').css('top', ((heightportrait>heightintro? heightportrait:heightintro)+50)+'px');
            //alert(fancyboxPhotos);
            $('.imageanchor').off('click').on('click', function(){
                var idx = parseInt($(this).attr('fancyboxindex'));

                //将audioIndex作为previous index
                audioIndex = -1;

                $.fancybox.open(fancyboxPhotos, {
                    loop : false,
                    afterClose: function() {
                        $('#doc-audio')[0].pause();
                    },
                    afterShow : function( instance, current ) {

                        var docAudio = $('#doc-audio')[0];
                        var source = docAudio.children[0];

                        var currentDocIndex = current.opts.docindex;

                        if(audioIndex != currentDocIndex){
                            docAudio.pause();
                            audioIndex = currentDocIndex;
                            if(docAudioList[audioIndex] != ''){
                                source.src = docAudioList[audioIndex];
                                docAudio.load();
                                docAudio.play();
                            }
                        }
                    },
                    buttons : [
                        'thumbs',
                        'close'
                    ]
                }, idx);
            });
            //改变字体大小
            setDocTextSize();
        }else{
            var wjnpath = docPhotoList[docIndex].wjm;
            if(wjnpath == null || wjnpath == "" || wjnpath == undefined){
                docPhotoIndex = 99; //直接跳到下一份档案
                resolve(docIndex); //continue to handle next doc
            }else{
                var wjpaths = wjnpath.split('/');
                var wjname = wjpaths[wjpaths.length-1];

                var wjnames = wjname.split('.');

                wjnames[0] = padding(parseInt(wjnames[0])+docPhotoIndex, wjnames[0].length, '0') ;//重新生成档案图片文件名，遍历1~99
                wjname = wjnames.join('.');

                wjpaths[wjpaths.length-1] = wjname;
                wjnpath = wjpaths.join('/');

                //alert(wjnpath);

                var request = sdcard.get(wjnpath);


                request.onsuccess = function () {
                    var file = this.result;
                    var imgIcon_path = "icons/mulimg.png";

                    var brText = docPhotoList[docIndex].smc.replaceAll("　　", "<br><div class='doc-table-td-desc-textIndex'></div>");

                    //只在页面当中显示人物档案第一张
                    if(docPhotoIndex == 0){
                        $('#doc-images-div-table').append(
                            "<tr>"+

                            "<td class='doc-table-td-image'>"+
                            "<img class='imageanchor' fancyboxindex='" + fancyboxPhotoIndex + "' src='"+ URL.createObjectURL(file) + "'/>"+"<img class='imgicon' id='"+docIndex+"' src='"+ imgIcon_path + "'/>"+
                            "</td>"+
                            "<td class='doc-table-td-desc'>"+
                            brText+
                            "</td>"+
                            "</tr>"
                        );
                    }

                    if(docPhotoIndex >= 1){
                        $("#"+docIndex).css("display","inline");
                    }

                    fancyboxPhotoIndex++;

                    fancyboxPhotos.push(
                        {
                            src  : URL.createObjectURL(file),
                            opts : {
                                caption : brText,
                                docindex: (docIndex+1)
                            }
                        });

                    scList.push(
                        {
                            path:docPhotoList[docIndex].wjm,
                            smc:docPhotoList[docIndex].smc,
                            audio:docPhotoList[docIndex].audio
                        }
                    );
                    //alert(fBoardsDivList[idx].innerHTML);
                    resolve(docIndex);
                };
                //error when reading pciture file, continue to read next one.
                request.onerror = function () {
                    docPhotoIndex = 99; //结束查找档案图片，要求所有档案图片必须顺序编号
                    resolve(docIndex);
                };
            }

        }
    });

    p.then(function(index){
        //alert(index);
        if(docPhotoIndex<99){ //每份档案最多99页图片
            docPhotoIndex++;
        }else{
            docIndex++;
            docPhotoIndex = 0;
        }

        return createDocPhotoTable();
    });
}


/* 依据boardid 转到展板，boardid通过属性可以获取 */
function gotoBoardByID(){

    var boardid = $(this).attr('boards-id');
    var hallid  = $(this).attr('halls-id');

    if (boardid == null || boardid == undefined || boardid == "") {
    } else {
        switchHall(hallid);
        switchToBoardByID(boardid);
    }

}




var scResult ="";
function scClickHandler(e){
    scResult = e.target;
    var indexSc = parseInt(scResult.id);
    var transactionImg = dbGlob.db.transaction(['favorites_img'], 'readwrite');
    var storeImg = transactionImg.objectStore('favorites_img');
    var request = storeImg.get(scList[indexSc].path);
    request.onsuccess = function (ev) {
        if (ev.target.favorites_img_path==""||ev.target.favorites_img_path==undefined||ev.target.favorites_img_path==null){
            var transactionInsert = dbGlob.db.transaction(['favorites_img'], 'readwrite');
            var storeInsert = transactionInsert.objectStore('favorites_img');
            var requestImg = storeInsert.put({
                "favorites_img_path": scList[indexSc].path,
                "favorites_img_smc": scList[indexSc].smc,
                "favorites_img_audio": scList[indexSc].audio
            });
            requestImg.onsuccess = function(event){
                scResult.innerHTML="已经收藏";
                isCollected = true;
            }
        }
    }
    request.error = function () {

    }
}



/* 获取人物档案档案音频 */
function createDocAudioTable() {
    var promise = new Promise(function(resolve, reject){
        if(audioIndex >= docPhotoList.length){
            reject("get all doc audios");
        }
        else {
                if(docPhotoList[audioIndex].audio == ""){
                    docAudioList.push("");
                    resolve(audioIndex);
                } else {
                    var request = sdcard.get(docPhotoList[audioIndex].audio);
                    request.onsuccess = function() {                        
                        var file = this.result;
                        docAudioList.push(URL.createObjectURL(file));
                        resolve(audioIndex);
                    };

                    request.onerror = function() {
                        docAudioList.push(""); //when there is some problem with the audio file for the picture, put "" in the audio list
                        resolve(audioIndex); //continue to parse next audio
                    };
                }
        }
    });

    promise.then(function(index){
        audioIndex = ++audioIndex;
        return createDocAudioTable();
    });
}


function spanHandler(e) {

    if(!e.target.isSelected) {
        e.target.style.backgroundColor = "#A40000";
        e.target.style.color = "#FFFEFE";
        e.target.isSelected = true;
        if(e.target.type == "rank" && rankSelected != null) {
            rankSelected.style.color = null;
            rankSelected.style.backgroundColor = null;
            rankSelected.isSelected = false;
            rankSelected = e.target;
        } else if(e.target.type == "rank" && rankSelected == null){
            rankSelected = e.target;
        } else if(e.target.type == "birthplace" && birthplaceSelected != null) {
            birthplaceSelected.style.color = null;
            birthplaceSelected.style.backgroundColor = null;
            birthplaceSelected.isSelected = false;
            birthplaceSelected = e.target;
        } else if(e.target.type == "birthplace" && birthplaceSelected == null) {
            birthplaceSelected = e.target;
        } else if(e.target.type == "abbr" && abbrSelected != null) {
            abbrSelected.style.color = null;
            abbrSelected.style.backgroundColor = null;
            abbrSelected.isSelected = false;
            abbrSelected = e.target;
        } else if(e.target.type == "abbr" && abbrSelected == null){
            abbrSelected = e.target;
        }

    } else {
        e.target.style.backgroundColor = null;
        e.target.style.color = null;
        e.target.isSelected = false;
        if(e.target.type == "rank") {
            rankSelected = null;
        } else if(e.target.type == "birthplace") {
            birthplaceSelected = null;
        } else if(e.target.type == "abbr") {
            abbrSelected = null;
        }
    }

    searchRecords();
}



function searchRecords() {
    /* 实现搜索遮罩层 */
    $("body").mLoading(
        {
            text:"正在搜索...",
            mask: true,
        }
    );
    //$("body").mLoading("show");


    rank = null;
    if(abbrSelected)
        var abbr = abbrSelected.innerHTML;
    if(rankSelected)
        var rank = rankSelected.innerHTML;
    if(birthplaceSelected)
        var birthplace = birthplaceSelected.innerHTML;

    localRecordData = [];

    $('#record-div').empty();

    var searchText = $("#search-text-input").val();

    if (!abbrSelected && !rankSelected && !birthplaceSelected && searchText=='') {
        rank = '元帅';
    }

    
    for (var i=0; i < recordsList.length; i++) {
        var match = true;

         if (rank && rank != recordsList[i].rank && match) {
            match = false;
            continue;
         }

         if (birthplaceSelected && birthplace != recordsList[i].birthplace && match) {
            match = false;
            continue;
         }

         if (abbrSelected && abbr != recordsList[i].abbr && match) {
            match = false;
            continue;
         }

         if (recordsList[i].text.indexOf(searchText) < 0 && match) {
            match = false;
            continue;
         }

        if (match == true) {
            localRecordData.push(recordsList[i]);
        }



    }

    localRecordIndex = 0;
    recordCount = 0;
    mescroll.lockUpScroll(true);
    createRecordThumbs();
    //alert("search done");
}

var recordsId = 0;
function  setFavouriteEntryImage_record(records_id){
    recordsId = records_id;
    var transaction = dbGlob.db.transaction(['favorites_record'], 'readwrite');
    var store = transaction.objectStore('favorites_record');
    var request = store.get(records_id);

    request.onsuccess = function(e){
        var frecord = e.target.result;
        if (frecord) {
            document.getElementById("favorites-record-entry-img").src = 'icons/saved.png';
            document.getElementById("favorites-record-entry-img").removeEventListener("click",clickH);
        }else{
            document.getElementById("favorites-record-entry-img").src = 'icons/favorites-entry.png';
            document.getElementById("favorites-record-entry-img").addEventListener("click",clickH);
        }
    }
    request.error=function(){
        document.getElementById("favorites-record-entry-img").src = 'icons/favorites-entry.png';
        document.getElementById("favorites-record-entry-img").addEventListener("click",clickH);
    }
};//end


function clickH(){
    var transaction = dbGlob.db.transaction(['records'], 'readwrite');
    var store = transaction.objectStore('records');
    var request = store.get(recordsId);

    request.onsuccess = function(e) {
            var record = e.target.result;
            var rbtransaction = dbGlob.db.transaction(['favorites_record'], 'readwrite');
            var rbstore = rbtransaction.objectStore('favorites_record');
            var rrequest = rbstore.put({
                "favorites_record_id": record.records_id,
                "favorites_record_name" : record.records_name,
                "favorites_record_path" : record.records_img,
            });
            rrequest.onsuccess = function(event){
                    document.getElementById("favorites-record-entry-img").src = 'icons/saved.png';
                    $(".popwindow").slideDown().delay(1000).slideUp();
                    document.getElementById("favorites-record-entry-img").removeEventListener("click",clickH);
                    isCollected = true;
                    
            }
    }
}


function padding(number, length, prefix) {
    if(String(number).length >= length){
        return String(number);
    }
    return padding(prefix+number, length, prefix);
}


//非人物档案搜索

// var allFilesList = [];
var allRecordList = [];
var searchRecordList = [];

var otherRecordFancyboxResouce = []; //一份非人物档案的资源数组, 用于Fancybox展示

function getAllFiles(path,otherFileList){
    return new Promise(function(resolve,reject){
      var request = sdcard.enumerate(path);
      request.onsuccess = function(){
        var file = this.result;
        var file_ = file;
        if (file) {
            otherFileList.push(file_);
            this.continue();
        } else {
            resolve(otherFileList);
        }
      }
    }); 
}

function getAllRecord(jsonObj,otherRecordlist){
    for (var i = 0; i < jsonObj.length; i++) {
        var thingRecordObj = {
                wjm: null,
                smc: null,
                filePath: null,
                image: null,
                otherRecordAudio: null, //档案的背景解说词语
                files:[]
        };
        
        thingRecordObj.wjm = jsonObj[i].wjm;
        thingRecordObj.smc = jsonObj[i].smc;
        thingRecordObj.filePath = jsonObj[i].fileDirPath;
        thingRecordObj.image = null;
        otherRecordlist.push(thingRecordObj);
    }
}



function bindRecordAndFiles(otherRecordlist,otherFileList){

    for (var i = 0; i < otherRecordlist.length; i++) {
        var flag = false;

        for (var j = 0; j < otherFileList.length; j++) {
            if(otherFileList[j].name.indexOf(otherRecordlist[i].wjm.slice(-8)+".mp3")!=-1){
                otherRecordlist[i].otherRecordAudio = otherFileList[j];
            }
            else if (otherFileList[j].name.indexOf(otherRecordlist[i].wjm.slice(-8,-2)) != -1) {
                otherRecordlist[i].files.push(otherFileList[j]) ;            //fancybox
                
                if(flag == false && otherFileList[j].type.indexOf("image") != -1 && (otherFileList[j].name.indexOf("01.jpg") != -1)) {
                    otherRecordlist[i].image = otherFileList[j];
                    flag = true;
                }
            }
        }

        if (!flag) { 
            otherRecordlist[i].image = fileDefault;
        }
        if (otherRecordlist[i].files.length == 0) {
            otherRecordlist[i].files.push(fileDefault);
        }

        otherRecordlist[i].files.sort(function(file1, file2){
            if (file1.name < file2.name) return -1;
            if (file1.name > file2.name) return 1;
            return 0;
        });

    }
}




//search record result 
function getSearchRecord(searchList){
    
    for (var i = 0; i < searchList.length; i++) { 
        for (var j = 0; j < allRecordList.length; j++) {
            if(allRecordList[j].wjm == searchList[i].ref){
                searchRecordList.push(allRecordList[j]);
            }
        }
    }
}

//display the record result
function viewSearchRecords() {
    if (searchRecordList.length > 0) {
        for (var i = 0; i < searchRecordList.length; i++) {
            if (searchRecordList[i].files.length !=0 ) {
                createThumbnails(searchRecordList[i].wjm, searchRecordList[i].smc, searchRecordList[i].image, searchRecordList[i].files.length);
            }
        }
    }

    $("#search-footer").text("搜索到记录 " + searchRecordList.length + " 条"); 
}

/***********************************************************************
* recordsFile:all files of the record
* displayFile:the image of the record
* smc:the smc of the record
*
*************************************************************************/

function createThumbnails(wjm, smc, displayFile, fileCount)
{
    var recordDiv = document.createElement('div');
    recordDiv.setAttribute("class", "record-instance");
    recordDiv.setAttribute("recordsName", wjm);
    recordDiv.addEventListener("click", viewOtherRecord); //点击查看非人物档案详情

    var longDescription = '';
    var shortDescription = '';

    if (smc.length > 160) {
        longDescription = smc.substring(0, 160) + '...';
    } else{
        longDescription = smc.substring(0);
    }
    if (smc.length > 8) {
        shortDescription = smc.substring(0, 8) + '...';
    }else{
        shortDescription = smc.substring(0);
    }

    $('#record-div').append(recordDiv);

    if (listStyle == true) {
        recordDiv.innerHTML = '';
        if (fileCount > 1) {
            recordDiv.innerHTML = "<div class='record-thumbnail-container'><img class = 'record-thumbnail' src='" + URL.createObjectURL(displayFile) + "'/><img src='icons/mulimg.png' class='multi-files'/></div> " + "<p class='record-short-text'>" + shortDescription + "</p>" + "<p  class='record-long-text'>" + longDescription + "</p>";
        } else {
            recordDiv.innerHTML = "<div class='record-thumbnail-container'><img class = 'record-thumbnail' src='" + URL.createObjectURL(displayFile) + "'/></div> " + "<p class='record-short-text'>" + shortDescription + "</p>" + "<p  class='record-long-text'>" + longDescription + "</p>";
        }

        $(".record-short-text").css("display", "none");
    }
    else {

        recordDiv.innerHTML = '';
        if (fileCount > 1) {
            recordDiv.innerHTML = "<div class='record-thumbnail-container'><img class = 'record-thumbnail' src='" + URL.createObjectURL(displayFile) + "'/><img src='icons/mulimg.png' class='multi-files'/></div> " + "<p class='record-short-text'>" + shortDescription + "</p>" + "<p  class='record-long-text'>" + longDescription + "</p>";
        } else {
            recordDiv.innerHTML = "<div class='record-thumbnail-container'><img class = 'record-thumbnail' src='" + URL.createObjectURL(displayFile) + "'/></div> " + "<p class='record-short-text'>" + shortDescription + "</p>" + "<p  class='record-long-text'>" + longDescription + "</p>";
        }

    }




}

//档案显示方式
function viewOtherRecord(e){
    otherRecordFancyboxResouce = [];
    
    var targetElement = e.target.parentNode.parentNode;
    var thisRecord = targetElement.attributes.recordsName.value;

    for (var i = 0; i < allRecordList.length; i++) {
        if (thisRecord == allRecordList[i].wjm) {
            if (allRecordList[i].otherRecordAudio != null) {
                var otherRecordAudio = $('#otherrecordaudio')[0];
                otherRecordAudio.src = URL.createObjectURL(allRecordList[i].otherRecordAudio);
                otherRecordAudio.load();
                otherRecordAudio.play();
            } else {
                var otherRecordAudio = $('#otherrecordaudio')[0];
                otherRecordAudio.src = null;
            }
            var thisFiles = allRecordList[i].files;
            for (var j = 0; j < thisFiles.length; j++) {
                if (thisFiles[j].type.indexOf("audio") != -1) {
                    otherRecordFancyboxResouce.push({
                        type : 'audio',
                        src  : URL.createObjectURL(thisFiles[j]),
                        opts : {
                            caption :allRecordList[i].smc,
                            audioFormat: 'audio/mpeg',
                            beforeShow : function( instance, current ) {

                                /* 暂停背景音乐 */
                                backgroundMusic.pause();
                                var otherRecordAudio = $('#otherrecordaudio')[0];
                                if(otherRecordAudio.src)
                                    otherRecordAudio.pause();
                            },
                            beforeClose: function(instance, current){

                                if (backgroundMusic.paused)
                                    backgroundMusic.play();

                            }
                        }
                    });
                }
                
                else if( (thisFiles[j].type.indexOf("image") != -1) ) {
                    otherRecordFancyboxResouce.push({
                        type : 'image',
                        src  : URL.createObjectURL(thisFiles[j]),
                        opts : {
                            caption: allRecordList[i].smc,
                            beforeShow: function (instance, current) {
                                /* 打开背景音乐和解说音播放 */
                                if (backgroundMusic.paused)
                                    backgroundMusic.play();
                                var otherRecordAudio = $('#otherrecordaudio')[0];
                                if (otherRecordAudio.src && otherRecordAudio.paused)
                                    otherRecordAudio.play();


                            },
                            beforeClose: function (instance, current) {
                                var otherRecordAudio = $('#otherrecordaudio')[0];
                                if(otherRecordAudio.src) {
                                    otherRecordAudio.pause();
                                    otherRecordAudio.src = null;
                                }
                            }
                        }
                    });
                }

                else if (thisFiles[j].type.indexOf("video")!=-1) {
                    otherRecordFancyboxResouce.push({
                        type : 'video',
                        src  : URL.createObjectURL(thisFiles[j]),
                        opts : {
                            caption :allRecordList[i].smc,
                            videoFormat: 'video/mp4',
                            beforeShow : function( instance, current ) {

                                /* 暂停背景音乐 */
                                backgroundMusic.pause();
                                var otherRecordAudio = $('#otherrecordaudio')[0];
                                if(otherRecordAudio.src) {
                                    otherRecordAudio.pause();
                                }
                            },
                            beforeClose: function(instance, current){

                                if (backgroundMusic.paused)
                                    backgroundMusic.play();

                            }
                        }
                    });
                };
            };
            break;
        }
    }

    if(otherRecordFancyboxResouce.length > 0) {
        $.fancybox.open(otherRecordFancyboxResouce,{
            'loop' : false,
            'buttons' : [
                'close'
            ]

        });
    }

    
}


//执行搜索功能
function thingSearch(idx) {
    searchRecordList = [];
    $("#record-div").html("");
    var keywords =  $("#search-text-input").val();
    var resultSearch = idx.search(keywords);
    getSearchRecord(resultSearch);
    console.log("搜索到记录 " + searchRecordList.length + " 条");
    viewSearchRecords();
    isThingSearch = true;
}

$("#search-text-input").addEventListener("onfocus",function (ev) {
    $("#record-div").css("height","auto");
});