
module.exports = ({ sequelize, DataTypes, Model })=>{
	class Match extends Model{
		static associate(models){
			Match.hasOne(models.Result, {
				as: "Link_Out_object",
				sourceKey: "Link_Out",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	
	const MatchModel = {
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
			values: ["PENDING", "INPROGRESS", "DONE"],
			defaultValue: "PENDING",
		},
		Time: {
			//allowNull: false,
			type: DataTypes.DATE
		},
		
		// Relations
		Link_Out:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "Result",
				key: "ID"
			},
		},
	};
	
	Match.init(MatchModel, {
		sequelize,
		modelName: "Match",
		freezeTableName: true,
		tableName: 'Match',
	});
	return Match;
};