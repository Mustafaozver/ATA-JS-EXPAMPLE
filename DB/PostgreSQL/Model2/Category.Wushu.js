
module.exports = ({ sequelize, DataTypes, Model })=>{
	class Category extends Model{
		static associate(models){
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
	};
	
	Category.init(CategoryModel, {
		sequelize,
		modelName: "Category",
		freezeTableName: true,
		tableName: 'Category',
	});
	return Category;
};