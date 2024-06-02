module.exports=((ATA)=>{
	const Sequelize = ATA.Require("sequelize");
	const {DataTypes, Op, Model} = Sequelize;
	
	const GenerateConfig = (opts={})=>{
		return Object.assign({
			"USER": "postgres",
			"PASSWORD": "postgres",
			"SCHEMA": "postgres",
			"HOST": "localhost",
			"PORT": 5432
		}, {...opts});
	};
	
	const Connect = (config)=>{
		return new Sequelize(
			config.SCHEMA,
			config.USER,
			config.PASSWORD,
			{
				host: config.HOST,
				port: config.PORT,
				dialect: "postgres",
				pool: {
					max: 5,
					min: 0,
					acquire: 30000,
					idle: 10000,
				},
				logging: (log)=>{
					Logger.info(log);
				},
			}
		);
	};
	
	const ExtendedModel = class extends Model{
		static Init(model, sequelize, columns){
			model.init(Object.assign(columns, BindingModel()), {
				sequelize,
				modelName: model.name,
				freezeTableName: true,
				tableName: model.name,
			});
		};
		async Create(data){
			return await this.create(data);
		};
		async Read(where, order=false){
			const entry = { where };
			if(order)entry.order = order;
			return await this.findAll(entry);
		};
		async ReadByID(ID){
			return await this.findOne({
				where: {
					ID
				}
			});
		};
		async Delete(where){
			return await this.destroy({ where });
		};
		async Update(data, where){
			return await this.update(data, { where });
		};
	};
	
	const BindingModel = ()=>{
		return{
			ID: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				unique: true,
			},
			ADDATA:{
				type: DataTypes.JSON,
			}
		};
	};
	
	const LoadModel = (path, conn)=>{
		const model = ATA.Require(filepath);
		model.Setup(conn, DataTypes, Op, ExtendedModel);
		//model.Init();
		return model;
	};
	
	return{
		DataTypes,
		Op,
		Model,
		ExtendedModel,
		GenerateConfig,
		Connect,
		LoadModel,
	};
})(ATA());