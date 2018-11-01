//号码簿页面
function animateEdit(){
      $(".editanddelete1").animate({width:"0%"});
      $(".onenumber1").swipeleft(function(e){
          var result=$(e.target).parents(".onenumber1");
          if(result.find(".editanddelete1").width()==0){
            result.find(".onenumber-table1").animate({width:"66%"});
            result.find(".editanddelete1").animate({width:"34%"});
          }
      });
      $(".onenumber1").swiperight(function(e){
        var result=$(e.target).parents(".onenumber1");
        if(result.find(".editanddelete1").width()!=0){
          result.find(".onenumber-table1").animate({width:"97.5%"});
          result.find(".editanddelete1").animate({width:"0%"});
        }
      }); 
      // $(".onenumber-delete").click(deleteHandle);
      $(".onenumber-edit").click(editHandle);

}



//删除与编辑操作

//添加用户（编辑）界面跳转
$("#addnum").bind("click",function(){
  window.location.href="#message-2";
});


// function deleteHandle(e){
//   let result=$(e.target).parents(".onenumber1");
//   var curnumber = result.find(".number").html();
//   var rtransaction = dbGlob.db.transaction('number', 'readwrite');
//   var rstore = rtransaction.objectStore('number');
//   rstore.openCursor().onsuccess = function(event) {
//     var cursor = event.target.result;
//     if(cursor) {
//       if (cursor.value.num==curnumber) {
//         cursor.delete();
//       }
//       cursor.continue();
//     }else{
//       readUserinfo();
//       animateEdit();
//       alert("nihao");
//     }
//   }
// }

function editHandle(e){
  let result=$(e.target).parents(".onenumber1");
  var curnum = result.find(".number").html();
  var curname = result.find(".company").html();
  var name = $("#username").val(curname);
  var number = $("#usernum").val(curnum);
  window.location.href="#message-2";
}

//返回号码簿页面
$(document).on("click","#numback-left",function(){
   window.location.href="#directory";
});