((ATA)=>{
	const PostgreSQL = ANA.Library.DBMS["PostgreSQL"];
	const config = ANA.Configurations.GetConstant("PostgreSQL");
	
	const {
		DataTypes,
		Op,
		Model,
		GenerateConfig,
		Connect,
	} = PostgreSQL;
	
	const Stack = [];
	
	const ScanModels = ()=>{
		const path = ATA.Path.join(ATA.CWD, "./DB/PostgreSQL/Model/");
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())return;
			const path_parse = ATA.Path.parse(filepath);
			if(path_parse === ".js")return;
			const model = ATA.Require(filepath);
			model.Setup(DataTypes, Op, Model);
			Stack.push(model);
		});
	};
	
	const Setup = ()=>{
		ANA.DBMS.PostgreSQL.Connection = Connect(GenerateConfig(config));
		ScanModels(ANA.DBMS.PostgreSQL.Connection);
	};
	
	ATA.Setups.push(()=>{
		Setup();
	});
	
	ANA.DBMS.PostgreSQL = {
		
	};
})(ATA());