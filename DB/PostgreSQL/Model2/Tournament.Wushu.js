
module.exports = ({ sequelize, DataTypes, Model })=>{
	class Tournament extends Model{
		static associate(models){
		};
	};
	
	const TournamentModel = {
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
			defaultValue: "",
		},
	};
	
	Tournament.init(TournamentModel, {
		sequelize,
		modelName: "Tournament",
		freezeTableName: true,
		tableName: 'Tournament',
	});
	return Tournament;
};