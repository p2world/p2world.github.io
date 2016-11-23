$(function(){
	var arr=[
		[38,'doubleTap'],
		[37,'swipeLeft'],
		[39,'swipeRight'],
		[40,'swipeDown']
	];
	var jB=$('body');
	$.each(arr,function(i,k){
		if(i===3){
			jB.bind(k[1],function(){
				var lastY=-1;
				if(gameIng){
					var t=setInterval(function(){
						lastGame.handleKey(40);
						// 没有继续往下  就碰到了
						if(lastY===lastGame.curY){
							clearInterval(t);
						}
						lastY=lastGame.curY;
					},10);
				}
			});
		}else{
			jB.bind(k[1],function(){
				if(gameIng){
					window.skipAuto=true;
					lastGame.handleKey(k[0]);
				}
			});
		}
	});
});
