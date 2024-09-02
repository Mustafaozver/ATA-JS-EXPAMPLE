const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class MemberShip extends Model {
		static associate(models) {
			MemberShip.hasOne(models.User, {
				as: "user",
				sourceKey: "user_id",
				foreignKey: "ID",
				constraints: false,
			});
			MemberShip.hasOne(models.WorkGroup, {
				as: "workgroup",
				sourceKey: "workgroup_id",
				foreignKey: "ID",
				constraints: false,
			});
			MemberShip.hasOne(models.User, {
				as: "inviter_user",
				sourceKey: "inviter_user_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const MemberShipModel = {
		ID: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		type: {
			type: DataTypes.STRING(16),
			allowNull: false,
		},
		
		// Relationships
		user_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
		inviter_user_id: {
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
		workgroup_id: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: "WorkGroup",
				key: "ID"
			},
		},
	};// WorkGroup
	MemberShip.init(MemberShipModel, {
		sequelize,
		modelName: "MemberShip",
		freezeTableName: true,
		tableName: 'MemberShip',
	});
	return MemberShip;
};