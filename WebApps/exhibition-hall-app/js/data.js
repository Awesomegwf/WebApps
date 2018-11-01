//展厅数据示例

var halls = [
	{
		halls_id: 1001,		//展厅ID
		name: "十大元帅",		//展厅名称
		boards_num: 10,		//展板数量 	
		records_num: 10,	//档案数量
		img_path: "resources/exhibition-hall/exhibition-hall-001.png"	//展厅展示图片位置
	},
	{
		halls_id: 1002,
		name: "十大战役",
		boards_num: 23,
		records_num: 23,
		img_path: "resources/exhibition-hall/exhibition-hall-002.png"
	}
];


//展板数据示例
var boards = [
	{
		boards_id: 2001,	//展板ID
		boards_name: "十大元帅－彭德怀",	//展板名称
		img_path: "resources/display-board/display-board-001.png",	//展板图片位置
		boards_halls_id: 1001,	//展板对应展厅ID
		next_board_id: 2002,	//下一个展板ID
		prev_board_id: null		//上一个展板ID
	},
	{
		boards_id: 2002,
		boards_name: "十大元帅－彭德怀",
		img_path: "resources/display-board/display-board-001.png",
		boards_halls_id: 1001,
		next_board_id: 2003,
		prev_board_id: 2001
	},
    {
        boards_id: 2003,
        boards_name: "十大元帅－叶剑英",
        img_path: "resources/display-board/display-board-002.png",
        boards_halls_id: 1001,
        next_board_id: null,
        prev_board_id: 2002
    }
];

//资源数据示例
var resources = [
	{

	}
];


//档案数据示例
var records = [
	{
		records_id: 4001, //档案ID
		records_name: "朱德",	//档案名称
		records_img: "resources/records/zhu.jpg",	//档案展示图片
		html_path: "doc/doc-template.html",	//档案对应HTML文件位置
		rank: "元帅",	//军衔
		birthplace: "四川",	//出生地点
		abbr: "Z", //姓名首字母
		text: "中华人民共和国元帅，军事家。原名彭得华，字怀归，号石穿。1898年10月24日出生于湖南省湘潭县。1928年4月加入中国共产党。土地革命战争时期，领导了平江起义。历任红5军军长兼第13师师长，中共湘鄂赣边界特委委员，红4军副军长兼第30团团长，红3军团总指挥和中共前委书记，红一方面军副总司令兼红3军团军团长，中革军委副主席，红军陕甘支队司令员，西北革命军事委员会副主席，红一方面军司令员，中国人民红军抗日先锋军司令员，西方野战军司令员兼政治委员，红军前敌总指挥。中共六届中央候补委员，政治局委员。参加了长征。抗日战争时期，历任中共中央军委委员、中央军委前方分会(后改称华北军委分会)副书记、国民革命军第八路军副总指挥(后改称第18集团军副总司令)，中共中央北方局代理书记。第七届中共中央政治局委员，并任中共中央军委副主席兼总参谋长。解放战争时期，历任中国人民解放军副总司令、西北野战兵团(后相继改称西北野战军、第一野战军)司令员兼政治委员，中共中央西北局第一书记。新中国成立后，历任中央人民政府人民革命军事委员会副主席、西北军政委员会主席、西北军区司令员、新疆军区司令员兼政治委员，中国人民志愿军司令员兼政治委员，国务院副总理兼国防部长。第一届、第二届国防委员会副主席。第八届中共中央政治局委员。1955年被授予元帅军衔，荣获一级八一勋章、一级独立自由勋章、一级解放勋章。1974年11月29日在北京逝世"
	},

	{
		records_id: 4002,
		records_name: "彭德怀",
		records_img: "resources/records/peng.jpg",
		html_path: "doc/doc-template.html",
		rank: "元帅",
		birthplace: "湖南",
		abbr: "P",
		text: "略"
	}
];



var favorites = [
    {
        favorites_id: 5001,                    //自身id
        favorites_board_id: 2001,              //收藏展板id
        favorites_record_id: 4001,             //收藏档案id
        favorites_board_name:"十大元帅－彭德怀", //收藏展板名称
        favorites_record_name:"朱德",          //收藏档案名称
        favorites_board_path:"resources/display-board/display-board-001.png",   // 展板对应的缩略图
        favorites_record_path:"resources/records/zhu.jpg",          //档案对应缩略图
        favorites_record_halls_id:1001,        //档案对应的展厅id
        favorites_board_halls_id:1001          //展板对应的展厅id
    },
    {
        favorites_id: 5002,
        favorites_board_id: 2002,
        favorites_record_id: 4002,
        favorites_board_name:"百团大战－001",
        favorites_record_name:"百团大战",
        favorites_board_path:"resources/display-board/display-board-002.jpg",
        favorites_record_path:"resources/records/peng.jpg",
        favorites_record_halls_id:1002,
        favorites_board_halls_id:1002       
    }
];

var favorites_board = [
    {
        favorites_board_id:2001,     
        favorites_board_name:"十大元帅－彭德怀",
        favorites_board_path:"resources/display-board/display-board-001.png",
        favorites_board_halls_id:"41f0ab45b21b4da597a3458310bd1926"
    },
    {
        favorites_board_id:2002,     
        favorites_board_name:"百团大战－001",
        favorites_board_path:"resources/display-board/display-board-002.jpg",
        favorites_board_halls_id:1002
    },
    {
        favorites_board_id:2003,     
        favorites_board_name:"十大元帅－彭德怀",
        favorites_board_path:"resources/display-board/display-board-001.png",
        favorites_board_halls_id:"41f0ab45b21b4da597a3458310bd1926"
    },
    {
        favorites_board_id:2004,     
        favorites_board_name:"十大元帅－彭德怀",
        favorites_board_path:"resources/display-board/display-board-001.png",
        favorites_board_halls_id:"41f0ab45b21b4da597a3458310bd1926"
    },
    {
        favorites_board_id:2005,     
        favorites_board_name:"十大元帅－彭德怀",
        favorites_board_path:"resources/display-board/display-board-001.png",
        favorites_board_halls_id:"41f0ab45b21b4da597a3458310bd1926"
    }
];

var favorites_record =[
    {
        favorites_record_id:4011,
        favorites_record_name:"朱德",
        favorites_record_path:"resources/records/zhu.jpg", 
        favorites_record_halls_id:"41f0ab45b21b4da597a3458310bd1926"  
    },
    {
        favorites_record_id:4002,
        favorites_record_name:"彭德怀",
        favorites_record_path:"resources/records/peng.jpg", 
        favorites_record_halls_id:1002  
    },
    {
        favorites_record_id:4003,
        favorites_record_name:"彭德怀",
        favorites_record_path:"resources/records/peng.jpg", 
        favorites_record_halls_id:"41f0ab45b21b4da597a3458310bd1926" 
    },
    {
        favorites_record_id:4004,
        favorites_record_name:"彭德怀",
        favorites_record_path:"resources/records/peng.jpg", 
        favorites_record_halls_id:"41f0ab45b21b4da597a3458310bd1926" 
    },
    {
        favorites_record_id:4005,
        favorites_record_name:"彭德怀",
        favorites_record_path:"resources/records/peng.jpg", 
        favorites_record_halls_id:"41f0ab45b21b4da597a3458310bd1926" 
    },
    {
        favorites_record_id:4006,
        favorites_record_name:"彭德怀",
        favorites_record_path:"resources/records/peng.jpg", 
        favorites_record_halls_id:"41f0ab45b21b4da597a3458310bd1926"  
    },
    {
        favorites_record_id:4007,
        favorites_record_name:"彭德怀",
        favorites_record_path:"resources/records/peng.jpg", 
        favorites_record_halls_id:"41f0ab45b21b4da597a3458310bd1926"  
    },
    {
        favorites_record_id:4008,
        favorites_record_name:"彭德怀",
        favorites_record_path:"resources/records/peng.jpg", 
        favorites_record_halls_id:"41f0ab45b21b4da597a3458310bd1926"  
    },
    {
        favorites_record_id:4009,
        favorites_record_name:"彭德怀",
        favorites_record_path:"resources/records/peng.jpg", 
        favorites_record_halls_id:"41f0ab45b21b4da597a3458310bd1926" 
    }
    
];
