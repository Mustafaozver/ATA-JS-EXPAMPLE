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
			define: {
				charset: "utf8",
				dialectOptions: {
					collate: "utf8_general_ci"
				}
			}
		});
	};
	
	const ExtendedModel = class extends Model{
		static async Create(data){
			return await this.create(data);
		};
		static async Read(where, option={}, order=false){
			const entry = { where, ...option };
			if(order)entry.order = order;
			return await this.findAll(entry);
		};
		static async ReadByID(ID, option={}){
			return await this.findOne({
				where: {
					ID
				},
				...option
			});
		};
		static async Delete(where){
			return await this.destroy({ where, force: true });
		};
		static async Update(data, where){
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
		const Class = class extends ExtendedModel{
			static Associate(models){
				if(modelObject.Associate)modelObject.Associate(models, Class);
				Object.keys(linkObj).map((key)=>{
					const modelDef = linkObj[key];
					Class.hasOne(models[modelDef.references.model], {
						as: key + "_object",
						sourceKey: key,
						foreignKey: "ID",
						constraints: false,
					});
				});
			};
		};
		
		const links = modelObject.Link ? modelObject.Link() : {};
		const linkObj = {};
		
		Object.keys(links).map((item, index)=>{
			const key = "Link_" + item;
			const model = links[item];
			linkObj[key] = {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model,
					key: "ID"
				},
			};
		});
		
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