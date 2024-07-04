((ATA)=>{
	//...
	const Models = {};
	let ACTIVE_CATEGORY_ID = "";
	
	let Platforms = {};
	
	const Platform = class{
		Name = "";
		Current = null;
		constructor(config){
			this.Name = config.Name;
		};
		Check(){
			
		};
		
	};
	
	const Setup = ()=>{
		const Router = ATA.Express.Router;
		const Socket = ATA.Socket;
		
		const Platform = ANA.DBMS.PostgreSQL.GetModel("Platform");
		
		const Category = ANA.DBMS.PostgreSQL.GetModel("Category");
		const Gamer = ANA.DBMS.PostgreSQL.GetModel("Gamer");
		const Result = ANA.DBMS.PostgreSQL.GetModel("Result");
		
		/*
		const Result = ANA.DBMS.PostgreSQL.GetModel("Result");
		const Result = ANA.DBMS.PostgreSQL.GetModel("Result");
		const Result = ANA.DBMS.PostgreSQL.GetModel("Result");
		*/
		
		Models.Platform = Platform;
		Models.Category = Category;
		Models.Gamer = Gamer;
		Models.Result = Result;
		
		
		Models.Platform = Platform;
		
		
		Setup_Platform(Platform);
	};
	
	const Setup_Platform = (model)=>{
		Platforms = {};
		model.findAll({
			where:{
				Link_Category: ACTIVE_CATEGORY_ID,
			}
		}).then((data)=>{
			[...data].map((item)=>{
				Platforms[item.ID] = new Platform(item);
			});
		});
	};
	
	ATA.Loops.push(()=>{
		Object.keys(Platforms).map((key)=>{
			Platforms[key].Check();
		});
	});
	
	ATA.Setups.push(()=>{
		console.log("\n\n\n\n");
		Logger.debug("Sistem Başlatılıyor...");
		ATA.Require("./Controller/Compile.js");
		
		Setup();
	});
})(ATA());