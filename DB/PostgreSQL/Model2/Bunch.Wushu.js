
module.exports = ({ sequelize, DataTypes, Model })=>{
	class Bunch extends Model{
		static associate(models){
			Bunch.hasOne(models.Platform, {
				as: "Link_Platform_object",
				sourceKey: "Link_Platform",
				foreignKey: "ID",
				constraints: false,
			});
			Bunch.hasOne(models.Category, {
				as: "Link_Category_object",
				sourceKey: "Link_Category",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	
	const BunchModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		ADDATA: {
			type: DataTypes.JSON,
		},
		Name: {
			type: DataTypes.STRING(128),
			defaultValue: "",
		},
		Status: {
			type: DataTypes.ENUM,
			values: ["PENDING", "INPROGRESS", "DONE"],
			defaultValue: "PENDING",
		},
		
		// Relations
		Link_Platform: {
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "Platform",
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
	
	Bunch.init(BunchModel, {
		sequelize,
		modelName: "Bunch",
		freezeTableName: true,
		tableName: 'Bunch',
	});
	return Bunch;
};