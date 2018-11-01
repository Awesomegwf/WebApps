//load settings page, function is execued after loading the page
var changeFontSizeArea = [];
var currentVolume1 = localStorage.getItem('cvolume');
var currentVolume2 = localStorage.getItem('bgvolume');
var currentBrightness= localStorage.getItem('brightness');
var currentFontSize = localStorage.getItem('font-size');
$("#settings").load('settings.html', function(){
    
    var bgmusic=document.getElementById("background-music-dropdown-selector");
    setTimeout(function(){
        var cursor = sdcard.enumerate("0/.AppData/bgmusic");
        cursor.onsuccess = function () {
            if (this.result) {
                var file = this.result;
                var bgOption = document.createElement("option");
                strArr=file.name.split("/");
                strFinal = strArr[5].split(".");
                bgOption.innerHTML = strFinal[0];
                bgmusic.appendChild(bgOption);
                this.continue();
            }
        }
    },2000);

    $("#commentary-volume").html(currentVolume1);
    $("#background-music-volume").html(currentVolume2);
    var brightness = parseInt(navigator.mozPower.screenBrightness*100);
    $("#brightness-value").html(brightness);
    $("#brightness-input").val( brightness);
    setStyles();
    $(document).on("pageshow", "#settings", function() {
        
        var brightnessinputvalue=document.getElementById("brightness-input");
         
        brightnessinputvalue.value = navigator.mozPower.screenBrightness *100;
         
        //初始化设置  
    });
    /* 解说词音量调节 */
    $("#commentary-input").change(function() {
        $("#commentary-volume").html($(this).val());
        document.getElementById("commentary-voice").volume = ($(this).val() / 100);
    });

    /* 背景音乐音量调节 */
    $("#background-music-input").change(function() {
        $("#background-music-volume").html($(this).val());
        document.getElementById("backgroundmusic").volume = ($(this).val() / 100);

    });
    /* 亮度调节 */
    $("#brightness-input").change(function() {
        $("#brightness-value").html($(this).val());
        navigator.mozPower.screenBrightness= $(this).val()/100.0;
    });

    /* 背景音乐选择 */
    $("#background-music-dropdown-selector").change(function() {
        var musicName = this.options[this.selectedIndex].text;

        var source = backgroundMusic.children[0];
        var isPaused = backgroundMusic.paused;
        console.log("changed");
        if (musicName) {
            var musicPath ="0/.AppData/bgmusic/"+musicName+".mp3";
            sdcard.get(musicPath).onsuccess = function (){
                var file = this.result;
                source.src = URL.createObjectURL(file);
                backgroundMusic.load();
                if(isPaused){
                    backgroundMusic.pause();
                }
                else {
                    backgroundMusic.play();
                }
            }    
        };
    });

        //解说音乐开关
var switchBox1 = document.getElementById("switch-box1");
var commentaryImg = document.getElementById("commentary-music-switch");
var isswitchShowed1 = false;
var commentaryMusic = document.getElementById('commentary-voice');
var commentaryValue = document.getElementById("commentary-input");
// var backgroundMusic= document.getElementById('backgroundmusic');
switchBox1.onclick=function() {
    if(!isswitchShowed1) {        
        commentaryImg.src = "icons/switchoff.png";
        commentaryMusic.volume=0;
        isswitchShowed1 = true;
    } else {
            commentaryImg.src = "icons/switchon.png";
            // commentaryMusic.volume=commentaryValue.value;
            commentaryMusic.volume=(commentaryValue.value/100);
            isswitchShowed1 = false;
    }

};

//背景音乐开关
var switchBox2 = document.getElementById("switch-box2");
var backgroundMusicImg = document.getElementById("background-music-switch");
var backgroundMusic= document.getElementById("backgroundmusic");
var backgroundMusicValue = document.getElementById("background-music-input");
var isswitchShowed2 = false;
switchBox2.onclick = function() {
    if(!isswitchShowed2) {
        backgroundMusicImg.src = "icons/switchoff.png";
        backgroundMusic.volume=0;
        isswitchShowed2 = true;
    } else {
        backgroundMusicImg.src = "icons/switchon.png";
        backgroundMusic.volume=backgroundMusicValue.value/100;
        isswitchShowed2 = false;
            }
        };
/* 解说音乐音量调节 */
$("#commentary-input").change(function() {
    $("#commentary-volume").html($(this).val());
    document.getElementById("commentary-voice").volume = ($(this).val() / 100);
    if (isswitchShowed1==true) {
        commentaryImg.src = "icons/switchon.png";
        isswitchShowed1 = false;
    };
    });
    // 背景音乐音量调节
$("#background-music-input").change(function() {
    $("#background-music-volume").html($(this).val());
    document.getElementById("backgroundmusic").volume = ($(this).val() / 100);
    if (isswitchShowed2==true) {
        backgroundMusicImg.src = "icons/switchon.png";
        isswitchShowed2 = false;
    };
    });


window.onunload=function(){
    populateStorage();
    };

function setStyles() {
    document.getElementById('commentary-input').value = currentVolume1;
    document.getElementById('background-music-input').value = currentVolume2;
    document.getElementById('brightness-input').value = currentBrightness;
    document.getElementById('fontsize-change').value = currentFontSize;
}
function populateStorage() {
    localStorage.setItem('font-size',document.getElementById('fontsize-change').value);
    localStorage.setItem('cvolume', document.getElementById('commentary-input').value);
    localStorage.setItem('bgvolume', document.getElementById('background-music-input').value);
    localStorage.setItem('brightness', document.getElementById('brightness-input').value); 
}

//如果想控制哪一块的字体，就把该块区的id给push进changeFontSizeArea数组

    // changeFontSizeArea.push("setting-area");
    function changeFontSize(){
        var changeFont = document.getElementById("fontsize-change");
        changeFont.value=0;
        for (var i = 0; i < changeFontSizeArea.length; i++) {
            document.getElementById(changeFontSizeArea[i]).style.fontSize = (1+(changeFont.value/100)+"em");
        };
        localStorage.setItem('font-size',changeFont.value);
    }
    changeFont.addEventListener("change",changeFontSize,false);
});

/**
 * 获得全局设置的字体大小改变量0-1
 */
function getGlobalFontSizeInc(){
    return $("#fontsize-change").val()/100.0;
}