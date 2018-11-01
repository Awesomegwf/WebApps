/* 控制背景音乐和解说声音模块 */


var backgroundMusic = $('#backgroundmusic')[0];	//背景音乐
var commentaryVoice = $('#commentary-voice')[0];	//解说声音
var commentaryProgressSave = 0;	//保存解说声音进度
var playButton = document.getElementById("playbutton");	//解说声音控制按钮

var isLoaded = false;	//判断音频是否加载
var isAltLoaded = false;




/* 只有在gallery界面播放解说声音，其他界面都暂停解说声音播放，并记录当前播放状态，切回时恢复现场 */
$(document).on("pageshow", '#search', function() {
	commentaryVoice.pause();
});

$(document).on("pageshow", '#favorites', function() {
	commentaryVoice.pause();
});

$(document).on("pageshow", '#gallery-list', function() {
	commentaryVoice.pause();
});

$(document).on("pageshow", '#settings', function() {
	commentaryVoice.pause();
});




/* 监听解说声音状态，切换图标 */ 
commentaryVoice.addEventListener("play", function(){
	playbutton.src = "icons/pausebutton.png";
},false);

commentaryVoice.addEventListener("pause", function(){
	playbutton.src = "icons/playbutton.png";
	commentaryProgressSave = commentaryVoice.currentTime;
},false);


commentaryVoice.addEventListener('pause', function() {
	commentaryProgressSave = commentaryVoice.currentTime;
},false);


/* 切换背景音乐 */
// musicSelector.onchange = function() {
// 	var source = backgroundMusic.children[0];
// 	var isPaused = backgroundMusic.paused;
// 	console.log("changed");
// 	if(musicSelector.value == 1) {
// 		source.src = "media/audio/molihua.mp3";
// 	}
// 	if(musicSelector.value == 2) {
// 		source.src = "media/audio/dangziqiang.mp3";

// 	}

// 	backgroundMusic.play();
// }


//按键控制背景audio的暂停和播放
playButton.onclick = function() {
    if(commentaryVoice.paused) {
        commentaryVoice.play();
    }else {
        commentaryVoice.pause();
    }
}

var isBackgroundMusicPlaying=true; //是否正在播放
var isCommentaryVoicePlaying=true;
var isDocAudioPlaying = true;

// Pause on visibility change
document.addEventListener('visibilitychange', function visibilityChange() {
    if (document.hidden) {
        //背景音乐
		if(backgroundMusic.paused){
            isBackgroundMusicPlaying=false;
		}else if(backgroundMusic.currentTime>0){
            isBackgroundMusicPlaying = true;
			backgroundMusic.pause();
        }
		if(commentaryVoice.paused){
            isCommentaryVoicePlaying=false;
		}else if(commentaryVoice.currentTime>0){
            isCommentaryVoicePlaying = true;
            commentaryVoice.pause();
		}

        if($('#doc-audio')[0].paused) {
            isDocAudioPlaying = false;
        } else if($('#doc-audio')[0].currentTime > 0) {
            isDocAudioPlaying = true;
            $('#doc-audio')[0].pause();
        }

        //control the audio in doc 

    }
    else {
        // if (playerShowing) {
        //     // Bug 1151775
        //     // If the app is coming to the foreground before a sharing activity is
        //     // complete, restore the video (the video will have been released before
        //     // initiating the sharing activity and is only restored when the sharing
        //     // activity is completed). When the sharing activity is complete and
        //     // restoreVideo is again called, the restoreVideo function takes care of
        //     // not restoring the video when it doesn't need to be restored.
        //     if (videoHardwareReleased) {
        //         restoreVideo();
        //     }
        //     setControlsVisibility(true);
        // } else {
        //     // We only start parsing metadata when player is not shown.
        //     startParsingMetadata();
        // }

        if(isBackgroundMusicPlaying) backgroundMusic.play();	//背景音乐
        if(isCommentaryVoicePlaying) commentaryVoice.play();
        if(isDocAudioPlaying) $('#doc-audio')[0].play();

    }
});

