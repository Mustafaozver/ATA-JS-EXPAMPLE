
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Message extends Model{
		static associate(models){
			Message.hasOne(models.User, {
				as: "sender_user",
				sourceKey: "sender_user_id",
				foreignKey: "ID",
				constraints: false,
			});
			Message.hasOne(models.User, {
				as: "recipient_user",
				sourceKey: "recipient_user_id",
				foreignKey: "ID",
				constraints: false,
			});
			Message.hasOne(models.User, {
				as: "CC_user",
				sourceKey: "CC_user_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const MessageModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		room:{ // daha sonra room oluşturulabilir
			type: DataTypes.STRING,
		},
		title:{
			type: DataTypes.STRING(64),
			allowNull: false,
		},
		content:{
			type: DataTypes.STRING(65536),
			allowNull: false,
		},
		type:{
			type: DataTypes.ENUM,
			values: ["CALL", "TEXT", "FILE"],
		},
		status:{
			type: DataTypes.ENUM,
			values: ["DRAFT", "NEW", "SENT", "RECEIVED", "READ", "DELETED"],
			defaultValue: "DRAFT",
		},
		
		// Relationships
		sender_user_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
		recipient_user_id:{
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
		CC_user_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
	};
	Message.init(MessageModel, {
		sequelize,
		modelName: "Message",
		freezeTableName: true,
		tableName: 'Message',
	});
	return Message;
};