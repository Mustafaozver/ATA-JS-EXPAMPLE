((ATA)=>{
	const Security = ANA.Library.Security;
	
	const config = ANA.Configurations.GetConstant("Security");
	
	const privateKey = config.privatekey;
	
	const credentials = {};
	
	(()=>{
		const key_file = ATA.Path.join(ATA.CWD, "./View/ssl/", "key.pem");
		const cert_file = ATA.Path.join(ATA.CWD, "./View/ssl/", "cert.pem");
		credentials.key = ATA.FS.readFileSync(key_file, "utf8");
		credentials.cert = ATA.FS.readFileSync(cert_file, "utf8");
	})();
	
	const GetCredentials = ()=>{
		return{
			...credentials
		};
	};
	
	const GetHash = (text)=>{
		return Security.GetHash(text, privateKey);
	};
	
	const Data2Token = (data)=>{
		return Security.Data2Token(data, privateKey);
	};
	
	const Token2Data = (token)=>{
		return Security.Token2Data(token, privateKey);
	};
	
	const GenerateSessionData = (name, password) => {
		name = name + "";
		password = Security.GetHash(password + "", privateKey);
		const id = Security.GenerateUUIDV4();
		const session = {
			id,
			name,
			password
		};
		const token = Security.Data2Token(session, privateKey);
		return [token, session, session2];
	};
	
	const GenerateUUIDV4 = ()=>{
		return Security.GenerateUUIDV4();
	};
	
	const GenerateRandomText = (len=16)=>{
		const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
		let text = "";
		for(let i=0;i<len;i++)text += chars.charAt(Math.floor(chars.length*Math.random()));
		return text;
	};
	
	ANA.Security = {
		GenerateSessionData,
		GetCredentials,
		GetHash,
		GenerateUUIDV4,
		Data2Token,
		Token2Data,
		GenerateRandomText,
	};
})(ATA());