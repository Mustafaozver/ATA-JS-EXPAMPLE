
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class User extends Model{
		static associate(models){
			if(ATA().config.MODE !== "install"){
				User.hasOne(User, {
					as: "reference_user",
					sourceKey: "reference_user_id",
					foreignKey: "ID",
					constraints: false,
				});
				User.hasOne(models.Organization, {
					as: "organization",
					sourceKey: "organization_id",
					foreignKey: "ID",
					constraints: false,
				});
				User.hasOne(models.Contact, {
					as: "contact",
					sourceKey: "contact_id",
					foreignKey: "ID",
					constraints: false,
				});
			}
			
			User.hasOne(models.JobPosition, {
				as: "jobposition",
				sourceKey: "jobposition_id",
				foreignKey: "ID",
				constraints: false,
			});
			User.hasOne(User, {
				as: "partner_user",
				sourceKey: "partner_user_id",
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
		
		// Relationships
		/*reference_user_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},*/
		/*organization_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "Organization",
				key: "ID"
			},
		},*/
		jobposition_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "JobPosition",
				key: "ID"
			},
		},
		partner_user_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			//defaultValue: ATA().ADMINISTRATORID,
			references: {
				model: "User",
				key: "ID"
			},
		},
		contact_id:{
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: "Contact",
				key: "ID"
			},
		},
		
	};
	if(ATA().config.MODE !== "install"){
		UserModel.reference_user_id = {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: ATA().ADMINISTRATORID,
			references: {
				model: "User",
				key: "ID"
			},
		};
		UserModel.organization_id = {
			type: DataTypes.UUID,
			allowNull: false,
			//defaultValue: ATA().ADMINISTRATORID,
			references: {
				model: "Organization",
				key: "ID"
			},
		};
	}
	User.init(UserModel, {
		sequelize,
		modelName: "User",
		freezeTableName: true,
		tableName: 'User',
	});
	return User;
};