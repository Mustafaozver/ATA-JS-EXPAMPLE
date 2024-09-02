
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Notification extends Model{
		static associate(models){
			Notification.hasOne(models.User, {
				as: "user",
				sourceKey: "user_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const NotificationModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		title:{
			type: DataTypes.STRING(64),
			allowNull: false,
		},
		content:{
			type: DataTypes.STRING(1024),
			allowNull: false,
		},
		status:{
			type: DataTypes.ENUM,
			values: ["NEW", "READ", "DELETED"],
			defaultValue: "NEW",
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
	Notification.init(NotificationModel, {
		sequelize,
		modelName: "Notification",
		freezeTableName: true,
		tableName: 'Notification',
	});
	return Notification;
};