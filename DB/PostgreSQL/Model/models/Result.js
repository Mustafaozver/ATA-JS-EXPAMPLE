
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Result extends Model{
		static associate(models){
			Result.hasOne(models.User, {
				as: "presentto_user",
				sourceKey: "presentto_user_id",
				foreignKey: "ID",
				constraints: false,
			});
			Result.hasOne(models.User, {
				as: "presentby_user",
				sourceKey: "presentby_user_id",
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
		title:{
			type: DataTypes.STRING(128),
			//allowNull: false,
		},
		content:{
			type: DataTypes.STRING(65536),
			allowNull: false,
		},
		status:{
			type: DataTypes.ENUM,
			values: ["PENDING", "DONE"],
			defaultValue: "PENDING",
		},
		
		// Relationships
		presentto_user_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
		presentby_user_id:{
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: "User",
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