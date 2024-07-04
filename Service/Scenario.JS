((ATA)=>{
	//...
	
	const Helper = ATA.Require("./Service/Helper.js");
	
	const TournamentUUID = ANA.Configurations.GetEmptyUUID();
	const Models = {};
	
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
		
		Setup_Router(Router, Socket);
		
		const Tournament = ANA.DBMS.PostgreSQL.GetModel("Tournament");
		const Category = ANA.DBMS.PostgreSQL.GetModel("Category");
		const Member = ANA.DBMS.PostgreSQL.GetModel("Member");
		
		Models.Tournament = Tournament;
		Models.Category = Category;
		Models.Member = Member;
		
		
		
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
	
	const Setup_Router = (Router, Socket)=>{
		Logger.log("info", "Yayınım sistemler ayağa kaldırılıyor...");
	};
	
	const GetMemberList = async(Category_ID)=>{
		return await Models.Member.Read({
			Link_Category: Category_ID,
		});
	};
	
	const GetCategoryList = async()=>{
		return await Models.Category.Read({
			Link_Tournament: TournamentUUID,
		});
	};
	
	
	
	
	
	ATA.Loops.push(()=>{
		return;
		Object.keys(Platforms).map((key)=>{
			Platforms[key].Check();
		});
	});
	
	const TEMP = async()=>{
		const Category_ID = (await GetCategoryList())[0].dataValues.ID;
		console.log("Category_ID => ", Category_ID);
		
		const Members = (await GetMemberList(Category_ID)).map((item)=>{
			return{
				...(item.dataValues),
				...(item.dataValues.ADDATA)
			};
		});
		
		console.log("MEMBERS [5] => ", Members[5]);
		
		
	};
	
	ATA.Setups.push(()=>{
		console.log("\n\n\n\n");
		Logger.info("Sistem Başlatılıyor...");
		ATA.Require("./Controller/Compile.js");
		
		Setup();
		
		setTimeout(()=>{
			TEMP();
		}, 5000);
	});
})(ATA());