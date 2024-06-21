((ATA, win, doc)=>{
	// MAIN
	const ws_protocol = protocol === "http:" ? "ws:" : "wss:";
	
	const BASE = protocol + "//" + hostname + port;
	const BASE_WS = ws_protocol + "//" + hostname + port;
	
	const apiv1 = BASE + "/api/ver_1/";
	const contentv1 = BASE + "/content/";
	const scriptv1 = BASE + "/script/";
	
	const SetTime = (data)=>{
		const date = new Date();
		const diff = date.getTime() - data;
		console.log(diff);
	};
	
	ATA.Setups.push(()=>{
		
	});
	// MAIN
})(ATA(), window, document);