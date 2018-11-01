//词典

var stop  = {
    "的" : 1
};

function splitWords(words) {
    var start = 0, end = words.length - 1, result = [];
    while (start != end) {
        var str = [];
        for (var i = start; i <= (start+3); i++) {
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

var splitArray = [];
onmessage = function(e){
    console.time("split");
    var strfinal = e.data;
	for (var i = strfinal.length-1;i >=0; i--) {
	    console.log(strfinal[i]);
		var resultArray = strfinal[i].split("@kylin@");
		var result = splitWords(resultArray[1]);
		var str = "";
		for (var j = result.length - 1; j >= 0; j--) {
			str=result[j]+" "+str;
		}
		// console.log(str);
		var poststr = resultArray[0]+"@nudt@"+str;
		splitArray.push(poststr);
	}
	postMessage(splitArray);
	console.timeEnd("split");
}