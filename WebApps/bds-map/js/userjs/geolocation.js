//点击时导航栏标题加粗，以及下面的绿线效果
$("#ploc").css("color","#484949");
$("#ploc").css("border-bottom-style","solid");
$("#ploc").css("border-bottom-color","#89cc42");
$(".locheader").bind('click',headHandler);
function headHandler(e) {
	var result=e.target;
	result.style.color="#484949";
	result.style.borderBottomStyle="solid";
	result.style.borderBottomColor="#89cc42";
	if (result.innerHTML=="无源定位") {
		$("#passivepage").css("display","block");
		$("#activepage").css("display","none");
	}else{
		$("#passivepage").css("display","none");
		$("#activepage").css("display","block");
	}

	for (var i = 0; i < $(".locheader").length; i++) {
		if ($(".locheader")[i].innerHTML!=result.innerHTML) {
			$(".locheader")[i].style.color="#a2a1a1";
			$(".locheader")[i].style.borderBottomStyle="none";
		}
	}
}

