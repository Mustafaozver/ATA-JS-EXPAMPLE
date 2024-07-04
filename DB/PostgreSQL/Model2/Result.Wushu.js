
module.exports = ({ sequelize, DataTypes, Model })=>{
	class Result extends Model{
		static associate(models){
			Result.hasOne(models.Category, {
				as: "Link_Category_object",
				sourceKey: "Link_Category",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	
	const ResultModel = {
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
	
	Result.init(ResultModel, {
		sequelize,
		modelName: "Result",
		freezeTableName: true,
		tableName: 'Result',
	});
	return Result;
};