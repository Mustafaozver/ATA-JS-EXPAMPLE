
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class JobPosition extends Model{
		static associate(models){
			return;
			JobPosition.hasMany(models.Proxy, {
				as: "assettype",
				sourceKey: "assettype_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const JobPositionModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		title:{
			type: DataTypes.STRING(64),
		},
		description:{
			type: DataTypes.STRING,
		},
	};
	JobPosition.init(JobPositionModel, {
		sequelize,
		modelName: "JobPosition",
		freezeTableName: true,
		tableName: 'JobPosition',
	});
	return JobPosition;
};