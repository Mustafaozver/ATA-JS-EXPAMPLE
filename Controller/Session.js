((ATA)=>{
	const {
		GetCredentials,
		GetHash,
		GenerateUUIDV4,
		Data2Token,
		Token2Data,
		GenerateRandomText
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
		const { ID, ADDATA, username, last_login, createdAt} = user.dataValues;
		const { profile_photo, interlocutor_firstname, interlocutor_lastname } = user.dataValues.Link_Contact_object.dataValues;
		
		const client_data = {
			...extras,
			session_id,
			ID,
			profile_photo,
			interlocutor_firstname,
			interlocutor_lastname,
			//expire
		};
		
		const cache_data = {
			...extras,
			ID,
			profile_photo,
			interlocutor_firstname,
			interlocutor_lastname,
		};
		
		Set(session_id, JSON.stringify(cache_data));
		
		return Data2Token(client_data);
	};
	
	const Register = (username="", password="", data={})=>{
		
		const passwordhash = GetHash(password);
		
		User().Create({
			//ID: AdminUUID, // unique
			username,
			password: passwordhash,
			"Link_Reference": AdminUUID,
			"Link_Contact": AdminUUID,
		});
	};
	
	const LogIn = async(username="", password="", extras={})=>{
		const passwordhash = GetHash(password);
		const user_model = User();
		//const contact_model = Contact();
		const user = await user_model.findOne({
			where: {
				username,
				password: passwordhash,
			},
			include: ["Link_Contact_object"],
			attributes: {
				exclude: ["password"],
			},
		});
		
		if(user === null)return false;
		
		const session_token = GenerateSessionData(user, extras);
		
		return session_token;
	};
	
	const GetSession = async(token)=>{
		const session_data = Token2Data(token);
		console.log({ session_data });
		const session_cache = await Get("" + session_data.session_id);
		console.log({ session_data });
		return session_cache;
	};
	
	ATA.Setups.push(()=>{
		setTimeout(()=>{
			LogIn("wushu", "bnxzzF1YbD1loS5i", {sdfggfd:4});
		}, 5000)
		
	});
	
	ANA.Session = {
		Register,
		LogIn,
		GetSession,
	};
})(ATA());