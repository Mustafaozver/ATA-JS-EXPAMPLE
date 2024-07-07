((ATA)=>{
	const { CreateIO } = ANA.Library.Socket;
	const Server = ATA.Express.Server;
	
	const config = ANA.Configurations.GetConstant("Environment");
	
	const GetTime = ()=>{
		const date = new Date();
		return date.getTime();
	};
	
	const LogIn = (socket, data)=>{
		/*
		login işlemleri
		
		*/
		console.log({ data });
		socket.emit("APPROVED");
		socket.join("MEMBERS");
		
	};
	
	
	
	const HeartBeat = ()=>{
		ATA.Socket.IO.to("MEMBERS").emit("HEARTBEAT", GetTime());
	};
	
	const OnConnect = (socket, io)=>{
		socket.on("MSG", (data)=>{
			if(data.M && Routers[data.M])return Routers[data.M](socket.id, data, socket);
		});
		
		//
		socket.emit("SETUP", {
			TIME: GetTime(),
			SID: ATA.ID.UUID,
			CID: socket.id,
			ANA: ANA.Me,
		});
		
		socket.emit("APPROVED");
		socket.join("MEMBERS");
		
		socket.on("LOGIN", async(data)=>{ // FIX
			const auth_token_regex = /^Bearer (?<token>([^ ]+\.[^ ]+\.[^ ]+))$/;
			const auth = "" + data.token;
			if(!auth_token_regex.test(auth))return false;
			try{
				const token = auth_token_regex.exec(auth).groups.token;
				const data = await ANA.Session.GetSession(token);
				socket.Session = JSON.parse(data);
			}catch(e){
				console.error(e);
				return false;
			}
		});
	};
	
	const OnDisConnect = ()=>{
		console.log("IO users => ", ATA.Socket.IO.sockets.clients().length);
	};
	
	ATA.Setups.push(()=>{
		const IO = CreateIO(Server, {
			path: config.SOCKET,
		});
		
		IO.use((socket, next)=>{
			//socket.emit("0");
			next();
		});
		
		IO.on("connection", (socket)=>{
			OnConnect(socket, IO);
		});
		
		IO.on("disconnect", ()=>{
			OnDisConnect();
		});
		
		ATA.Socket.IO = IO;
	});
	
	
	const Routers = {};
	
	ATA.Setups.push(()=>{
		const path = ATA.Path.join(ATA.CWD, "./Controller/Socket/Router");
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())return;
			const path_parse = ATA.Path.parse(filepath);
			if(path_parse === ".js")return;
			const responser = ATA.Require(filepath);
			Routers[filename.split(".")[0].toUpperCase()] = responser;
		});
	});
	
	
	ATA.Setups.push(()=>{
		const path = ATA.Path.join(ATA.CWD, "./Controller/Socket/MiddleWare/");
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())return;
			const path_parse = ATA.Path.parse(filepath);
			if(path_parse === ".js")return;
			const mw = ATA.Require(filepath);
			ATA.Socket.IO.use((socket, next)=>{
				mw(socket);
				next();
			});
		});
	});
	
	ATA.Loops.push(()=>{
		HeartBeat();
	});
	
	ATA.Socket = {
		HeartBeat,
	};
})(ATA());