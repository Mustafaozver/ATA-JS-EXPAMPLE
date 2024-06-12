module.exports=((ATA)=>{
	const Sequelize = ATA.Require("sequelize");
	const {DataTypes, Op, Model} = Sequelize;
	
	const GenerateConfig = (opts={})=>{
		return Object.assign({
			MEMORY: opts.MEMORY ? ATA.Path.join(ATA.CWD, opts.MEMORY) : ":memory:",
		}, {...opts});
	};
	
	const Connect = (config)=>{
		return new Sequelize({
			dialect: "sqlite",
			storage: config.MEMORY || ":memory:",
			pool: {
				max: 1,
				idle: Infinity,
				maxUses: Infinity
			},
			logging: (log) => {
				Logger.info(log);
			},
		});
	};
	
	const ExtendedModel = class extends Model{
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
				/*
				
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoincement: true,
				
				*/
			},
			ADDATA:{
				type: DataTypes.JSON,
			}
		};
	};
	
	const LoadModel = (name, modelObject, schema="public", sequelize)=>{ // sequelize : conn
		const Class = class extends ExtendedModel{};
		Class.init(Object.assign(modelObject.Definition(DataTypes), BindingModel()), {
			sequelize,
			schema,
			modelName: name,
			freezeTableName: true,
			tableName: name,
		});
		return Class;
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