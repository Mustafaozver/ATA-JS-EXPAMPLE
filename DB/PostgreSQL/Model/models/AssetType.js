
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class AssetType extends Model{
		static associate(models){
			AssetType.hasOne(models.Unit, {
				as: "unit",
				sourceKey: "unit_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const AssetTypeModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		name:{
			type: DataTypes.STRING(64),
			allowNull: false,
		},
		symbol:{
			type: DataTypes.STRING(8),
			allowNull: false,
		},
		price:{
			type: DataTypes.FLOAT,
		},
		multiple:{
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 1,
		},
		details:{
			type: DataTypes.STRING(65536),
			defaultValue: "{}",
		},
		
		// Relationships
		unit_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "Unit",
				key: "ID"
			},
		},
	};
	AssetType.init(AssetTypeModel, {
		sequelize,
		modelName: "AssetType",
		freezeTableName: true,
		tableName: 'AssetType',
	});
	return AssetType;
};