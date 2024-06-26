(async(ATA)=>{
	try{
	
	const ID = ANA.Configurations.GetAdminUUID();
	
	const Contact = ANA.DBMS.PostgreSQL.GetModel("Contact");
	const User = ANA.DBMS.PostgreSQL.GetModel("User");
	
	User.rawAttributes["Link_Reference"].allowNull = true;
	User.rawAttributes["Link_Contact"].allowNull = true;
	
	await Contact.create({
		ID,
		name: "ADDRESS",
	});
	
	
	await User.Create({
		ID,
		username: "username",
		password: "password",
		"Link_Reference": ID,
		"Link_Contact": ID,
	});
	
	User.ReadByID(ID, {
		include: [
			{
				model: User,
				as: "Link_Reference_object",
			}
		]
	}).then((data)=>{
		console.log(" DATA => ", data);
	});
	
	}catch(e){
		console.log(e)
	}
	
})(ATA());