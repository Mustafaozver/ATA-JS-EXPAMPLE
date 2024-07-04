((ATA)=>{
	const PostgreSQL = ANA.Library.DBMS["PostgreSQL"];
	const config = ANA.Configurations.GetConstant("PostgreSQL");
	
	const {
		GenerateConfig,
		Connect,
		LoadModel,
		Sequelize, // FIX
		
		DataTypes,
		Op,
		Model,
		ExtendedModel,
	} = PostgreSQL;
	
	const Stack = {};
	
	const ScanModels = (sequelize, schema)=>{
		return;
		const path = ATA.Path.join(ATA.CWD, "./DB/PostgreSQL/Model/");
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())return;
			const path_parse = ATA.Path.parse(filepath);
			if(path_parse === ".js")return;
			
			const name = filename.split(".")[0];
			const columns = ATA.Require(filepath);
			
			const model = LoadModel(name, (columns), schema, sequelize);
			Stack[name] = model;
		});
		
		Object.keys(Stack).map((key)=>{
			return Stack[key];
		}).map((model)=>{
			model.Associate(Stack);
			model.sync({
				force: true,
				alter: true
			});
			console.log({...(model)});
		});
	};
	
	const ScanModels2 = (sequelize, schema)=>{ //FIX
		const db = {
			sequelize,
			Sequelize,
		};
		const modelList = [];
		const modelsFolder = ATA.Path.join(ATA.CWD, "./DB/PostgreSQL/Model2/");
		const modelsFiles = ATA.FS.readdirSync(modelsFolder);
		
		modelsFiles.map((modelfilename)=>{
			const modelfile = ATA.Path.join(modelsFolder, "./", modelfilename);
			if (ATA.FS.statSync(modelfile).isDirectory()) return;
			const name = modelfilename.split(".")[0];
			const model = ATA.Require(modelfile)({
				sequelize,
				DataTypes: Sequelize.DataTypes,
				Model: ExtendedModel,
			});
			db[name] = model;
			modelList.push(model.name);
		});
		
		modelList.map((modelname)=>{
			db[modelname].associate(db);
		});
		
		Object.assign(Stack, {...db});
	};
	
	const Setup = ()=>{
		ANA.DBMS.PostgreSQL.Connection = Connect(GenerateConfig(config));
		ScanModels(ANA.DBMS.PostgreSQL.Connection, config.SCHEMA);
		ScanModels2(ANA.DBMS.PostgreSQL.Connection, config.SCHEMA); // FIX
	};
	
	ATA.Setups.push(()=>{
		Setup();
	});
	
	const GetModel = (name="")=>{
		return Stack[name] || false;
	};
	
	ANA.DBMS.PostgreSQL = {
		GetModel,
	};
})(ATA());