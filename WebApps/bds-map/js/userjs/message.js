console.log("this is message.js");
// 主功能图标切换
$(document).on("pageshow","#directory",function(){ 
  $("#editinfo").css("display","none");
  document.getElementById("msgselect").style.display="none";
});
$(document).on("pageshow","#geolocation",function(){
  $("#editinfo").css("display","none");
  document.getElementById("msgselect").style.display="none";
});
$(document).on("pageshow","#setting",function(){ 
  $("#editinfo").css("display","none");
  document.getElementById("msgselect").style.display="none";
});
$(document).on("pageshow","#message-1",function(){ 
  $("#editinfo").css("display","none");
  document.getElementById("msgselect").style.display="none";
});
$(document).on("pageshow","#message-2",function(){
  $("#editinfo").css("display","none");
  document.getElementById("msgselect").style.display="none";
});
$(document).on("pageshow","#message",function(){
  $("#editinfo").css("display","inline");
  document.getElementById("msgselect").style.display="none";
});

//信箱编辑界面
$(document).on("click","#moreinfor",function(){ 
  	if(document.getElementById("msgselect").style.display=="block"){
			document.getElementById("msgselect").style.display="none";
		}else{
			document.getElementById("msgselect").style.display="block";
		}
});

$(document).on("click","#back-left",function(){
   window.location.href="#message";
});

$(document).on("click","#num-right",function(){
   window.location.href="#directory";
});

$(document).on("click","#continu-location",function(){
   	if(this.src == "app://bds_map.gaiamobile.org/resources/icon-locat1.png"){
   		this.setAttribute("src","resources/icon-locat2.png");
   	}else{
   		this.setAttribute("src","resources/icon-locat1.png");
   	}
});

$(document).on("click","#freq-level",function(){
   	if(this.src == "app://bds_map.gaiamobile.org/resources/icon-freq1.png"){
   		this.setAttribute("src","resources/icon-freq2.png");
   	}else{
   		this.setAttribute("src","resources/icon-freq1.png");
   	}
});

//实现倒计时功能
$('#send-message').show();
$('#time-count').hide();
$(document).on("click","#send-message",function(){
	$('#send-message').hide();
	$('#time-count').show();
	var count=5;
	var timeid = setInterval(function(){
		if(count>0){
			count--;
			document.getElementById("time-count").innerHTML = count+'s';
		}else{
			clearTimeout(timeid);
			$('#send-message').show();
			$('#time-count').hide();
		}
	},1000);
});
