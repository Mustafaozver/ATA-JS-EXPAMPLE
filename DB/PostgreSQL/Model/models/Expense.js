const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Expense extends Model{
		static associate(models){
			Expense.hasOne(models.AssetType, {
				as: "assettype",
				sourceKey: "assettype_id",
				foreignKey: "ID",
				constraints: false,
			});
			Expense.hasOne(models.FinancialBudget, {
				as: "financialbudget",
				sourceKey: "financialbudget_id",
				foreignKey: "ID",
				constraints: false,
			});
			Expense.hasOne(models.CalendarEvent, {
				as: "calendarevent",
				sourceKey: "calendarevent_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const ExpenseModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		title:{
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		quantity:{
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0,
		},
		details:{
			type: DataTypes.STRING(65536),
			defaultValue: "{}",
		},
		
		// Relationships
		assettype_id:{
			type: DataTypes.UUID,
			allowNull: false,
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
		calendarevent_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			//unique: true,
			references: {
				model: "CalendarEvent",
				key: "ID"
			},
		},
	};
	Expense.init(ExpenseModel, {
		sequelize,
		modelName: "Expense",
		freezeTableName: true,
		tableName: 'Expense',
	});
	return Expense;
};