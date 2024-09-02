const { Model } = require('sequelize');
const userprofile = "./assets/images/avatar.png";
module.exports = (sequelize, DataTypes)=>{
	class UserPreferences extends Model {
		static associate(models) {
			UserPreferences.hasOne(models.User, {
				as: "user",
				sourceKey: "user_id",
				foreignKey: "ID",
				constraints: false,
			});
			
		};
	};
	const UserPreferencesModel = {
		ID: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		prefix: {
			type: DataTypes.STRING(16),
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		content: {
			type: DataTypes.STRING(65536),
			defaultValue: "{}",
			allowNull: false,
		},
		
		// Relationships
		user_id: {
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
	};
	UserPreferences.init(UserPreferencesModel, {
		sequelize,
		modelName: "UserPreferences",
		freezeTableName: true,
		tableName: 'UserPreferences',
	});
	return UserPreferences;
};