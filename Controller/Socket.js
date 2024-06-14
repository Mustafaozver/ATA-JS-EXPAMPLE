((ATA)=>{
	const { CreateSocket } = ANA.Library.Socket;
	const Server = ATA.Express.Server;
	
	const config = ANA.Configurations.GetConstant("Environment");
	
	ATA.Setups.push(()=>{
		const socket = CreateSocket(Server, {
			path: config.SOCKET,
		});
		
		socket.use((socket, next)=>{
			//
			next();
		});
	});
	
	ATA.Socket = {
		//
	};
})(ATA());