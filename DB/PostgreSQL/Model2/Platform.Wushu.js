
module.exports = ({ sequelize, DataTypes, Model })=>{
	class Platform extends Model{
		static associate(models){
			Platform.hasOne(models.Category, {
				as: "Link_Category_object",
				sourceKey: "Link_Category",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	
	const PlatformModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		ADDATA: {
			type: DataTypes.JSON,
		},
		Name: {
			type: DataTypes.STRING(128),
			defaultValue: "",
		},
		
		// Relations
		Link_Category:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "Category",
				key: "ID"
			},
		},
	};
	
	Platform.init(PlatformModel, {
		sequelize,
		modelName: "Platform",
		freezeTableName: true,
		tableName: 'Platform',
	});
	return Platform;
};