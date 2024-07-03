((ATA)=>{
	const Redis = ANA.Library.DBMS["Redis"];
	const config = ANA.Configurations.GetConstant("Redis");
	
	const {
		GenerateConfig,
		Connect,
	} = Redis;
	
	let isConnected = false;
	
	const Setup = ()=>{
		const conn = Connect(GenerateConfig(config));
		conn.connect();
		
		conn.on("connect", ()=>{
			Logger.info("Redis is connected.");
			isConnected = true;
		});
		
		conn.on("error", (err)=>{
			Logger.error("Redis Error.", err);
		});
		
		conn.on("end", (err)=>{
			Logger.info("Redis is disconnected!!!");
			isConnected = false;
		});
		
		ANA.DBMS.Redis.Connection = conn;
	};
	
	const set_config = {
		EX: 60 * 60 * 24 * 7, // 1 hafta zaman sınırlı
		NX: true
	};
	
	const Get = (key)=>{
		return ANA.DBMS.Redis.Connection.get(key + "_");
	};
	
	const Set = (key, value, config={})=>{
		return ANA.DBMS.Redis.Connection.set(key + "_", value + "", Object.assign({ ...set_config }, config));
	};
	
	ATA.Setups.push(()=>{
		Setup();
	});
	
	ANA.DBMS.Redis = {
		Set,
		Get,
	};
})(ATA());