((win, doc)=>{
	
	
	
	const OnMessage = (event)=>{
		try{
			const data = event.data;
			if(data.EVAL){
				return Helper.InjectJS(data.EVAL, {
					ATA,
					Helper,
					//Caller,
					//Storage,
					//Module,
					DomElement,
					//Connection,
					//WebRTC,
					//Socket,
					//Device,
					//UI,
				}, [event]);
			}
		}catch(e){
			
		}
	};
	
	win.addEventListener("message", (event) => {
		
		return OnMessage(event);
		if (event.data &&
			event.data.sender == "get_page_button1") {
			if (window.isTop) {
				alert("Main window alert");
			} else {
				alert("Frame window alert 1");
			}
		}
	});
	
	return{
		
	};
})(win, doc);