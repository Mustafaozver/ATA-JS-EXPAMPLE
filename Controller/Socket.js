((ATA)=>{
	const { CreateSocket } = ANA.Library.Socket;
	const Server = ATA.Express.Server;
	
	const config = ANA.Configurations.GetConstant("Environment");
	
	const GetTime = ()=>{
		const date = new Date();
		return date.getTime();
	};
	
	const HeartBeat = ()=>{
		ATA.Socket.socket.to("MEMBERS").emit("HEARTBEAT", GetTime());
	};
	
	ATA.Setups.push(()=>{
		const socket = CreateSocket(Server, {
			path: config.SOCKET,
		});
		
		ATA.Socket.socket = socket;
	});
	
	ATA.Setups.push(()=>{
		const path = ATA.Path.join(ATA.CWD, "./Controller/Socket/MiddleWare/");
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())return;
			const path_parse = ATA.Path.parse(filepath);
			if(path_parse === ".js")return;
			const mw = ATA.Require(filepath);
			ATA.Socket.socket.use((socket, next)=>{
				mw(socket, next);
			});
		});
	});
	
	
	ATA.Setups.push(()=>{
		const path = ATA.Path.join(ATA.CWD, "./Controller/Socket/Router/");
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())return;
			const path_parse = ATA.Path.parse(filepath);
			if(path_parse === ".js")return;
			const group = ATA.Require(filepath);
			ATA.Socket.socket.use((socket, next)=>{
				socket.on(filename.split(".")[0].toUpperCase(), (data)=>{
					group(socket, data);
				});
			});
		});
	});
	
	ATA.Socket = {
		HeartBeat,
	};
})(ATA());