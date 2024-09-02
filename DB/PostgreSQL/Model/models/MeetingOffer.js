
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class MeetingOffer extends Model {
		static associate(models) {
			MeetingOffer.hasOne(models.Organization, {
				as: "organization",
				sourceKey: "organization_id",
				foreignKey: "ID",
				constraints: false,
			});
			MeetingOffer.hasOne(models.Meeting, {
				as: "meeting",
				sourceKey: "meeting_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const MeetingOfferModel = {
		ID: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		
		
		
		// Relationships
		organization_id: {
			type: DataTypes.UUID,
			allowNull: false,
			//defaultValue: ATA().ADMINISTRATORID,
			references: {
				model: "Organization",
				key: "ID"
			},
		},
		meeting_id: {
			type: DataTypes.UUID,
			allowNull: false,
			//defaultValue: ATA().ADMINISTRATORID,
			references: {
				model: "Meeting",
				key: "ID"
			},
		},
		status: {
			type: DataTypes.ENUM,
			values: ["NEW", "ACCEPT", "REJECT"],
			defaultValue: "NEW",
		},
	};
	MeetingOffer.init(MeetingOfferModel, {
		sequelize,
		modelName: "MeetingOffer",
		freezeTableName: true,
		tableName: "MeetingOffer",
	});
	return MeetingOffer;
};