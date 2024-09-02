
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class FinancialBudget extends Model{
		static associate(models){
			return;
			FinancialBudget.hasOne(models.User, {
				as: "owner",
				sourceKey: "owner_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const FinancialBudgetModel = {
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
		owner_id:{ // user, organization, substation id for verify
			type: DataTypes.UUID,
			allowNull: false,
			//unique: true,
		},
	};
	FinancialBudget.init(FinancialBudgetModel, {
		sequelize,
		modelName: "FinancialBudget",
		freezeTableName: true,
		tableName: 'FinancialBudget',
	});
	return FinancialBudget;
};