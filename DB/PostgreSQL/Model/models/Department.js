
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Department extends Model{
		static associate(models){
			Department.hasOne(models.Substation, {
				as: "substation",
				sourceKey: "substation_id",
				foreignKey: "ID",
				constraints: false,
			});
			Department.hasOne(models.FinancialBudget, {
				as: "financialbudget",
				sourceKey: "financialbudget_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const DepartmentModel = {
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
		
		// Relationships
		substation_id:{
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: "Substation",
				key: "ID"
			},
		},
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
	Department.init(DepartmentModel, {
		sequelize,
		modelName: "Department",
		freezeTableName: true,
		tableName: 'Department',
	});
	return Department;
};