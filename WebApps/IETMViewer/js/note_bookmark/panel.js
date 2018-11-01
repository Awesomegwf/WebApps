//panel_control.js
$(document).ready(function(e) {
    // var name = "Bookmark_Note_DB";
    // var db_version = 1;
    // var Id_num = 10000000;
    //数据对应的模式及类型
    // var Pa_m = "page_mode";
    // var Sc_m = "scroll_mode";
    // var Bo_t = "bookmark_type";
    // var No_t = "note_type";
    // var Doc_num;//文档编号
    // var Pa_Bm_id;//面板书签小块的id

    initDB(name, db_version);
    Hide_header_footer_menu();

    $("#products-list").bind("click",function(){
        // $("#product").bind("click",function(){
        $("#bookmark-root").empty();
        Bookmarklist_num = 0;
        Init_Bm_No_byCursorGet(mydb);//读取数据库书签笔记信息并生成书签笔记
    });
    //back to product  
    $("#back_to_product").bind("click", function(event) {
        location.href = "#product"; 
    });

    //setting page  
    $("#setting_icon").bind("click", function(event) {
        Hide_header_footer_menu();
        $("#setting_page").show();
    });
    $("#SettingPage_back_icon").bind("click",function(event){
        // history.back();
        $("#setting_page").hide();
        clear(mydb);//调试用，清空数据库
    });

    //mode choose
    //scroll mode 先弃用
    $("#Scroll_mode_X").bind("click",function(e){
        $('#Page_content_div').empty();
        $("#setting_page").hide();
        Create_scroll_mode(e);
        alert("set Scroll mode succeed!!!");
        return Choosen_mode = true;
    });
    //page mode 先弃用
    $("#Page_mode_X").bind("click",function(e){
        $('#Page_content_div').empty();
        $("#setting_page").hide();
        Create_page_mode(e);
        alert("set Page mode succeed!!!");
        return Choosen_mode = false;
        // return Choosen_mode;
    });


    //点击添加书签按钮，插入数据
    $("#add_bookmark_id").bind("click",function(){
        Hide_header_footer_menu();
        bookmark = $("#bookmark-root").children().find("name","Bookmark").prevObject;
            bookmark_count = bookmark.length;//count of bookmark
            if(Id_num == 10000000){//第一次添加书签时执行，取得当前Id起始编号
                Id_num += bookmark_count;
                console.log("只可执行一次！ 目前的id: "+Id_num);
            };

        setTimeout(function(){
            //var judge = 10000000;
            var Chap = "取出当前章节";
            var Ele_c = "取出文档内容";
            var Panel_bookmark_id = CreatePanelBookmark_div();
            var Panel_note_id = "your note id";
            var Selected_ele_id = Get_id();;
            var bookmark_obj = {
                "doc_bookmark_position": Selected_ele_id,
                // "panel_bookmark_id": Panel_bookmark_id
            };
            var note_obj = {
                "doc_note_position": Selected_ele_id,//change here 
                // "panel_note_id": Panel_note_id,
                "object":"你的笔记对象...."
            };

            var data = {
                "id": Id_num,
                "mode": Sc_m,
                "type": Bo_t,
                "doc": "document_1",
                "chapter": "第四十九章",
                "element_content": "the content of doc which Selected ... 到时候取出文本内容",
                "panel_bookmark_id": Panel_bookmark_id,
                "panel_note_id": Panel_note_id,
                "bookmark": bookmark_obj,
                "note": note_obj
            };
            console.log("当前书签栏里的书签数量为： "+bookmark_count);
            console.log("当前顶部元素id,Present_top_ele_id:"+Selected_ele_id);
            console.log("书签小div 的id:"+Panel_bookmark_id);
            console.log("此书签在数据库中的id为： "+Id_num);
            // console.log(data);
            insert(mydb,data);
            Id_num +=1;
        },10);
        //console.log(Id_num);
    });

    function getMousePos(event) {
        var e = event || window.event;
        console.log({'x':e.screenX,'y':e.screenY});
        return  {'x':e.screenX,'y':e.screenY};
    }

    //show/hide top/bottom menu
    $("#Page_content_div").bind("click", function(event) {
        //调试代码开始
        /*
         *var pos = getMousePos(event);
         *let promise_select = new Promise(function(resolve, reject){
         *    console.log(pos);
         *    resolve(pos);
         *});
         *promise_select.then(function(){
         *    var position_x = pos.x;
         *    var position_y = pos.y;
         *    //alert("当前坐标： "+position_x+" =x,y= "+position_y);
         *    var Id = document.caretPositionFromPoint(position_x,position_y).offsetNode.id;
         *    if((Id == undefined) || (Id == null)){
         *        var Id = document.caretPositionFromPoint(position_x,position_y).offsetNode.parentElement.id;
         *    };
         *    // var Id = document.caretPositionFromPoint(position_x,position_y).offsetNode.id;
         *    //  var Id_node = document.caretPositionFromPoint(position_x,position_y).offsetNode.parentElement.id;
         *    // var Id = document.caretPositionFromPoint(position_x,position_y);
         *    console.log(Id);
         *    // alert(Id);
         *});
         */
        //调试代码结束

        if(header_pullDownMenu.style.display == "block") {
            Hide_header_footer_menu();
        } else {
            Show_header_footer_menu();
        };
    });


    //side bar button show side panel
    function ShowSidePanel(){
        Hide_header_footer_menu();
        //修复文档页随书签滚动
        $('#Page_content_div').css({
                                   " position":"absolute",
                                   "top":0,
                                   "bottom":0,
                                   "left":0,
                                   "overflow":"auto"
        });

        bookmark = $("#bookmark-root").children().find("name","Bookmark").prevObject;
        // console.log(bookmark.length);
        // console.log(bookmark);
        // $("#bookmark-root").empty();
        setTimeout(function () {
            $("#Doc_sidebar_Panel").panel( "open" );
        } ,10);
    }

    //panel control
    $("#Page_content_div").on("swiperight",function(){
        //向右滑动，显示面板
        ShowSidePanel();
    });

    $("#panel_nav_icon").bind("click", function(event) {
        ShowSidePanel();
    });


    //点击书签列里的书签，实现相应跳转，长按删除
    // taphold to delete bookmark 
    document.getElementById('bookmark-root').addEventListener('click', function(event){
        bookmark.unbind('click').each(function(event){
            var data_bookmark ="#" + $(this).attr("id");
            var bookmark_id = $(this).attr("id");
            var Index_value = bookmark_id;
            var Index_name = "pan_bm_id";//书签索引名
            // var Index_name = "pan_no_id";//索引名
            // $(this).unbind('click');
            $(this).unbind('taphold').on("taphold", tapholdHandler);
            $(this).unbind('click').on("click", tapHandler);

            //bookmark jump
            function tapHandler(event) {  
                var Index_value = bookmark_id;
                $("#Doc_sidebar_Panel").panel( "close" );
                // alert("jump? ===>"+bookmark_id + " ?"); 
                Select_data_jump(mydb,Index_name,Index_value);
                event.preventDefault();
            }  
            //bookamrk delete
            function tapholdHandler(event) {  
                // console.log("im going to remove data of "+bookmark_id);
                alert("删除书签? ===>"+bookmark_id + " ?");
                // $("#delete_confirm").show();
                // if(confirm()){
                //     remove(mydb,bookmark_id); 
                //     $(data_bookmark).remove();
                //     console.log("remove data of bookmark :"+bookmark_id);
                // };               
                get_delete_data(mydb,Index_name,Index_value); 
                $(data_bookmark).remove();
                event.preventDefault();
            }    
        });
    // });
}, true);


    // change fontsize
    $("#fontsize-input_bar").change(function(){
        // $("#fontsize-input_bar").html($(this).val());
        // navigator.mozPower.screenBrightness= $(this).val()/100.0;
        // var thisEle = $("#Page_content_div").css("font-size");
        var fontsizeinc = $("#fontsize-input_bar").val()/100.0;
        $('#Page_content_div').css('font-size', 1+fontsizeinc+'em');
        // setDocTextSize();
        // alert(fontsizeinc);
    });


    /* 亮度调节 */
    $("#lightness-input_bar").change(function(){
        $("#lightness-input_bar").html($(this).val());
        navigator.mozPower.screenBrightness= $(this).val()/100.0;
    });


    // 行间距及背景颜色调节
    var Linespaceing_Bgcolor_icon = $(".footer_row2").find(".icon");
    var Line_small = $("#linespacing_small");
    var Line_middle = $("#linespacing_middle");
    var Line_big = $("#linespacing_big");
    var Bgcolor_wh = $("#bgcolor_white");
    var Bgcolor_ye = $("#bgcolor_yellow");
    var Bgcolor_gr = $("#bgcolor_green");

    function change_bg_color(){
        // var obj_ = $("#Page_content_div")[0];
        var obj_ = $("#Page_content_div")[0].children;
        // console.log(obj_color);
        chcolor(obj_);
    }

    function chcolor(obj){
        for(i=0;i<obj.length;i++){
            // alert(obj.childNodes[i]);
            // obj.childNodes[i].style.backgroundColor = bgcolor;
            obj[i].style.backgroundColor = bgcolor;
        }
    }


    function Linespaceing_Bgcolor(Id){
        // console.log(Id);
        Id_ = "#"+Id;
        switch (Id) {
        case ("linespacing_small"):
            $('#Page_content_div').css({"line-height":"120%"});
            $(Id_)[0].src= "icon/linespacing_small2-01.png";
            Line_middle[0].src= "icon/linespacing_middle1-01.png";
            Line_big[0].src= "icon/linespacing_big1-01.png";
            break;
        case ("linespacing_middle"):
            $('#Page_content_div').css({"line-height":"160%"});
            Line_small[0].src= "icon/linespacing_small1-01.png";
            $(Id_)[0].src= "icon/linespacing_middle2-01.png";
            Line_big[0].src= "icon/linespacing_big1-01.png";
            break;
        case ("linespacing_big"):
            $('#Page_content_div').css({"line-height":"210%"});
            Line_small[0].src= "icon/linespacing_small1-01.png";
            Line_middle[0].src= "icon/linespacing_middle1-01.png";
            $(Id_)[0].src= "icon/linespacing_big2-01.png";
            break;
        case ("bgcolor_white"):
            bgcolor = "#DDDDDD";
            change_bg_color();
            $(Id_)[0].src="icon/backgroundcolor_white2-01.png";
            Bgcolor_ye[0].src="icon/backgroundcolor_yellow1-01.png";
            Bgcolor_gr[0].src="icon/backgroundcolor_green1-01.png";
            break;
        case ("bgcolor_yellow"):
            bgcolor = "#FFDD55";
            change_bg_color();
            Bgcolor_wh[0].src="icon/backgroundcolor_white1-01.png";
            $(Id_)[0].src="icon/backgroundcolor_yellow2-01.png";
            Bgcolor_gr[0].src="icon/backgroundcolor_green1-01.png";
            break;
        case ("bgcolor_green"):
            bgcolor = "#BBFF66";
            change_bg_color();
            Bgcolor_wh[0].src="icon/backgroundcolor_white1-01.png";
            Bgcolor_ye[0].src="icon/backgroundcolor_yellow1-01.png";
            $(Id_)[0].src="icon/backgroundcolor_green2-01.png";
            break;
        default:
            break;
        }
    }

    Linespaceing_Bgcolor_icon.each(function() {
        // var Linspaing_icon = $("img[id^='linespacing']");//id属性以code开始的所有img标签
        // var Bgcolor_icon = $("img[id^='bgcolor']");//id属性以code开始的所有img标签
        $(this).bind("click",function() {
            var Id=$(this).attr("id");
            Linespaceing_Bgcolor(Id);
        });
    });

    // $("#linespacing_small").bind("click",function(){
    //     var thisEle_lineHeight = $("#Page_content_div").css("line-height");
    //     // alert(thisEle_lineHeight);
    //     $('#Page_content_div').css({"line-height":"120%"});
    // });

    // $("#linespacing_middle").bind("click",function(){
    //     var thisEle_lineHeight = $("#Page_content_div").css("line-height");
    //     // alert(thisEle_lineHeight);
    //     $('#Page_content_div').css({"line-height":"160%"});
    // });

    // $("#linespacing_big").bind("click",function(){
    //     var thisEle_lineHeight = $("#Page_content_div").css("line-height");
    //     // alert(thisEle_lineHeight);
    //     $('#Page_content_div').css({"line-height":"200%"});
    // });

    // $("#bgcolor_white").bind("click",function(){
    //     bgcolor = "#DDDDDD";
    //     change_bg_color();
    // });

    // $("#bgcolor_yellow").bind("click",function(){
    //     bgcolor = "#FFDD55";
    //     change_bg_color();
    // });

    // $("#bgcolor_green").bind("click",function(){
    //     // $("#Page_content_div")[0].childNodes;
    //     bgcolor = "#BBFF66";
    //     change_bg_color();

    // });
    // $("input[id^='code']");//id属性以code开始的所有input标签
    // $("input[id$='code']");//id属性以code结束的所有input标签
    // $("input[id*='code']");//id属性包含code的所有input标签
    // $("input[name^='code']");//name属性以code开始的所有input标签
    // $("input[name$='code']");//name属性以code结束的所有input标签
    // $("input[name*='code']");//name属性包含code的所有input标签
    // $("input[name*='code']").each(fuction(){
});



