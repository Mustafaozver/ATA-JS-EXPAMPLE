((ATA)=>{
	const {
		GetCredentials,
		GetHash,
		GenerateUUIDV4,
		Data2Token,
		Token2Data,
		GenerateRandomText,
	} = ANA.Security;
	
	const { Get, Set } = ANA.DBMS.Redis;
	
	const config = ANA.Configurations.GetConstant("Environment");
	
	const Session = ANA.DBMS.Cache.GetModel("Session");
	
	const AdminUUID = ANA.Configurations.GetAdminUUID();
	const EmptyUUID = ANA.Configurations.GetEmptyUUID();
	
	const User = ()=>{
		const model = ANA.DBMS.PostgreSQL.GetModel("User");
		return model;
	};
	
	const Contact = ()=>{
		const model = ANA.DBMS.PostgreSQL.GetModel("Contact");
		return model;
	};
	
	const GenerateSessionData = (user, extras)=>{
		const session_id = GenerateUUIDV4();
		const { ID, ADDATA, UserName, FirstName, LastName, LastLogin, createdAt} = user.dataValues;
		const { ProfilePhoto } = user.dataValues.Link_Contact_object.dataValues;
		
		const client_data = {
			...extras,
			session_id,
			ID,
			UserName,
			//expire
		};
		
		const cache_data = {
			...extras,
			...ADDATA,
			session_id, //
			ID,
			UserName,
			FirstName,
			LastName,
			ProfilePhoto,
		};
		
		Set(session_id, JSON.stringify(cache_data));
		
		return Data2Token(client_data);
	};
	
	const Register = async(UserName="", PassWord="", data={})=>{
		
		const PassWordHash = GetHash(PassWord);
		
		User().Create({
			//ID: AdminUUID, // unique
			UserName,
			PassWord: PassWordHash,
			"Link_Reference": AdminUUID,
			"Link_Contact": AdminUUID,
		});
	};
	
	const LogIn = async(UserName="", PassWord="", extras={})=>{
		const PassWordHash = GetHash(PassWord);
		const user_model = User();
		
		console.log({
			UserName,
			PassWord
		});
		
		//const contact_model = Contact();
		const user = await user_model.findOne({
			where: {
				UserName,
				PassWord: PassWordHash,
			},
			include: ["Link_Contact_object"],
			attributes: {
				exclude: ["PassWord"],
			},
		});
		
		if(user === null)return false;
		
		const session_token = GenerateSessionData(user, extras);
		
		return session_token;
	};
	
	const LogOut = ()=>{
		return "OK";
	};
	
	const GetSession = async(token)=>{
		const session_data = Token2Data(token);
		const session_cache = await Get("" + session_data.session_id);
		return session_cache;
	};
	
	ATA.Setups.push(()=>{
		
	});
	
	ANA.Session = {
		Register,
		LogIn,
		LogOut,
		GetSession,
	};
})(ATA());