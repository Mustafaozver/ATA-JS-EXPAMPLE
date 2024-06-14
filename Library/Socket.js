module.exports=((ATA)=>{
	const Socket = ATA.Require("socket.io");
	
	console.log({
		Socket
	});
	
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
		
		return socket;
	};
	
	return{
		CreateSocket,
		
	};
})(ATA());