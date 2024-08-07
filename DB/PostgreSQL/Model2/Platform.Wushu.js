
module.exports = ({ sequelize, DataTypes, Model })=>{
	class Platform extends Model{
		static associate(models){
			Platform.hasOne(models.Tournament, {
				as: "Link_Tournament_object",
				sourceKey: "Link_Tournament",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	
	const PlatformModel = {
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
	
	Platform.init(PlatformModel, {
		sequelize,
		modelName: "Platform",
		freezeTableName: true,
		tableName: 'Platform',
	});
	return Platform;
};