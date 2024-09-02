
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class WorkGroup extends Model{
		static associate(models){
			WorkGroup.hasOne(models.Organization, {
				as: "organization",
				sourceKey: "organization_id",
				foreignKey: "ID",
				constraints: false,
			});
			WorkGroup.hasOne(models.Substation, {
				foreignKey: "ID",
				sourceKey: "substation_id",
				constraints: false,
				
				as: "substation",
				sourceKey: "substation_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const WorkGroupModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		name:{
			type: DataTypes.STRING(128),
			//allowNull: false,
		},
		
		// Relationships
		organization_id:{
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: "Organization",
				key: "ID"
			},
		},
		substation_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "Substation",
				key: "ID"
			},
		},
	};
	WorkGroup.init(WorkGroupModel, {
		sequelize,
		modelName: "WorkGroup",
		freezeTableName: true,
		tableName: 'WorkGroup',
	});
	return WorkGroup;
};