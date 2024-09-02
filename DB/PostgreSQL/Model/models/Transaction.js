
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
	class Transaction extends Model{
		static associate(models){
			return;
			Transaction.hasOne(models.User, {
				as: "assettype",
				sourceKey: "assettype_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const TransactionModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		name:{
			type: DataTypes.STRING,
			allowNull: false,
		},
		foundingdate:{
			type: DataTypes.DATE,
			allowNull: false
		},
		details:{
			type: DataTypes.STRING(65536),
			defaultValue: "{}",
		},
		status:{
			type: DataTypes.ENUM,
			values: ["NEW", "PASSIVE", "ACTIVE"],
			defaultValue: "NEW",
		},
	};
	Transaction.init(TransactionModel, {
		sequelize,
		modelName: "Transaction",
		freezeTableName: true,
		tableName: 'Transaction',
	});
	return Transaction;
};