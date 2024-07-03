module.exports=((ATA)=>{
	const auth_token_regex = /^Bearer (?<token>([^ ]+\.[^ ]+\.[^ ]+))$/;
	
	const CheckToken = async(req)=>{
		const auth = ("" + req.headers["authorization"]);
		if(!auth_token_regex.test(auth))return false;
		try{
			const token = auth_token_regex.exec(auth).groups.token;
			const data = await ANA.Session.GetSession(token);
			return data;
		}catch(e){
			console.error(e);
			return false;
		}
	};
	
	return (req, res, next)=>{
		CheckToken(req).then((data)=>{
			req.Session = data;
			next();
		});
	};
})(ATA());