
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Substation extends Model{
		static associate(models){
			return;
			Substation.hasOne(models.User, {
				as: "assettype",
				sourceKey: "assettype_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const SubstationModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		name:{
			type: DataTypes.STRING,
			allowNull: false,
		},
		foundingdate:{
			type: DataTypes.DATE,
			allowNull: false
		},
		status:{
			type: DataTypes.ENUM,
			values: ["NEW", "PASSIVE", "ACTIVE"],
			defaultValue: "NEW",
		},
	};
	Substation.init(SubstationModel, {
		sequelize,
		modelName: "Substation",
		freezeTableName: true,
		tableName: 'Substation',
	});
	return Substation;
};