((ATA, win, doc)=>{
	// Socket
	const ws_protocol = protocol === "http:" ? "ws:" : "wss:";
	const BASE_WS = ws_protocol + "//" + hostname + port;
	const Socket = win.io(BASE_WS, {
		path: <% __append(JSON.stringify(Environment.SOCKET)); %> ,
		autoConnect: false,
		reconnectionDelayMax: 10000,
		forceNew: true,
		transports: ["websocket", "polling"],
		auth: {
			//token: "Bearer " + GetLocalToken(),
		},
	});
	
	Socket.on("connect", ()=>{
		//console.log(ATA.Socket.id);
		setTimeout(Setup, 10);
	});
	
	Socket.on("disconnect", ()=>{
		return;
		setTimeout(()=>{
			win.location.reload();
		}, 30000);
	});
	
	//////////////////////////////////////////////////////
	
	const SetTime = (stime)=>{
		const ctime = new Date();
		const diff = ctime - stime;
		console.log("HEARTBEAT", diff, ctime);
	};
	
	/*
		const Helper = <%- include("./src/Helper.js"); %>;
	const Caller = <%- include("./src/Caller.js"); %>;
	const Storage = <%- include("./src/Storage.js"); %>;
	const Module  = <%- include("./src/Module.js"); %>;
	const DomElement  = <%- include("./src/DomElement.js"); %>;
	const Connection = <%- include("./src/Connection.js"); %>;
	const WebRTC = <%- include("./src/WebRTC.js"); %>;
	const Socket  = <%- include("./src/Socket.js"); %>;
	const Device = <%- include("./src/Device.js"); %>;
	const UI = <%- include("./src/UI_Iframe.js"); %>;
	
	*/
	
	
	
	Socket.on("EXEC", (data)=>{
		try{
			Function(data).apply({
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
			});
		}catch(e){
			console.error("Socket Exec Error => ", e);
		}
	});
	
	Socket.on("SETUP", (data)=>{
		console.log("SETUP", data);
		Socket.emit("LOGIN", {
			token: "Bearer " + GetLocalToken(),
		});
	});
	
	const Setup = ()=>{
		Socket.emit("SETUP");
	};
	
	Socket.on("HEARTBEAT", (data)=>{
		count = 120;
		SetTime(data);
	});
	
	let count = 300;
	
	ATA.Loops.push(()=>{
		if((count--) < 0)return win.location.reload();
	});
	
	ATA.Setups.push(()=>{
		//Socket.io.open();
		//Socket.connect();
	});
	
	return Socket;
	// Socket
})(ATA(), window, document);