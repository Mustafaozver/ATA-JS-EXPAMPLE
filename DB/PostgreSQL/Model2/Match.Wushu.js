
module.exports = ({ sequelize, DataTypes, Model })=>{
	class Match extends Model{
		static associate(models) {
			Match.hasOne(models.Result, {
				as: "Link_Out_object",
				sourceKey: "Link_Out",
				foreignKey: "ID",
				constraints: false,
			});
			Match.hasOne(models.Member, {
				as: "Link_Winner_object",
				sourceKey: "Link_Winner",
				foreignKey: "ID",
				constraints: false,
			});
			Match.hasOne(Match, {
				as: "Link_Upper_object",
				sourceKey: "Link_Upper",
				foreignKey: "ID",
				constraints: false,
			});
			Match.hasOne(models.Bunch, {
				as: "Link_Bunch_object",
				sourceKey: "Link_Bunch",
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
		Level: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
		Status: {
			type: DataTypes.ENUM,
			values: ["PENDING", "INPROGRESS", "DONE"],
			defaultValue: "PENDING",
		},
		LSide: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		RSide: {
			type: DataTypes.UUID,
			allowNull: false,
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
		Link_Winner: {
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "Member",
				key: "ID"
			},
		},
		Link_Upper: {
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "Match",
				key: "ID"
			},
		},
		Link_Bunch: {
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "Bunch",
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