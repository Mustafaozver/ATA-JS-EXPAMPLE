module.exports=((ATA)=>{
	const Redis = ATA.Require("redis");
	
	const GenerateConfig = (opts={})=>{
		return Object.assign({
			"USER": "default",
			"PASSWORD": "redis",
			"HOST": "localhost",
			"PORT": 6379
		}, {...opts});
	};
	
	const Connect = (config)=>{
		const url = "redis://" + config.USER + ":" + config.PASSWORD + "@" + config.HOST + ":" + config.PORT;
		
		return Redis.createClient({url});
		//return Redis.createClient(config.HOST, config.PORT);
	};
	
	return{
		GenerateConfig,
		Connect,
	};
})(ATA());