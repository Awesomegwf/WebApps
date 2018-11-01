//public.js 
//文档模式，显隐菜单栏，书签块添加及跳转函数

var Choosen_mode = true;//书签功能判断页面模式,默认为滚动模式
var Bookmarklist_num = 0;//书签div块编号
var Id_num = 10000000;//id 的起始编号
var name = "Bookmark_Note_DB";//database name
var db_version = 1;//database version
//数据对应的模式及类型
var Pa_m = "page_mode";
var Sc_m = "scroll_mode";
var Bo_t = "bookmark_type";
var No_t = "note_type";
var Doc_num;//文档编号
var Pa_Bm_id;//面板书签小块的id
var Panel_bookmark_id;//面板书签列表书签块id
var bookmark;//get the element in bookmarklist
// top and bottom
var header_pullDownMenu = document.getElementById("doc_content_header_pop");
var footer_pullDownMenu = document.getElementById("doc_content_footer_pop");
var wenzi = "禽啭于春，蛩啼于秋，蚊作雷于夏，夜则虫醒而鸟睡，风雨并不天天有，无来 人犬不吠，不下蛋鸡不报。唯有人用语言，用动作，用机械，随时随地做出声音。 就是独处一室，无与酬答的时候，他可以开留声机，听无线电，甚至睡眠时还发出 似雷的鼻息。语言当然不就是声音，但是在不中听，不愿听，或者隔着墙壁和距离听不真的语言里，文字都丧失圭角和轮廓，变成一团忽涨忽缩的喧闹，跟鸡明犬 吠同样缺乏意义。这就是所谓“人籁”!断送了睡眠，震断了思想,培养了神经衰弱";

// let promise_select = new Promise(function(resolve,reject){});
//     promise_select.then(function(){});

//Show top/bottom menu
function Show_header_footer_menu(){
    $("#doc_content_header_pop,#doc_content_footer_pop").show();
}
function Hide_header_footer_menu(){
    $("#doc_content_header_pop,#doc_content_footer_pop").hide();
}


//固定上下栏菜单
window.onload = function(){
    menuFixed('doc_content_header_pop');
    menuFixed('doc_content_footer_pop');
}
function menuFixed(id){
    var obj = document.getElementById(id);
    var objHeight = obj.offsetTop;

    window.onscroll = function(){
        var obj = document.getElementById(id);
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop < objHeight){
            obj.style.position = 'relative';
        }else{
            obj.style.position = 'fixed';
        }
    }
}



// doc create,scroll/page mode  已无用，分页和滚动模式用
//scroll  先不做
function Create_scroll_mode(e){
    $('#Page_content_div').empty();
    for(var Each_doc_div_num = 0,Inner_doc_id_num=3000; Each_doc_div_num<= 36;Each_doc_div_num++,Inner_doc_id_num++){
        var Doc_id = "Doc_0001";
        var Inner_doc_div = document.createElement('div');
        var Inner_doc_div_id = "Inner_page"+Inner_doc_id_num;
        Inner_doc_div.setAttribute('id', Inner_doc_div_id);
        var Goudan_scroll = "#"+Inner_doc_div_id;
        $('#Page_content_div').append(Inner_doc_div);
        $(Goudan_scroll).append("<div>"+Doc_id+"#"+Inner_doc_div_id+"_"+Each_doc_div_num+" :"+wenzi+"</div>");
    };
    //block page mode switch area   
    $("#Previous_page,#Next_page").hide();
}
//page 先不做
function Create_page_mode(e){
    $('#Page_content_div').empty();
    var Val_length = $('#Page_content_div').text().length;
    for(var Page_num =0, Page_id_num =1000; Page_num <=10; Page_id_num ++,Page_num ++){
        var Page_id = "Page"+Page_id_num;
        var Doc_page_div = document.createElement('div');
        var Inner_page_div = document.createElement('div');
        var goudan_id = "#"+Page_id;            
        Doc_page_div.setAttribute('id', Page_id);         
        $('#Page_content_div').append(Doc_page_div);
        $(Doc_page_div.id).append(Inner_page_div);
        if(Page_num >0){
            $(goudan_id).css("display","none");
        };
        // 往页内填充内容，直到填满，此处暂用5个div块来代替，后期此处换成单字填充
        for(var Each_page_div_num = 0,Inner_page_id_num=2000; Each_page_div_num<5;Each_page_div_num++,Inner_page_id_num++){
            var Inner_page_div_id = "Inner_page"+Inner_page_id_num;
            Inner_page_div.setAttribute('id', Inner_page_div_id);
            $(goudan_id).append("<div>"+Page_id+"#"+Each_page_div_num+" :"+wenzi+"</div>");
        };
        var Val_length_page = $(goudan_id).text().length;//word count of this page
        var Val_length_doc = $('#Page_content_div').text().length;//word count of the whole document
        console.log(Doc_page_div.id + 'page mode: create and fill up finished!');
    };
    //show page switch area 
    $("#Previous_page,#Next_page").show();
};




//创建书签栏小div块
function CreatePanelBookmark_div(){
    if(Choosen_mode){  
        Panel_bookmark_id_ = Add_bookmark_scroll();//获取两个模式中添加的书签小div 的id 的返回值
        return Panel_bookmark_id_;
    }else{
        Panel_bookmark_id_ = Add_bookmark_page();
        return Panel_bookmark_id_;
    };
    return Panel_bookmark_id_;
}

//翻页模式的书签块添加函数  先不做
function Add_bookmark_page(){
    var Bookmarklist_id = "Panel_Bookmark"+Bookmarklist_num;//panel上显示用的
    var Note_Bookmark_div = document.createElement('div');
    Note_Bookmark_div.setAttribute('id',Bookmarklist_id);//书签小div块的id
    Note_Bookmark_div.setAttribute('name',"Bookmark");
    $("#bookmark-root").append(Note_Bookmark_div);
    console.log(Note_Bookmark_div.id);
    var bookmark_div_id = "#"+Bookmarklist_id;
    $(bookmark_div_id).css({"background-color":"#FFCCCC",
                    "height":"10%",
                    "font-size": "1.6em"
    });
    $(bookmark_div_id).append("<p>"+'bookmark'+Bookmarklist_num+': '+bookmark_div_id+"</p>");
    Bookmarklist_num++;
    console.log("add bookmark: "+Bookmarklist_id+" succeed!" );
    return Bookmarklist_id;
}


//滚动模式的书签块添加函数
function Add_bookmark_scroll(){
    var Bookmarklist_id = "Panel_Bookmark"+Bookmarklist_num;
    var Note_Bookmark_div = document.createElement('div');
    Note_Bookmark_div.setAttribute('id',Bookmarklist_id);//书签小div块的id    
    Note_Bookmark_div.setAttribute('name',"Bookmark");
    $("#bookmark-root").append(Note_Bookmark_div);
    var bookmark_div_id = "#"+Bookmarklist_id;
    $(bookmark_div_id).css({"background-color":"#FFCCCC",
                    "height":"10%",
                    "font-size": "1.5em",
    });//seting the style of bookmark div
    $(bookmark_div_id).append("<p>"+'bookmark'+Bookmarklist_num+': '+bookmark_div_id+"</p>");
    console.log("书签块当前系数 ："+Bookmarklist_num);
    Bookmarklist_num+=1;
    // console.log("add bookmark: "+Bookmarklist_id+" succeed!" );
    return Bookmarklist_id;
}

//get id of top element
function Get_id(){
    var position_x = 430;
    var position_y = 15;
    var Id = document.caretPositionFromPoint(position_x,position_y).offsetNode.id;
    if((Id == undefined) || (Id == null)){
        position_x =20;
        var Id = document.caretPositionFromPoint(position_x,position_y).offsetNode.parentElement.id;
        console.log("parent id:"+Id);
    };
    return Id;
} 

// 书签的跳转函数 
function Jump_to_doc(e) {
    var jump = "#"+e;
    console.log("要跳转的位置id :"+e);
    location.href = jump;
}

// confirm delete or cancel 先不做
function confirm(){
    $("#confirm_delete").bind("click",function(){
    return true;
    });
    $("#confirm_cancel").bind("click",function(){
    return false;
    });
    $("#delete_confirm").hide();
}



// fontsize
var currentBrightness= localStorage.getItem('brightness');
var currentFontSize = localStorage.getItem('font-size');
window.onunload=function(){
    populateStorage();
    };

function setStyles() {
    document.getElementById('brightness-input').value = currentBrightness;
    document.getElementById('fontsize-input_bar').value = currentFontSize;
}
function populateStorage() {
    localStorage.setItem('font-size',document.getElementById('fontsize-input_bar').value);
    localStorage.setItem('brightness', document.getElementById('lightness-input_bar').value); 
}

