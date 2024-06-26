((ATA)=>{
	const PostgreSQL = ANA.Library.DBMS["PostgreSQL"];
	const config = ANA.Configurations.GetConstant("PostgreSQL");
	
	const {
		GenerateConfig,
		Connect,
		LoadModel,
	} = PostgreSQL;
	
	const Stack = {};
	
	const ScanModels = (sequelize, schema)=>{
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
		});
	};
	
	const Setup = ()=>{
		ANA.DBMS.PostgreSQL.Connection = Connect(GenerateConfig(config));
		ScanModels(ANA.DBMS.PostgreSQL.Connection, config.SCHEMA);
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