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
	
	const password = GenerateRandomText(16);
	
	const rootUserName = "admin";
	const rootUserPass = GetHash(password);
	
	const userName = "wushu";
	
	await Contact.create({
		ID: AdminUUID,
		name: "ADDRESS 0",
	});
	
	await User.Create({
		ID: AdminUUID,
		username: rootUserName,
		password: rootUserPass,
		"Link_Reference": AdminUUID,
		"Link_Contact": AdminUUID,
	});
	
	await Contact.create({
		ID: EmptyUUID,
		name: "ADDRESS 0",
	});
	
	await User.Create({
		ID: EmptyUUID,
		username: userName,
		password: rootUserPass,
		"Link_Reference": AdminUUID,
		"Link_Contact": EmptyUUID,
	});
	
	console.log("\n\n\n");
	console.log(" => USERNAME ==> ", userName);
	console.log(" => PASSWORD ==> ", password);
	
	Router.stack = [];
	
	Router.all("*", (req, res, next)=>{
		res.setHeader("Content-Type", "text/html; charset=UTF-8");
		res.status(200).end("<html><body><h2>" + userName + "</h2><br/><h2>" + password + "</h2></body></html>");
	});
	
})(ATA());