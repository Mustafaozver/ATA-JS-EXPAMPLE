module.exports=((ATA)=>{
	
	const Session = ANA.DBMS.Cache.GetModel("Session");
	const {Get, Set} = ANA.DBMS.Redis;
	const { Token2Data } = ANA.Security;
	
	const auth_token_regex = /^Bearer (?<token>([^ ]+\.[^ ]+\.[^ ]+))$/;
	
	const CheckToken = async(req)=>{
		const auth = ("" + req.headers["authorization"]);
		if(!auth_token_regex.test(auth))return false;
		
		try{
			const token = auth_token_regex.exec(auth).groups.token;
			const data = await GetSession(token);
			return data;
			
		}catch(e){
			console.error(e);
			return false;
		}
	};
	
	const GetSession = async(token)=>{
		const session_data = Token2Data(token);
		const session_cache = await Get("" + session_data.id);
		return session_cache;
	};
	
	return (req, res, next)=>{
		//req.LOO = "erdhytf";
		
		CheckToken(req).then((data)=>{
			req.Session = data;
			next();
		});
	};
})(ATA());