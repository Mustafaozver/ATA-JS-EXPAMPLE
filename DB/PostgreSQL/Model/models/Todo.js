
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Todo extends Model{
		static associate(models){
			Todo.hasOne(models.User, {
				as: "createdby_user",
				sourceKey: "createdby_user_id",
				foreignKey: "ID",
				constraints: false,
			});
			Todo.hasOne(models.User, {
				as: "checkedby_user",
				sourceKey: "checkedby_user_id",
				foreignKey: "ID",
				constraints: false,
			});
			Todo.hasOne(models.User, {
				as: "responsibleof_user",
				sourceKey: "responsibleof_user_id",
				foreignKey: "ID",
				constraints: false,
			});
			Todo.hasOne(models.CalendarEvent, {
				as: "calendarevent",
				sourceKey: "calendarevent_id",
				foreignKey: "ID",
				constraints: false,
			});
			Todo.hasOne(models.Result, {
				as: "result",
				sourceKey: "result_id",
				foreignKey: "ID",
				constraints: false,
			});
			Todo.hasOne(models.Task, {
				as: "task",
				sourceKey: "task_id",
				foreignKey: "ID",
				constraints: false,
			});
			Todo.hasOne(models.MileStone, {
				as: "milestone",
				sourceKey: "milestone_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const TodoModel = {
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
		status:{
			type: DataTypes.ENUM,
			values: ["NONE", "IDEA", "PENDING", "INPROGRESS", "DONE", "FAILED"],
			defaultValue: "NONE",
		},
		successrate:{
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		failedrate:{
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		
		// Relationships
		createdby_user_id:{
			type: DataTypes.UUID,
			//allowNull: false,
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
			//allowNull: false,
			//unique: true,
			references: {
				model: "Result",
				key: "ID"
			},
		},
		task_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			//unique: true,
			references: {
				model: "Task",
				key: "ID"
			},
		},
		milestone_id:{
			type: DataTypes.UUID,
			allowNull: false,
			//unique: true,
			references: {
				model: "MileStone",
				key: "ID"
			},
		},
	};
	Todo.init(TodoModel, {
		sequelize,
		modelName: "Todo",
		freezeTableName: true,
		tableName: 'Todo',
	});
	return Todo;
};