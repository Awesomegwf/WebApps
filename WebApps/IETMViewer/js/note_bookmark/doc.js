//doc page
// $("#doc_content_div").load('doc_content.html', function(){
// });

$(document).ready(function(e) {
    
    //init of page
    // Create_scroll_mode(e);
    $('#Page_content_div').empty();
    displayResult('Page_content_div','data/xml/temp7.xml');

    //block system menu, use personal menu
    $(document).bind("click",function(e){
        $("#Menudiv").css({"top":e.pageY,"left":e.pageX,"display":"none"});
    });
    $(document).bind("contextmenu",function(e){
        $("#Menudiv").css({"top":e.pageY,"left":e.pageX,"display":"block"});
        // return false;            
    });


    // 控制当前哪页显示
    var Page_id_num_show_begin =1000;
    var Page_div_id_show_now = "#Page"+Page_id_num_show_begin;
    $(Page_div_id_show_now).css("display","block");
    //上一页
    $("#Previous_page").bind("click",function(e){
        if(Page_id_num_show_begin > 1000){
            // 	alert("已到第1页！");
            // }else{
            $(Page_div_id_show_now).css("display","none");
            Page_id_num_show_begin = Page_id_num_show_begin - 1;
            console.log(Page_id_num_show_begin);
            Page_div_id_show_now = "#Page"+Page_id_num_show_begin;
            $(Page_div_id_show_now).css("display","block"); 
            // alert($(Page_div_id_show_now ).attr('id'));
        };

    });
    //下一页
    $("#Next_page").bind("click",function(e){
        if(Page_id_num_show_begin < 1010){
            // 	alert("已到最后一页！");
            // }else{					
            $(Page_div_id_show_now).css("display","none");
            Page_id_num_show_begin = Page_id_num_show_begin + 1;
            console.log(Page_id_num_show_begin);
            Page_div_id_show_now = "#Page"+Page_id_num_show_begin;
            $(Page_div_id_show_now).css("display","block"); 
            // alert($(Page_div_id_show_now).attr('id'));
        };													
    });

    

});


