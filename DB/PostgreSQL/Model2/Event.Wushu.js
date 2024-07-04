
module.exports = ({ sequelize, DataTypes, Model })=>{
	class Event extends Model{
		static associate(models){
			Event.hasOne(models.User, {
				as: "Link_From_object",
				sourceKey: "Link_From",
				foreignKey: "ID",
				constraints: false,
			});
			Event.hasOne(models.Member, {
				as: "Link_To_object",
				sourceKey: "Link_To",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	
	const EventModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		ADDATA: {
			type: DataTypes.JSON,
		},
		firstname: {
			type: DataTypes.STRING(128),
			defaultValue: "",
		},
		lastname: {
			type: DataTypes.STRING(128),
			defaultValue: "",
		},
		kg: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0,
		},
		
		// Relations
		Link_From:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
		Link_To: {
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "Member",
				key: "ID"
			},
		},
	};
	
	Event.init(EventModel, {
		sequelize,
		modelName: "Event",
		freezeTableName: true,
		tableName: 'Event',
	});
	return Event;
};