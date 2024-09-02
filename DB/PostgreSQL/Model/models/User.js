
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class User extends Model{
		static associate(models){
			
			User.hasOne(models.JobPosition, {
				as: "jobposition",
				sourceKey: "jobposition_id",
				foreignKey: "ID",
				constraints: false,
			});
			User.hasMany(models.Proxy, {
				as: "proxy",
				foreignKey: "ID",
				constraints: false,
				//sourceKey: "",
			});
			User.hasMany(models.Permission, {
				as: "permission",
				foreignKey: "ID",
				constraints: false,
				//sourceKey: "",
			});
		};
	};
	const UserModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		username:{
			type: DataTypes.STRING(128),
			allowNull: false,
			unique: true,
		},
		password:{
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastaccess:{
			type: DataTypes.DATE,
		},
		
		
	};
	User.init(UserModel, {
		sequelize,
		modelName: "User",
		freezeTableName: true,
		tableName: 'User',
	});
	return User;
};