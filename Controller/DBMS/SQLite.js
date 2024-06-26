((ATA)=>{
	const SQLite = ANA.Library.DBMS["SQLite"];
	const config = ANA.Configurations.GetConstant("SQLite");
	
	const {
		GenerateConfig,
		Connect,
		LoadModel,
	} = SQLite;
	
	const Stack = {};
	
	const ScanModels = (sequelize, schema)=>{
		const path = ATA.Path.join(ATA.CWD, "./DB/SQLite/Model/");
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
		});
	};
	
	const Setup = ()=>{
		ANA.DBMS.SQLite.Connection = Connect(GenerateConfig(config));
		ScanModels(ANA.DBMS.SQLite.Connection, config.SCHEMA);
	};
	
	ATA.Setups.push(()=>{
		Setup();
	});
	
	const GetModel = (name="")=>{
		return Stack[name] || false;
	};
	
	ANA.DBMS.SQLite = {
		GetModel,
	};
})(ATA());