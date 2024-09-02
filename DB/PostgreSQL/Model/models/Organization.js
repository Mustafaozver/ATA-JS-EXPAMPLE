
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Organization extends Model{
		static associate(models){
			if(ATA().config.MODE !== "install")Organization.hasOne(models.User, {
				as: "owner_user",
				sourceKey: "owner_user_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const OrganizationModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		name:{
			type: DataTypes.STRING,
			allowNull: false,
		},
		foundingdate:{
			type: DataTypes.DATE,
			allowNull: false
		},
		status:{
			type: DataTypes.ENUM,
			values: ["NEW", "PASSIVE", "ACTIVE"],
			defaultValue: "NEW",
		},
	};
	if(ATA().config.MODE !== "install")OrganizationModel.owner_user_id = {
		type: DataTypes.UUID,
		//allowNull: false,
		//defaultValue: admin_uuid,
		references: {
			model: "User",
			key: "ID"
		},
	};
	Organization.init(OrganizationModel, {
		sequelize,
		modelName: "Organization",
		freezeTableName: true,
		tableName: 'Organization',
	});
	return Organization;
};