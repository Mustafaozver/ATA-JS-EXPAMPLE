const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class CalendarEvent extends Model{
		static associate(models){
			
		};
	};
	const CalendarEventModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		name:{
			type: DataTypes.STRING(64),
			allowNull: false,
		},
		description:{
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		starttime:{
			type: DataTypes.DATE,
			allowNull: false
		},
		endtime:{
			type: DataTypes.DATE,
			allowNull: false
		},
		cycletimespan:{
			type: DataTypes.RANGE(DataTypes.BIGINT),
			//allowNull: false
		},
		starttimespan:{
			type: DataTypes.RANGE(DataTypes.BIGINT),
			//allowNull: false
		},
		endtimespan:{
			type: DataTypes.RANGE(DataTypes.BIGINT),
			//allowNull: false
		},
	};
	CalendarEvent.init(CalendarEventModel, {
		sequelize,
		modelName: "CalendarEvent",
		freezeTableName: true,
		tableName: 'CalendarEvent',
	});
	return CalendarEvent;
};