
const {Model} = require('sequelize');
const empty_uuid = "FFFFFFFF-FFFF-4FFF-BFFF-FFFFFFFFFFFF";
module.exports = (sequelize, DataTypes)=>{
	class Permission extends Model{
		static associate(models){
			Permission.hasOne(models.User, {
				as: "for_user",
				sourceKey: "for_user_id",
				foreignKey: "ID",
				constraints: false,
			});
			Permission.hasOne(models.User, {
				as: "from_user",
				sourceKey: "from_user_id",
				foreignKey: "ID",
				constraints: false,
			});
			return;
			Permission.hasMany(models.Proxy, {
				as: "assettype",
				sourceKey: "assettype_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const PermissionModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		startdate:{
			type: DataTypes.DATE,
			allowNull: false
		},
		enddate:{
			type: DataTypes.DATE,
			allowNull: false
		},
		level:{
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		
		create_bool:{
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		read_bool:{
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		update_bool:{
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		delete_bool:{
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		create_permission:{
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		create_proxy:{
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		
		title:{
			type: DataTypes.STRING(128),
			//defaultValue: "",
			//allowNull: false
		},
		subtitle:{
			type: DataTypes.STRING(128),
			//defaultValue: "",
			//allowNull: false
		},
		type:{
			type: DataTypes.STRING(128),
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
		from_user_id:{
			type: DataTypes.UUID,
			allowNull: false,
			//defaultValue: empty_uuid,
			references: {
				model: "User",
				key: "ID"
			},
		},
	};
	Permission.init(PermissionModel, {
		sequelize,
		modelName: "Permission",
		freezeTableName: true,
		tableName: 'Permission',
	});
	return Permission;
};