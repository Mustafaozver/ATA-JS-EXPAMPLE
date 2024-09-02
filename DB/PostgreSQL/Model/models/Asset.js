
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Asset extends Model{
		static associate(models){
			Asset.hasOne(models.AssetType, {
				as: "assettype",
				sourceKey: "assettype_id",
				foreignKey: "ID",
				constraints: false,
			});
			Asset.hasOne(models.FinancialBudget, {
				as: "financialbudget",
				sourceKey: "financialbudget_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const AssetModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		quantity:{
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0,
		},
		duedate:{
			//allowNull: false,
			type: DataTypes.DATE
		},
		details:{
			type: DataTypes.STRING(65536),
			defaultValue: "{}",
		},
		
		// Relationships
		assettype_id:{
			type: DataTypes.UUID,
			allowNull: false,
			//unique: true,
			references: {
				model: "AssetType",
				key: "ID"
			},
		},
		financialbudget_id:{
			type: DataTypes.UUID,
			allowNull: false,
			//unique: true,
			references: {
				model: "FinancialBudget",
				key: "ID"
			},
		},
	};
	Asset.init(AssetModel, {
		sequelize,
		modelName: "Asset",
		freezeTableName: true,
		tableName: 'Asset',
	});
	return Asset;
};