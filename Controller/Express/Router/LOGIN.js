module.exports=((ATA)=>{
	const { Router } = ANA.Library.HTTP;
	const router = Router();
	
	const session_path = "/session/";
	
	
	// res.redirect('/user');
	const Register = async(username="", password="", data={})=>{
		const resp = await ANA.Session.Register(username, password, {
			...data
			//...
		});
		return{
			MSG: "OK",
			S: true,
			E: false,
			D: resp,
		};
	};
	
	const LogIn = async(username="", password="", data={})=>{
		const resp = await ANA.Session.LogIn(username, password, {
			...data
			//...
		});
		return{
			S: resp ? true : false,
			E: false,
			MSG: resp,
		};
	};
	
	const LogOut = async(session_id)=>{
		const resp = await ANA.Session.LogOut(session_id);
		return {
			MSG: "OK",
			S: true,
			E: false,
			D: resp,
		};
	};
	
	const GetMe = async(data)=>{
		return data;
	};
	
	
	
	router.post(session_path + "register", (req, res, next)=>{
		const username = req.body.username;
		const password = req.body.password;
		
		const remoteAddress = "" + req.connection.remoteAddress;
		const userAgent = "" + req.headers["user-agent"];
		
		Logger.info("REGISTER => " + username + " [" + remoteAddress + "] " + userAgent);
		
		Register(username, password, {
			//...
		}).then((data)=>{
			res.status(200).json(data);
		});
	});
	
	router.post(session_path + "login", (req, res, next)=>{
		
		const username = req.body.username;
		const password = req.body.password;
		
		const remoteAddress = "" + req.connection.remoteAddress;
		const userAgent = "" + req.headers["user-agent"];
		
		Logger.info("LOGIN => " + username + " [" + remoteAddress + "] " + userAgent);
		
		LogIn(username, password, {
			remoteAddress,
			userAgent,
		}).then((data)=>{
			res.status(200).json(data);
		});
	});
	
	router.post(session_path + "logout", (req, res, next)=>{
		LogOut(req.Session.session_id).then((data)=>{
			res.status(200).json(data);
		});
	});
	
	router.post(session_path + "me", (req, res, next)=>{
		GetMe(req.Session).then((data)=>{
			res.status(200).json(data);
		});
	});
	
	return router;
})(ATA());