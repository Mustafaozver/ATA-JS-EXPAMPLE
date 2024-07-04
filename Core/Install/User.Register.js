(async(ATA)=>{
	const Router = ATA.Express.Router;
	
	const AdminUUID = ANA.Configurations.GetAdminUUID();
	const EmptyUUID = ANA.Configurations.GetEmptyUUID();
	
	const { GetHash, GenerateRandomText } = ANA.Security;
	
	const Contact = ANA.DBMS.PostgreSQL.GetModel("Contact");
	const User = ANA.DBMS.PostgreSQL.GetModel("User");
	
	const FT50 = new Date(2050, 1, 1);
	const RNow = new Date();
	
	User.rawAttributes["Link_Reference"].allowNull = true;
	User.rawAttributes["Link_Contact"].allowNull = true;
	
	const password = "wushu";//GenerateRandomText(16);
	
	const rootUserName = "admin";
	const rootUserPass = GetHash(password);
	
	const userName = "wushu";
	
	await Contact.create({
		ID: AdminUUID,
		Name: "ADDRESS 0",
	});
	
	await User.Create({
		ID: AdminUUID,
		UserName: rootUserName,
		PassWord: rootUserPass,
		"Link_Reference": AdminUUID,
		"Link_Contact": AdminUUID,
		ADDATA: {
			Role: "ROOT"
		}
	});
	
	await Contact.create({
		ID: EmptyUUID,
		name: "ADDRESS 0",
	});
	
	await User.Create({
		ID: EmptyUUID,
		UserName: userName,
		PassWord: rootUserPass,
		"Link_Reference": AdminUUID,
		"Link_Contact": EmptyUUID,
		ADDATA: {
			Role: "ROOT"
		}
	});
	
	await(async()=>{
		const arr = [];
		
		for(let i=0;i<3;i++)arr.push(User.Create({
			UserName: userName + "_bhakem_" + i,
			PassWord: rootUserPass,
			"Link_Reference": EmptyUUID,
			"Link_Contact": EmptyUUID,
			ADDATA: {
				Role: "HAKEM",
				Desk: 0,
			}
		}));
		
		for(let i=0;i<15;i++)arr.push(User.Create({
			UserName: userName + "_hakem_" + i,
			PassWord: rootUserPass,
			"Link_Reference": EmptyUUID,
			"Link_Contact": EmptyUUID,
			ADDATA: {
				role: "HAKEM",
				desk: Math.floor(i / 5 + 1),
			}
		}));
		
		await Promise.all(arr);
	})();
	
	console.log("\n\n\n");
	console.log(" => USERNAME ==> ", userName);
	console.log(" => PASSWORD ==> ", password);
	
	Router.stack = [];
	
	Router.all("*", (req, res, next)=>{
		res.setHeader("Content-Type", "text/html; charset=UTF-8");
		res.status(200).end("<html><body><h2>" + userName + "</h2><br/><h2>" + password + "</h2></body></html>");
	});
	
})(ATA());