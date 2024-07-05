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
			console.log(config);
			this.Name = config.Name;
		};
		Check(){
			
		};
		
	};
	
	const Setup = ()=>{
		const Router = ATA.Express.Router;
		const Socket = ATA.Socket;
		
		Setup_Router(Router, Socket);
		
		////
		
		const Tournament = ANA.DBMS.PostgreSQL.GetModel("Tournament");
		const Category = ANA.DBMS.PostgreSQL.GetModel("Category");
		const Member = ANA.DBMS.PostgreSQL.GetModel("Member");
		
		Models.Tournament = Tournament;
		Models.Category = Category;
		Models.Member = Member;
		
		////
		
		const Match = ANA.DBMS.PostgreSQL.GetModel("Match");
		const Platform = ANA.DBMS.PostgreSQL.GetModel("Platform");
		
		Models.Match = Match;
		Models.Platform = Platform;
		
		Setup_Platform();
	};
	
	const Setup_Platform = ()=>{
		Platforms = {};
		Models.Platform.Read({
			Link_Tournament: TournamentUUID,
		}).then((data)=>{
			[...data].map((item)=>{
				Platforms[item.dataValues.ID] = new Platform(item.dataValues);
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
	
	const CollectMembers = async(arr)=>{
		return await Promise.all(arr.map((id)=>{
			return Models.Member.ReadByID(id);
		}));
	};
	
	ATA.Loops.push(()=>{
		return;
		Object.keys(Platforms).map((key)=>{
			Platforms[key].Check();
		});
	});
	
	const TEMP = async()=>{
		console.log("\n\n\n\n\n");
		const Category_ID = (await GetCategoryList())[0].dataValues.ID;
		
		const Members = (await GetMemberList(Category_ID)).map((item)=>{
			return{
				...(item.dataValues),
				...(item.dataValues.ADDATA)
			};
		});
		
		const part = Helper.Shuffle(Members).slice(0,400).map((item)=>{
			return item.ID;
		});
		
		const part2 = await CollectMembers(part);
		
		const Matches_ = [];
		const Matches = Helper.FixTure(part2, class{
			constructor(l, r, n){
				this.LSide = l;
				this.RSide = r;
				this.LEVEL = n;
				this.ID = false;
			};
			async Save(){
				const lid = await(async(side)=>{
					if(!side.ID)await side.Save();
					return side.ID;
				})(this.LSide);
				
				const rid = await(async(side)=>{
					if(!side.ID)await side.Save();
					return side.ID;
				})(this.RSide);
				
				const match = await Models.Match.Create({
					NO: 5,
					Time: new Date(),
					LSide: lid,
					RSide: rid,
					Level: this.LEVEL,
				});
				
				this.ID = match.dataValues.ID;
				
				Matches_.push({
					LEVEL: this.LEVEL,
					ID: match.dataValues.ID,
				});
			};
		});
		
		await Matches.Save();
		
		console.log(Matches_.sort((a, b)=>{
			if(a.LEVEL > b.LEVEL)return -1;
			else return 1;
		}).map((item, index)=>{
			Models.Match.Update({
				NO: index
			}, {
				ID: item.ID,
			});
		}));
		
		ATA.FS.writeFileSync("./MERHABA.JSON", JSON.stringify(Matches, null, "\t"), "UTF8");
	};
	
	ATA.Setups.push(()=>{
		console.log("\n\n\n\n");
		Logger.info("Sistem Başlatılıyor...");
		ATA.Require("./Controller/Compile.js");
		
		Setup();
		
		return;
		
		setTimeout(()=>{
			TEMP();
		}, 5000);
	});
})(ATA());