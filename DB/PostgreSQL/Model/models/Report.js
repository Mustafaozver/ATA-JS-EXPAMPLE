
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Report extends Model{
		static associate(models){
			Report.hasOne(models.User, {
				as: "reporter_user",
				sourceKey: "reporter_user_id",
				foreignKey: "ID",
				constraints: false,
			});
		}
	};
	const ReportModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		name:{
			allowNull: false,
			type: DataTypes.STRING,
		},
		verifydate:{
			//allowNull: false,
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		expiredate:{
			//allowNull: false,
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		type:{
			type: DataTypes.STRING(32),
			defaultValue: "REPORT",
			allowNull: false,
		},
		content:{
			type: DataTypes.STRING(65536), // 2**16
			allowNull: false,
		},
		
		// Relationships
		reporter_user_id:{
			type: DataTypes.UUID,
			allowNull: false,
			//defaultValue: empty_uuid,
			references: {
				model: "User",
				key: "ID"
			},
		},
	};
	Report.init(ReportModel, {
		sequelize,
		modelName: "Report",
		freezeTableName: true,
		tableName: 'Report',
	});
	return Report;
};