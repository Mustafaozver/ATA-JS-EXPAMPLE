module.exports=((ATA)=>{
	const IO = ATA.Require("socket.io");
	
	const CreateIO = (server, options)=>{
		const io = new IO.Server(server, Object.assign({
			//cors: true,
			//origins: [],
			//path: "/",
			//serveClient: true,
			//pingInterval: 20000,
			//pingTimeout: 5000,
			//cookie: false,
			//maxHttpBufferSize: 1e7,
		}, { ...options }));
		
		return io;
	};
	
	return{
		CreateIO,
		
	};
})(ATA());