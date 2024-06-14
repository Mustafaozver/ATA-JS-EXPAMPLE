((ATA, win, doc)=>{
	const hostname = win.location.hostname;
	const port = win.location.port === "" ? "" : (":" + win.location.port);
	const protocol = win.location.protocol;
	const ws_protocol = protocol === "http:" ? "ws:" : "wss:";
	
	const BASE = protocol + "//" + hostname + port;
	const BASE_WS = ws_protocol + "//" + hostname + port;
	
	const documentElement = doc.documentElement;
	
	const apiv1 = BASE + "/api/ver_1/";
	const contentv1 = BASE + "/content/";
	const scriptv1 = BASE + "/script/";
	
	ATA.Socket = win.io(BASE_WS, {
		path: "/SOCKET",
		/*auth: {
			token: "",
			session_id: "",
		},*/
	});
	
	ATA.Socket.on("SETUP", ()=>{
		console.log("SETUP");
		ATA.Socket.emit("LOGIN", {
			token: "",
			username: "",
			password: "",
			mode: ATA.MODE,
		});
	});
	
	ATA.Socket.on("HEARTBEAT", (data)=>{
		console.log("HEARTBEAT");
		SetTime(data);
	});
	
	ATA.Socket.on("EXEC", (data)=>{
		console.log("EXEC => ", data);
		setTimeout(data, 1);
	});
	
	const SetTime = (data)=>{
		const date = new Date();
		const diff = date.getTime() - data;
		console.log(diff);
	};
	
	ATA.Setups.push(()=>{
		ATA.Socket.emit("SETUP");
		SetTime(<%=time %>);
	});
	
	ATA.Socket.on("connect", ()=>{
		console.log(ATA.Socket.id); // x8WIv7-mJelg7on_ALbx
	});
	
	ATA.Socket.on("disconnect", ()=>{
		//console.log(ATA.Socket.id); // undefined
		setTimeout(()=>{
			window.location.reload();
		}, 5000);
	});
	
})(ATA(), window, document);