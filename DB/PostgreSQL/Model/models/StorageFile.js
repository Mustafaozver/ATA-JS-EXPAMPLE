
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class StorageFile extends Model{
		static associate(models){
			StorageFile.hasOne(models.User, {
				as: "user",
				sourceKey: "user_id",
				foreignKey: "ID",
				constraints: false,
			});
			StorageFile.hasOne(models.StorageFolder, {
				as: "storagefolder",
				sourceKey: "storagefolder_id",
				foreignKey: "ID",
				constraints: false,
			});
		}
	};
	const StorageFileModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		storagename:{
			type: DataTypes.STRING,
			allowNull: false,
		},
		fieldname:{
			type: DataTypes.ENUM,
			values: ["FILE"],
		},
		originalname:{
			type: DataTypes.STRING,
			allowNull: false,
		},
		encoding:{
			type: DataTypes.STRING,
			allowNull: false,
		},
		mimetype:{
			type: DataTypes.STRING,
			allowNull: false,
		},
		type:{
			type: DataTypes.STRING(8),
			allowNull: false,
			defaultValue: "other",
		},
		status:{
			type: DataTypes.ENUM,
			values: ["NEW", "DELETED"],
			defaultValue: "NEW",
		},
		
		// Relationships
		user_id:{
			type: DataTypes.UUID,
			allowNull: false,
			//defaultValue: empty_uuid,
			references: {
				model: "User",
				key: "ID"
			},
		},
		storagefolder_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			//defaultValue: empty_uuid,
			references: {
				model: "StorageFolder",
				key: "ID"
			},
		},
	};
	StorageFile.init(StorageFileModel, {
		sequelize,
		modelName: "StorageFile",
		freezeTableName: true,
		tableName: 'StorageFile',
	});
	return StorageFile;
};