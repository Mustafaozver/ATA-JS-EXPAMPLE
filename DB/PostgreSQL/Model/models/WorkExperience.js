
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class WorkExperience extends Model{
		static associate(models){
			WorkExperience.hasOne(models.User, {
				as: "user",
				sourceKey: "user_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const WorkExperienceModel = {
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
		content:{
			type: DataTypes.STRING(65536),
			allowNull: false,
		},
		
		// Relationships
		user_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
		calendarevent_id:{
			type: DataTypes.UUID,
			allowNull: false,
			//unique: true,
			references: {
				model: "CalendarEvent",
				key: "ID"
			},
		},
	};
	WorkExperience.init(WorkExperienceModel, {
		sequelize,
		modelName: "WorkExperience",
		freezeTableName: true,
		tableName: 'WorkExperience',
	});
	return WorkExperience;
};