
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Task extends Model{
		static associate(models){
			Task.hasOne(models.User, {
				as: "createdby_user",
				sourceKey: "createdby_user_id",
				foreignKey: "ID",
				constraints: false,
			});
			Task.hasOne(models.User, {
				as: "checkedby_user",
				sourceKey: "checkedby_user_id",
				foreignKey: "ID",
				constraints: false,
			});
			Task.hasOne(models.User, {
				as: "responsibleof_user",
				sourceKey: "responsibleof_user_id",
				foreignKey: "ID",
				constraints: false,
			});
			Task.hasOne(models.CalendarEvent, {
				as: "calendarevent",
				sourceKey: "calendarevent_id",
				foreignKey: "ID",
				constraints: false,
			});
			Task.hasOne(models.Result, {
				as: "result",
				sourceKey: "result_id",
				foreignKey: "ID",
				constraints: false,
			});
			Task.hasOne(models.MileStone, {
				as: "milestone",
				sourceKey: "milestone_id",
				foreignKey: "ID",
				constraints: false,
			});
			Task.hasOne(Task, {
				as: "dependency_task",
				sourceKey: "dependency_task_id",
				foreignKey: "ID",
				constraints: false,
			});
			Task.hasOne(Task, {
				as: "before_task",
				sourceKey: "before_task_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const TaskModel = {
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
		milestone_id:{
			type: DataTypes.UUID,
			allowNull: false,
			//unique: true,
			references: {
				model: "MileStone",
				key: "ID"
			},
		},
		dependency_task_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			//unique: true,
			references: {
				model: "Task",
				key: "ID"
			},
		},
		before_task_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			//unique: true,
			references: {
				model: "Task",
				key: "ID"
			},
		},
		
	};
	Task.init(TaskModel, {
		sequelize,
		modelName: "Task",
		freezeTableName: true,
		tableName: 'Task',
	});
	return Task;
};