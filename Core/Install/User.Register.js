(async(ATA)=>{
	return;
	const Router = ATA.Express.Router;
	
	const AdminUUID = ANA.Configurations.GetAdminUUID();
	const EmptyUUID = ANA.Configurations.GetEmptyUUID();
	
	const { GetHash, GenerateRandomText } = ANA.Security;
	
	const Contact = ANA.DBMS.PostgreSQL.GetModel("Contact");
	const User = ANA.DBMS.PostgreSQL.GetModel("User");
	
	const Tournament = ANA.DBMS.PostgreSQL.GetModel("Tournament");
	const Platform = ANA.DBMS.PostgreSQL.GetModel("Platform");
	const Category = ANA.DBMS.PostgreSQL.GetModel("Category");
	const Member = ANA.DBMS.PostgreSQL.GetModel("Member");
	
	const FT50 = new Date(2050, 1, 1);
	const RNow = new Date();
	
	User.rawAttributes["Link_Reference"].allowNull = true;
	User.rawAttributes["Link_Contact"].allowNull = true;
	
	const password = GenerateRandomText(16);
	
	const rootUserName = "ROOT";
	const rootUserPass = GetHash(password);
	
	const userName = "admin";
	
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
	
	////////////
	
	console.log("\n\n\n");
	console.log(" => USERNAME ==> ", userName);
	console.log(" => PASSWORD ==> ", password);
	
	const Kisiler = ATA.Require("./Core/Install/Kisiler.js");
	
	
	
	
	await Tournament.Create({
		Name: "17 Temmuz 2024",
		ID: EmptyUUID,
	});
	
	const cat__ = await Category.Create({
		Name: "Liste 1",
		Link_Tournament: EmptyUUID,
		ADDATA:{
			Cinsiyet: "E",
			MinAge: 15,
			MaxAge: 17,
			
		}
	});
	
	const cat_ = await Category.Create({
		Name: "Liste 2",
		Link_Tournament: EmptyUUID,
		ADDATA:{
			Cinsiyet: "E",
			MinAge: 15,
			MaxAge: 17,
			
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
				Role: "HAKEM",
				Desk: Math.floor(i / 5 + 1),
			}
		}));
		
		const harf = ["A", "B", "C"];
		
		for(let i=0;i<harf.length;i++)arr.push(Platform.Create({
			Name: "Platform " + harf[i],
			Link_Tournament: EmptyUUID,
		}));
		
		Kisiler.slice(0,100).map((kisi, index)=>{
			arr.push(Member.Create({
				...kisi,
				Link_Category: cat_.dataValues.ID,
				Link_Reference: EmptyUUID,
				ADDATA:{
					Il: index % 81,
					DD: index % 5,
				},
			}));
		});
		
		Kisiler.slice(150, 250).map((kisi, index)=>{
			arr.push(Member.Create({
				...kisi,
				Link_Category: cat__.dataValues.ID,
				Link_Reference: EmptyUUID,
				ADDATA:{
					Il: index % 81,
					DD: index % 5,
				},
			}));
		});
		
		await Promise.all(arr);
	})();
	
	
	
	Router.stack = [];
	
	Router.all("*", (req, res, next)=>{
		res.setHeader("Content-Type", "text/html; charset=UTF-8");
		res.status(200).end("<html><body><h2>" + userName + "</h2><br/><h2>" + password + "</h2></body></html>");
	});
	
})(ATA());