//导航栏切换效果
$("#setlocal").css("color","#484949");
$("#setlocal").css("border-bottom-style","solid");
$("#setlocal").css("border-bottom-color","#89cc42");
$(".setheader").bind('click',headHandler);
function headHandler(e) {
	var result=e.target;
	result.style.color="#484949";
	result.style.borderBottomStyle="solid";
	result.style.borderBottomColor="#89cc42";
	for (var i = 0; i < $(".setheader").length; i++) {
		if ($(".setheader")[i].innerHTML!=result.innerHTML) {
			$(".setheader")[i].style.color="#797979";
			$(".setheader")[i].style.borderBottomStyle="none";
		}
	}
	if (result.innerHTML=="本机信息") {
		$("#localinfo").css("display","block");
		$("#satestate").css("display","none");
		$("#specialset").css("display","none");
	}
	if (result.innerHTML=="卫星状态") {
		$("#satestate").css("display","block");
		$("#localinfo").css("display","none");
		$("#specialset").css("display","none");
		addChart();
	}
	if (result.innerHTML=="高级设置") {
		$("#specialset").css("display","block");
		$("#localinfo").css("display","none");
		$("#satestate").css("display","none");
	}
}
//添加图标
function addChart(){
	var rdChart = echarts.init(document.getElementById('rdss'));
	var rnChart = echarts.init(document.getElementById('rnss'));
	var rdoption = {

        title: {
           text: ''
        },
        tooltip: {},
        legend: {
        	data:['RDSS'],
            max:1000,
            min:0
        },
        xAxis: {
        	data: ["00:00","00:05","00:10","00:15","00:20","00:35","00:40","00:45","00:50"]
        },
        yAxis: {
            name:"信号强度"
        },
        series: [{
            name: '信号强度',
            type: 'bar',
            data: [333, 200, 360, 100, 100, 560,320,450,890]
        }]
    };
	var rnoption = {
    	title: {
        	text: ''
        },
        tooltip: {},
        	legend: {
            data:['RNSS'],
            max:1000,
            min:0
        },
        xAxis: {
        	data: ["00:00","00:05","00:10","00:15","00:20","00:35","00:40","00:45","00:50"]
        },
        yAxis: {
        	name:"信号强度"
        },
        series: [{
        	name: '信号强度',
            type: 'bar',
            data: [300, 200, 360, 600, 700, 560,320,450,890],
            itemStyle: {
            	normal: {
                	color: function(params) {
                            // build a color map as your need.
                    	var colorList = [
                        	'#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                            '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                            '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                        ];
                            return colorList[params.dataIndex]
                	},
　　　　　　　　　　　　　　//以下为是否显示，显示位置和显示格式的设置了
                	label: {
                		show: true,
                    	position: 'top',
                    	formatter: '{b}\n{c}'
                    }
                }
            },
　　　　　　　　　　//设置柱的宽度，要是数据太少，柱子太宽不美观~
　　　　　　　　　　　　barWidth:10
        }]
    };
	rdChart.setOption(rdoption);
	rnChart.setOption(rnoption);
}




