
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Proxy extends Model{
		static associate(models){
			Proxy.hasOne(models.User, {
				as: "for_user",
				sourceKey: "for_user_id",
				foreignKey: "ID",
				constraints: false,
			});
			Proxy.hasOne(models.Permission, {
				as: "permission",
				sourceKey: "permission_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const ProxyModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		startdate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		enddate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		
		// Relationships
		for_user_id:{
			type: DataTypes.UUID,
			allowNull: false,
			//defaultValue: empty_uuid,
			references: {
				model: "User",
				key: "ID"
			},
		},
		permission_id:{
			type: DataTypes.UUID,
			allowNull: false,
			//defaultValue: empty_uuid,
			references: {
				model: "Permission",
				key: "ID"
			},
		},
	};
	Proxy.init(ProxyModel, {
		sequelize,
		modelName: "Proxy",
		freezeTableName: true,
		tableName: 'Proxy',
	});
	return Proxy;
};