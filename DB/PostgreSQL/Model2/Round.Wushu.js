
module.exports = ({ sequelize, DataTypes, Model })=>{
	class Round extends Model{
		static associate(models){
			Round.hasOne(models.Category, {
				as: "Link_Category_object",
				sourceKey: "Link_Category",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	
	const RoundModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		ADDATA: {
			type: DataTypes.JSON,
		},
		NO: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
		Status: {
			type: DataTypes.ENUM,
			values: ["NONE", "IDEA", "PENDING", "INPROGRESS", "DONE", "FAILED"],
			defaultValue: "NONE",
		},
		
		// Relations
		Link_Category:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "Category",
				key: "ID"
			},
		},
	};
	
	Round.init(RoundModel, {
		sequelize,
		modelName: "Round",
		freezeTableName: true,
		tableName: 'Round',
	});
	return Round;
};