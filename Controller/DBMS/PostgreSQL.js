((ATA)=>{
	const PostgreSQL = ANA.Library.DBMS["PostgreSQL"];
	const config = ANA.Configurations.GetConstant("PostgreSQL");
	
	const {
		GenerateConfig,
		Connect,
		LoadModel,
		//ConvertColumns,
		//Column,
	} = PostgreSQL;
	
	const Stack = [];
	
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
			Stack.push(columns);
		});
		Stack.filter((model)=>{
			if(model.Associate)return true;
			return false;
		}).map((model)=>{
			model.Associate();
		});
	};
	
	const Setup = ()=>{
		ANA.DBMS.PostgreSQL.Connection = Connect(GenerateConfig(config));
		ScanModels(ANA.DBMS.PostgreSQL.Connection, config.SCHEMA);
		
		setTimeout(()=>{
			//ANA.DBMS.PostgreSQL.Connection.sync({force: true});
		}, 5000)
	};
	
	ATA.Setups.push(()=>{
		Setup();
	});
	
	ANA.DBMS.PostgreSQL = {
		
	};
})(ATA());