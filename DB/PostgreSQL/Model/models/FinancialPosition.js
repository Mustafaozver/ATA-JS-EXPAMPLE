
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class FinancialPosition extends Model{
		static associate(models){
			FinancialPosition.hasOne(models.FinancialBudget, {
				as: "financialbudget",
				sourceKey: "financialbudget_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const FinancialPositionModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		name:{
			type: DataTypes.STRING(128),
			//allowNull: false,
		},
		status:{
			type: DataTypes.ENUM,
			values: ["BARROW", "LOAN"],
			defaultValue: "BARROW",
		},
		interest:{
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0,
		},
		details:{
			type: DataTypes.STRING(65536),
			defaultValue: "{}",
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
	};
	FinancialPosition.init(FinancialPositionModel, {
		sequelize,
		modelName: "FinancialPosition",
		freezeTableName: true,
		tableName: 'FinancialPosition',
	});
	return FinancialPosition;
};