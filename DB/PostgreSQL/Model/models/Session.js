// Table for express-session
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Session extends Model{
		static associate(models){
			Session.hasOne(models.User, {
				as: "user",
				sourceKey: "user_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const SessionModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		sid: {
			type: DataTypes.STRING,
			primaryKey: true,
			unique: true,
		},
		expires:{
			type: DataTypes.DATE,
		},
		data:{
			type: DataTypes.STRING(65536),
		},
		
		// Relationships
		user_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
	};
	Session.init(SessionModel, {
		sequelize,
		modelName: "Session",
		freezeTableName: true,
		tableName: 'Session',
	});
	return Session;
};