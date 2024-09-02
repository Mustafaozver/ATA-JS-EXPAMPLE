
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Setting extends Model{
		static associate(models){
			Setting.hasOne(models.User, {
				as: "user",
				sourceKey: "user_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const SettingModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		key:{
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		value:{
			type: DataTypes.STRING(65536),
			allowNull: false,
		},
		module:{
			type: DataTypes.UUID,
			//allowNull: false,
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
	Setting.init(SettingModel, {
		sequelize,
		modelName: "Setting",
		freezeTableName: true,
		tableName: 'Setting',
	});
	return Setting;
};