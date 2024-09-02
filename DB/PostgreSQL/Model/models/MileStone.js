
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class MileStone extends Model{
		static associate(models){
			MileStone.hasOne(models.User, {
				as: "createdby_user",
				sourceKey: "createdby_user_id",
				foreignKey: "ID",
				constraints: false,
			});
			MileStone.hasOne(models.User, {
				as: "checkedby_user",
				sourceKey: "checkedby_user_id",
				foreignKey: "ID",
				constraints: false,
			});
			MileStone.hasOne(models.User, {
				as: "responsibleof_user",
				sourceKey: "responsibleof_user_id",
				foreignKey: "ID",
				constraints: false,
			});
			MileStone.hasOne(models.CalendarEvent, {
				as: "calendarevent",
				sourceKey: "calendarevent_id",
				foreignKey: "ID",
				constraints: false,
			});
			MileStone.hasOne(models.Result, {
				as: "result",
				sourceKey: "result_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const MileStoneModel = {
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
		createdby_user_id:{
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
		checkedby_user_id:{
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: "User",
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
	MileStone.init(MileStoneModel, {
		sequelize,
		modelName: "MileStone",
		freezeTableName: true,
		tableName: 'MileStone',
	});
	return MileStone;
};