module.exports=((ATA)=>{
	const Socket = ATA.Require("socket.io");
	
	const OnConnect = (socket)=>{
		socket.on("SETUP", ()=>{
			OnSetup(socket);
		});
	};
	
	const OnDisConnect = (socket)=>{
		console.log("Socket users => ", socket.sockets.clients().length);
	};
	
	const OnSetup = (socket)=>{
		socket.emit("SETUP", {
			//TIME: GetTime(),
			SID: ATA.ID.UUID,
			CID: socket.id,
			ANA: ANA.Me,
		});
		
		socket.on("LOGIN", (data)=>{
			LogIn(socket, data);
		});
	};
	
	const CreateSocket = (server, options)=>{
		const socket = new Socket.Server(server, Object.assign({
			cors: true,
			origins: [],
			path: "/",
			serveClient: true,
			pingInterval: 20000,
			pingTimeout: 5000,
			cookie: false,
			maxHttpBufferSize: 1e7,
		}, { ...options }));
		
		socket.on("connection", (socket)=>{
			OnConnect(socket);
		});
		
		socket.on("disconnect", ()=>{
			OnDisConnect(socket);
		});
		
		return socket;
	};
	
	return{
		CreateSocket,
		
	};
})(ATA());