((ATA)=>{
	const { CreateSocket } = ANA.Library.Socket;
	const Server = ATA.Express.Server;
	
	const config = ANA.Configurations.GetConstant("Environment");
	
	const options = {
		cors: true,
		origins: [],
		path: config.SOCKET,
		serveClient: true,
		pingInterval: 20000,
		pingTimeout: 5000,
		cookie: false,
		maxHttpBufferSize: 1e7,
	};
	
	ATA.Setups.push(()=>{
		const socket = CreateSocket(Server, {
			path: config.SOCKET,
		});
		
		socket.use((socket, next)=>{
			//
			next();
		});
		
		socket.
	});
	
	ATA.Socket = {
		//
	};
})(ATA());