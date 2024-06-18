((ATA, win, doc)=>{
	const ws_protocol = protocol === "http:" ? "ws:" : "wss:";
	const BASE_WS = ws_protocol + "//" + hostname + port;
	const Socket = win.io(BASE_WS, {
		path: "/SOCKET",
		autoConnect: false,
		reconnectionDelayMax: 10000,
		forceNew: true,
		/*auth: {
			token: "",
			session_id: "",
		},*/
	});
	
	Socket.on("connect", ()=>{
		//console.log(ATA.Socket.id);
		setTimeout(Setup, 10);
		console.warn("GGGG");
	});
	
	Socket.on("disconnect", ()=>{
		setTimeout(()=>{
			win.location.reload();
		}, 30000);
	});
	
	//////////////////////////////////////////////////////
	
	Socket.on("HEARTBEAT", (data)=>{
		console.log("HEARTBEAT");
		//SetTime(data);
	});
	
	Socket.on("EXEC", (data)=>{
		setTimeout(data, 1);
	});
	
	Socket.on("SETUP", (data)=>{
		console.log("SETUP", data);
		Socket.emit("LOGIN", {
			token: "",
			username: "",
			password: "",
			mode: ATA.MODE,
		});
	});
	
	const Setup = ()=>{
		Socket.emit("SETUP");
	};
	
	ATA.Loops.push(()=>{
		Socket.emit("MSG", {
			M: "0",
			Y: "evbfdg"
		});
	});
	
	ATA.Setups.push(()=>{
		Socket.connect();
	});
	
	return Socket;
})(ATA(), window, document);