((ATA)=>{
	const PostgreSQL = ANA.Library.DBMS["PostgreSQL"];
	const config = ANA.Configurations.GetConstant("PostgreSQL");
	
	const {
		DataTypes,
		Op,
		Model,
		ExtendedModel,
		GenerateConfig,
		Connect,
		LoadModel,
		//ConvertColumns,
		//Column,
	} = PostgreSQL;
	
	const Stack = [];
	
	const Column = class{
		Name = "";
		AllowNull = false;
		Value = "";
		constructor(data, obj){
			this.Name = data.Name + "";
			this.AllowNull = data.AllowNull ? true : false;
			this.Value = data.Value || "";
		};
		ToJSON(){
			return{
				allowNull: this.AllowNull,
				defaultValue: this.Value,
			}
		};
		Serialize(){
			return{
				[this.Name]: {
					...(this.ToJSON()),
					type: DataTypes.FLOAT,
				}
			};
		};
	};
	
	const Column_LINK = class extends Column{
		Reference = "";
		constructor(data, obj){
			super(data, obj);
			this.Reference = data.Reference;
		};
		Serialize(){
			return{
				[this.Name]: {
					...(this.ToJSON()),
					type: DataTypes.UUID,
					references: {
						model: this.Reference,
						key: "ID"
					},
				}
			};
		};
	};
	
	const Column_NUMBER = class extends Column{
		
	};
	
	const Columns = {
		"LINK": Column_LINK,
		"NUMBER": Column_NUMBER,
	};
	
	const ConvertColumns = (columns)=>{
		const obj = {};
		columns.map((data)=>{
			Object.assign(obj, (new Column(data, obj)).Serialize());
		});
		return obj;
	};
	
	const ScanModels = (sequelize, schema)=>{
		const path = ATA.Path.join(ATA.CWD, "./DB/PostgreSQL/Model/");
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())return;
			const path_parse = ATA.Path.parse(filepath);
			if(path_parse === ".js")return;
			
			const name = filename.split(".")[0];
			const {columns} = ATA.Require(filepath);
			
			const model = LoadModel(name, ConvertColumns(columns), schema, sequelize);
			Stack.push(model);
		});
		Stack.map((model)=>{
			model.Associate();
		});
	};
	
	const Setup = ()=>{
		ANA.DBMS.PostgreSQL.Connection = Connect(GenerateConfig(config));
		ScanModels(ANA.DBMS.PostgreSQL.Connection, config.SCHEMA);
	};
	
	ATA.Setups.push(()=>{
		Setup();
	});
	
	ANA.DBMS.PostgreSQL = {
		
	};
})(ATA());