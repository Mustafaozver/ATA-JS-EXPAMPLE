((ATA)=>{
	const {
		GenerateSessionData,
		GetCredentials,
		GetHash,
		GenerateUUIDV4,
		Data2Token,
		Token2Data,
		GenerateRandomText} = ANA.Library.Security;
	
	const { Get, Set } = ANA.DBMS.Redis;
	
	const config = ANA.Configurations.GetConstant("Environment");
	
	const User = ANA.DBMS.PostgreSQL.GetModel("User");
	const Contact = ANA.DBMS.PostgreSQL.GetModel("Contact");
	
	const Session = ANA.DBMS.Cache.GetModel("Session");
	
	
	const AdminUUID = ANA.Configurations.GetAdminUUID();
	const EmptyUUID = ANA.Configurations.GetEmptyUUID();
	
	const Register = (username="", password="", data={})=>{
		
		const passwordhash = GetHash(password);
		
		User.Create({
			//ID: AdminUUID, // unique
			username,
			password: passwordhash,
			"Link_Reference": AdminUUID,
			"Link_Contact": AdminUUID,
		});
	};
	
	const LogIn = async (username="", password="")=>{
		const passwordhash = GetHash(password);
		const user_model = await User.findOne({
			where: {
				username,
				//password: passwordhash,
			},
			include: [
				{
					model: Contact,
					as: "Link_Contact"
				}
			],
			attributes: {
				exclude: ["password"],
			},
		});
		
		if(user_model === null)return false;
		
		console.log("USER => ", user_model);
	};
	
	const GetSession = async(token)=>{
		const session_data = Token2Data(token);
		const session_cache = await Get("" + session_data.id);
		return session_cache;
	};
	
	ATA.Setups.push(()=>{
		LogIn();
	});
	
	ANA.Session = {
		Register,
		LogIn,
		GetSession,
	};
})(ATA());