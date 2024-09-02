
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Unit extends Model{
		static associate(models){
			
		};
	};
	const UnitModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		name:{
			type: DataTypes.STRING(32),
			allowNull: false,
		},
		tolerance:{
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0,
		},
	};
	Unit.init(UnitModel, {
		sequelize,
		modelName: "Unit",
		freezeTableName: true,
		tableName: 'Unit',
	});
	return Unit;
};