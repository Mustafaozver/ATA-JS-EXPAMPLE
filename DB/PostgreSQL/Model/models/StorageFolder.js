
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class StorageFolder extends Model{
		static associate(models){
			StorageFolder.hasOne(models.User, {
				as: "user",
				sourceKey: "user_id",
				foreignKey: "ID",
				constraints: false,
			});
			StorageFolder.hasOne(StorageFolder, {
				as: "storagefolder",
				sourceKey: "storagefolder_id",
				foreignKey: "ID",
				constraints: false,
			});
		}
	};
	const StorageFolderModel = {
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
	StorageFolder.init(StorageFolderModel, {
		sequelize,
		modelName: "StorageFolder",
		freezeTableName: true,
		tableName: 'StorageFolder',
	});
	return StorageFolder;
};