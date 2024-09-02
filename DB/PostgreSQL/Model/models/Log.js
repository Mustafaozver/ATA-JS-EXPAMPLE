
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Log extends Model{
		static associate(models){
			Log.hasOne(models.User, {
				as: "user",
				sourceKey: "user_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const LogModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		title:{
			type: DataTypes.STRING(512),
			allowNull: false,
		},
		content:{
			type: DataTypes.STRING(8192),
			allowNull: false,
		},
		
		// Relationships
		user_id:{
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
	};
	Log.init(LogModel, {
		sequelize,
		modelName: "Log",
		freezeTableName: true,
		tableName: 'Log',
	});
	return Log;
};