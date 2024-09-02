
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class FinancialOffer extends Model{
		static associate(models){
			FinancialOffer.hasOne(models.FinancialBudget, {
				as: "financialbudget",
				sourceKey: "financialbudget_id",
				foreignKey: "ID",
				constraints: false,
			});
			FinancialOffer.hasOne(models.AssetType, {
				as: "instrument_assettype",
				sourceKey: "instrument_assettype_id",
				foreignKey: "ID",
				constraints: false,
			});
			FinancialOffer.hasOne(models.AssetType, {
				as: "base_assettype",
				sourceKey: "base_assettype_id",
				foreignKey: "ID",
				constraints: false,
			});
			FinancialOffer.hasOne(models.User, {
				as: "responsibleof_user",
				sourceKey: "responsibleof_user_id",
				foreignKey: "ID",
				constraints: false,
			});
			FinancialOffer.hasOne(models.CalendarEvent, {
				as: "calendarevent",
				sourceKey: "calendarevent_id",
				foreignKey: "ID",
				constraints: false,
			});
			FinancialOffer.hasOne(models.Result, {
				as: "result",
				sourceKey: "result_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const FinancialOfferModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		price:{
			type: DataTypes.FLOAT,
		},
		quantity:{
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 1,
		},
		partner:{
			type: DataTypes.STRING,
		},
		details:{
			type: DataTypes.STRING(65536),
			defaultValue: "{}",
		},
		duedate:{
			//allowNull: false,
			type: DataTypes.DATE
		},
		status:{
			type: DataTypes.ENUM,
			values: ["NEW", "REJECTED", "CONFIRMATED", "DONE", "GUARANTEED", "REPAIR", "RETURN"],
			defaultValue: "NEW",
		},
		
		// Relationships
		financialbudget_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			//unique: true,
			references: {
				model: "FinancialBudget",
				key: "ID"
			},
		},
		instrument_assettype_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			//unique: true,
			references: {
				model: "AssetType",
				key: "ID"
			},
		},
		base_assettype_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			//unique: true,
			references: {
				model: "AssetType",
				key: "ID"
			},
		},
		responsibleof_user_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
		calendarevent_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			//unique: true,
			references: {
				model: "CalendarEvent",
				key: "ID"
			},
		},
		result_id:{
			type: DataTypes.UUID,
			allowNull: false,
			unique: true,
			references: {
				model: "Result",
				key: "ID"
			},
		},
	};
	FinancialOffer.init(FinancialOfferModel, {
		sequelize,
		modelName: "FinancialOffer",
		freezeTableName: true,
		tableName: 'FinancialOffer',
	});
	return FinancialOffer;
};