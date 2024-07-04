
module.exports = ({ sequelize, DataTypes, Model })=>{
	class Category extends Model{
		static associate(models){
			Category.hasOne(models.Tournament, {
				as: "Link_Tournament_object",
				sourceKey: "Link_Tournament",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	
	const CategoryModel = {
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
			allowNull: false,
		},
		
		// Relations
		Link_Tournament:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "Tournament",
				key: "ID"
			},
		},
	};
	
	Category.init(CategoryModel, {
		sequelize,
		modelName: "Category",
		freezeTableName: true,
		tableName: 'Category',
	});
	return Category;
};