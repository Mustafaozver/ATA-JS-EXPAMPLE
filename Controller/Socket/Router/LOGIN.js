module.exports=((ATA)=>{
	return;
	const auth_token_regex = /^Bearer (?<token>([^ ]+\.[^ ]+\.[^ ]+))$/;
	
	const CheckToken = async(req)=>{
		const auth = ("" + req.headers["authorization"]);
		if(!auth_token_regex.test(auth))return false;
		try{
			const token = auth_token_regex.exec(auth).groups.token;
			const data = await ANA.Session.GetSession(token);
			return JSON.parse(data);
		}catch(e){
			console.error(e);
			return false;
		}
	};
	
	return (socketid, data, socket)=>{
		console.log(data);
	};
})(ATA());