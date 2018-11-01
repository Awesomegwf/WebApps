function authenticate() {
	var username = auth.username.value;
	var passwd = auth.password.value;

	console.log(username + "+" + passwd);

	if( username == "" || username == null ){
		$("#username-popup").popup('open');
		auth.username.focus();	//输入框获取焦点，等待用户输入
		return false;
	} 

	if( passwd == "" || username == null ) {
		$("#password-popup").popup('open');
		auth.password.focus();
		return false;
	}

	/* 此处加入用户名密码检测 */

	return true;
}

$('#login-button').on('click', function() {
	if(!authenticate()) {
		return false;
	} else {
		// auth.submit();
		$.mobile.changePage("#products-list");
		return false;
	}
})