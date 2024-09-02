const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Meeting extends Model {
		static associate(models) {
			Meeting.hasOne(models.User, {
				as: "user",
				sourceKey: "user_id",
				foreignKey: "ID",
				constraints: false,
			});
			Meeting.hasOne(models.Contact, {
				as: "contact",
				sourceKey: "contact_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const MeetingModel = {
		ID: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		title: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		content: {
			type: DataTypes.STRING(65536),
			allowNull: false,
		},
		
		// Relationships
		user_id: {
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
		calendarevent_id: {
			type: DataTypes.UUID,
			allowNull: false,
			//unique: true,
			references: {
				model: "CalendarEvent",
				key: "ID"
			},
		},
		contact_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: "Contact",
				key: "ID"
			},
		},
	};
	Meeting.init(MeetingModel, {
		sequelize,
		modelName: "Meeting",
		freezeTableName: true,
		tableName: 'Meeting',
	});
	return Meeting;
};