((ATA)=>{
	//...
	const { CompileTS } = ANA.Library.Render;
	
	const SendFunctionSocket = (func = "()=>{}", socketid, ARGS=[])=>{
		const init = "var [a,b,c,d,e,f,g,h] = [...arguments];";
		
		CompileTS(init + "(" + func + ")();").then((CODE)=>{
			ATA.Socket.IO.to(socketid).emit("SCREEN", {
				ARGS,
				CODE,
			});
		});
	};
	
	
	
	const Helper = ATA.Require("./Service/Helper.js");
	
	const TournamentUUID = ANA.Configurations.GetEmptyUUID();
	const Models = {};
	
	let Platforms = {};
	
	const Platform = (()=>{
		
		const Match_Key = Symbol();
		const Bunch_Key = Symbol();
		
		const L_Side_Key = Symbol();
		const R_Side_Key = Symbol();
		
		const HAKEM0_Key = Symbol();
		const HAKEM1_Key = Symbol();
		const HAKEM2_Key = Symbol();
		const HAKEM3_Key = Symbol();
		const HAKEM4_Key = Symbol();
		const HAKEM5_Key = Symbol();
		
		const Class = class{
			Name = "";
			ID = "";
			Current = null;
			Active = false;
			Play = false;
			EndTime = 0;
			DefaultTime = 120000;
			
			Title = "ERKEK BÜYÜKLER LIGHT SANDA 48 KG";
			Round = 1;
			
			L_Side_Name = "";
			R_Side_Name = "";
			
			L_Side_Info = "";
			R_Side_Info = "";
			
			L_Point = 0;
			R_Point = 0;
			
			L_Point1 = 0;
			R_Point1 = 0;
			
			L_Point2 = 0;
			R_Point2 = 0;
			
			L_Point3 = 0;
			R_Point3 = 0;
			
			L_Point4 = 0;
			R_Point4 = 0;
			
			L_Point5 = 0;
			R_Point5 = 0;
			
			L_IHTAR = 0;
			R_IHTAR = 0;
			
			L_IKAZ = 0;
			R_IKAZ = 0;
			
			L_ZSAYMA = 0;
			R_ZSAYMA = 0;
			
			L_CIKIS = 0;
			R_CIKIS = 0;
			
			MatchID = 0;
			BunchID = 0;
			
			[Match_Key] = null;
			[Bunch_Key] = null;
			
			[L_Side_Key] = null;
			[R_Side_Key] = null;
			
			[HAKEM0_Key] = null;
			[HAKEM1_Key] = null;
			[HAKEM2_Key] = null;
			[HAKEM3_Key] = null;
			[HAKEM4_Key] = null;
			[HAKEM5_Key] = null;
			
			constructor(config){
				this.Name = config.Name;
				this.ID = config.ID;
			};
			
			GetResult(){
				
			};
			Check(){
				//ATA.Socket.IO.to(this.ID).emit();
				if(this.Active){
					SendFunctionSocket(()=>{
						Update(a);
					}, this.ID, [this]);
					return;
				}else{
					
				}
			};
			
			async SetBunch(ID){
				const bunch = await Models.Bunch.ReadByID(ID);
				if(bunch){
					this.BunchID = id;
					this[Bunch_Key] = bunch.dataValues;
					return this[Bunch_Key];
				}
				return false;
			};
			
			async SetMatch(ID){
				const match = await Models.Match.ReadByID(ID);
				if(match){
					this[Match_Key] = {
						...(match.dataValues),
						...(match.dataValues.ADDATA),
					};
					this.Active = true;
					this.MatchID = ID;
					
					this[L_Side_Key] = await Models.Member.ReadByID(this[Match_Key].LSide);
					this[R_Side_Key] = await Models.Member.ReadByID(this[Match_Key].RSide);
					
					this.L_Side_Name = this[L_Side_Key].Name;
					this.R_Side_Name = this[R_Side_Key].Name;
					
					this.ReSet();
					this.SetScreen();
					return match.dataValues;
				}
				return false;
			};
			
			async SetHakem(n=0, ID){
				const hakem = await Models.User.ReadByID(ID);
				if(hakem){
					const data = {
						...(hakem.dataValues),
						...(hakem.dataValues.ADDATA)
					};
					switch(n){
						default:
							return false;
						break;
						case 0:
							this[HAKEM0_Key] = data;
						break;
						case 1:
							this[HAKEM1_Key] = data;
						break;
						case 2:
							this[HAKEM2_Key] = data;
						break;
						case 3:
							this[HAKEM3_Key] = data;
						break;
						case 4:
							this[HAKEM4_Key] = data;
						break;
						case 5:
							this[HAKEM5_Key] = data;
						break;
					}
					
					return data;
				}
				return false;
			};
			
			ReSet(){
				this.Active = false;
				this.Play = false;
				SendFunctionSocket(()=>{
					SetWin("Bekleyin...");
				}, this.ID, [this]);
			};
			
			SetPoint(side = "N", n = 0) {
				if (side === "L") this.L_Point = n;
				if (side === "R") this.R_Point = n;
			};
			
			SetScreen(){
				SendFunctionSocket(()=>{
					SetTitle(this.Title);
					SetShowPanel(false);
					SetWin("F");
				}, this.ID, [this]);
			};
		};
		
		return Class;
	})();
	
	const SetSocket = (socket, data)=>{
		const Socket = ATA.Socket;
		
		socket.join(data.W);
		
		socket.emit("WHICH");
	};
	
	const SetSocketHakem = (socket, data)=>{
		const Socket = ATA.Socket;
		
		socket.join("HAKEM");
		
		//socket.emit("HAKEM");
		
		socket.on("HAKEMUPDATE", (data)=>{
			console.log(data);
			const Role = socket.Session.Role;
			
		});
	};
	
	
	
	
	
	
	
	const GetPlatforms = ()=>{
		return Object.keys(Platforms).map((ID)=>{
			return Platforms[ID];
		});
	};
	
	const Setup = ()=>{
		const Router = ATA.Express.Router;
		
		Setup_Router(Router);
		
		////
		
		const User = ANA.DBMS.PostgreSQL.GetModel("User");
		
		const Tournament = ANA.DBMS.PostgreSQL.GetModel("Tournament");
		const Category = ANA.DBMS.PostgreSQL.GetModel("Category");
		const Member = ANA.DBMS.PostgreSQL.GetModel("Member");
		
		Models.User = User;
		Models.Tournament = Tournament;
		Models.Category = Category;
		Models.Member = Member;
		
		////
		
		const Match = ANA.DBMS.PostgreSQL.GetModel("Match");
		const Platform = ANA.DBMS.PostgreSQL.GetModel("Platform");
		const Bunch = ANA.DBMS.PostgreSQL.GetModel("Bunch");
		
		Models.Match = Match;
		Models.Platform = Platform;
		Models.Bunch = Bunch;
		
		Setup_Platform();
	};
	
	const Loop = ()=>{
		ATA.Socket.IO.to("HAKEM").emit("HAKEMUPDATE", GetPlatforms());
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
	
	const Setup_Router = (Router)=>{
		Logger.log("info", "Yayınım sistemler ayağa kaldırılıyor...");
		
		Router.post("/sc/platforms", (req, res, next)=>{
			res.status(200).json(GetPlatforms());
		});
		
		Router.post("/sc/category", (req, res, next)=>{
			GetCategoryList().then((data)=>{
				res.status(200).json(data.map((item)=>{
					return{
						ID: item.dataValues.ID,
						Name: item.dataValues.Name
					}
				}));
			}).catch((err)=>{
				res.status(200).json({
					Error: true,
					Success: false,
					MSG: "" + err,
				});
			});
		});
		
		Router.post("/sc/member", (req, res, next)=>{
			const category_id = req.body.category_id; 
			GetMemberList(category_id).then((data)=>{
				res.status(200).json(data.map((item)=>{
					return{
						...(item.dataValues),
						...(item.dataValues.ADDATA),
					}
				}));
			}).catch((err)=>{
				res.status(200).json({
					Error: true,
					Success: false,
					MSG: "" + err,
				});
			});
		});
		
		Router.post("/sc/fixture", (req, res, next)=>{
			const category_id = req.body.category_id; 
			FixTureCategory(category_id).then((data)=>{
				res.status(200).json(data);
			}).catch((err)=>{
				res.status(200).json({
					Error: true,
					Success: false,
					MSG: "" + err,
				});
			});
		});
		
		Router.post("/sc/bunch", (req, res, next)=>{
			const category_id = req.body.category_id; 
			GetBunchList(category_id).then((data)=>{
				res.status(200).json(data.map((item)=>{
					return{
						ID: item.dataValues.ID,
						Name: item.dataValues.Name,
						Status: item.dataValues.Status,
						...(item.dataValues.ADDATA)
					}
				}));
			}).catch((err)=>{
				res.status(200).json({
					Error: true,
					Success: false,
					MSG: "" + err,
				});
			});
		});
		
		Router.post("/sc/match", (req, res, next)=>{
			const bunch_id = req.body.bunch_id; 
			GetMatchList(bunch_id).then((data)=>{
				CollectMatches(data.dataValues.ADDATA.Match).then((data)=>{
					res.status(200).json(data.map((item, index)=>{
						return {
							...(item).dataValues,
							Name: index,
						};
					}));
				});
			}).catch((err)=>{
				res.status(200).json({
					Error: true,
					Success: false,
					MSG: "" + err,
				});
			});
		});
		
		Router.post("/sc/setmatch", (req, res, next)=>{
			const platform = req.body.platform;
			const match = req.body.match;
			
			Platforms[platform].SetMatch(match);
		});
		
		
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
	
	const FixTureCategory = async(Category_ID)=>{
		const Members = await GetMemberList(Category_ID);
		const part = Helper.Shuffle(Members);
		const group = 20;
		
		const Matches_ = [];
		const Matches = Helper.FixTure(part, class{
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
		
		Matches_.sort((a, b)=>{
			if(a.LEVEL > b.LEVEL)return -1;
			else return 1;
		}).map((item, index)=>{
			Models.Match.Update({
				NO: index
			}, {
				ID: item.ID,
			});
		});
		
		const Groups = (await Promise.all(Helper.BuildGroup(Matches_.map((item)=>{
			return item.ID;
		}), group).map((item, index)=>{
			return Models.Bunch.Create({
				Link_Category: Category_ID,
				Name: "" + index,
				ADDATA: {
					Match:[...item]
				}
			});
		}))).map((item)=>{
			return item.dataValues;
		});;
		
		return{
			List: Matches_,
			Graph: Matches,
			Level: Matches_[0].LEVEL,
			Groups
		}
	};
	
	const GetBunchList = async(Category_ID)=>{
		return await Models.Bunch.Read({
			//Link_Category: Category_ID
		});
	};
	
	const GetMatchList = async (Bunch_ID)=>{
		return await Models.Bunch.ReadByID(Bunch_ID);
	};
	
	const CollectMatches = async(arr)=>{
		const matches = await Promise.all(arr.map((id)=>{
			return Models.Match.ReadByID(id);
		}));
		matches.map((item)=>{
			return{};
		});
	};
	
	const CollectMembers = async(arr)=>{
		return await Promise.all(arr.map((id)=>{
			return Models.Member.ReadByID(id);
		}));
	};
	
	ATA.Loops.push(()=>{
		Loop();
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
	});
	
	ANA.SCENARIO = {
		SetSocket,
		SetSocketHakem,
	};
	
})(ATA());