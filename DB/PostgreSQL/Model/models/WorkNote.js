
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class WorkNote extends Model{
		static associate(models){
			WorkNote.hasOne(models.User, {
				as: "user",
				sourceKey: "user_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const WorkNoteModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		title:{
			type: DataTypes.STRING(64),
			allowNull: false,
		},
		content:{
			type: DataTypes.STRING(65536),
			allowNull: false,
		},
		user_id:{
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
	};
	WorkNote.init(WorkNoteModel, {
		sequelize,
		modelName: "WorkNote",
		freezeTableName: true,
		tableName: 'WorkNote',
	});
	return WorkNote;
};