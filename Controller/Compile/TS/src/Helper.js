((ATA, win, doc)=>{
	
	const ToggleFullScreen = ()=>{
		if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement){
			if(doc.exitFullscreen)doc.exitFullscreen();
			else if(doc.mozCancelFullScreen)doc.mozCancelFullScreen();
			else if(doc.webkitExitFullscreen)doc.webkitExitFullscreen();
			else if(doc.msExitFullscreen)doc.msExitFullscreen();
			return false;
		}else{
			const element = doc.body;
			if(element.requestFullscreen)element.requestFullscreen();
			else if(element.mozRequestFullScreen)element.mozRequestFullScreen();
			else if(element.webkitRequestFullscreen)element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			else if(element.msRequestFullscreen)element.msRequestFullscreen();
			return true;
		}
	};
	return{
		ToggleFullScreen,
	};
})(ATA(), window, document);