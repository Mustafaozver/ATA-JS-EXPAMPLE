((ATA, win, doc)=>{
	const ws_protocol = protocol === "http:" ? "ws:" : "wss:";
	const BASE_WS = ws_protocol + "//" + hostname + port;
	const Socket = win.io(BASE_WS, {
		path: "/SOCKET",
		/*auth: {
			token: "",
			session_id: "",
		},*/
	});
	
	Socket.on("connect", ()=>{
		//console.log(ATA.Socket.id);
		setTimeout(Setup, 10);
	});
	
	Socket.on("disconnect", ()=>{
		setTimeout(()=>{
			win.location.reload();
		}, 30000);
	});
	
	Socket.on("HEARTBEAT", (data)=>{
		console.log("HEARTBEAT");
		//SetTime(data);
	});
	
	Socket.on("EXEC", (data)=>{
		setTimeout(data, 1);
	});
	
	Socket.on("SETUP", ()=>{
		console.log("SETUP");
		ATA.Socket.emit("LOGIN", {
			token: "",
			username: "",
			password: "",
			mode: ATA.MODE,
		});
	});
	
	const Setup = ()=>{
		Socket.emit("SETUP");
	};
	
	ATA.Setups.push(()=>{
	});
	
	return Socket;
})(ATA(), window, document);