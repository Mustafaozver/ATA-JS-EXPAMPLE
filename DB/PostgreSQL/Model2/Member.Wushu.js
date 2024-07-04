
module.exports = ({ sequelize, DataTypes, Model })=>{
	class Member extends Model{
		static associate(models){
			Member.hasOne(models.User, {
				as: "Link_Reference_object",
				sourceKey: "Link_Reference",
				foreignKey: "ID",
				constraints: false,
			});
			Member.hasOne(models.Category, {
				as: "Link_Category_object",
				sourceKey: "Link_Category",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	
	const MemberModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		ADDATA: {
			type: DataTypes.JSON,
		},
		FirstName: {
			type: DataTypes.STRING(128),
			defaultValue: "",
		},
		LastName: {
			type: DataTypes.STRING(128),
			defaultValue: "",
		},
		KG: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0,
		},
		
		// Relations
		Link_Reference: {
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
		Link_Category: {
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "Category",
				key: "ID"
			},
		},
	};
	
	Member.init(MemberModel, {
		sequelize,
		modelName: "Member",
		freezeTableName: true,
		tableName: 'Member',
	});
	return Member;
};