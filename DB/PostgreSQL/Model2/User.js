
module.exports = ({ sequelize, DataTypes, Model })=>{
	class User extends Model{
		static associate(models){
			User.hasOne(models.Contact, {
				as: "Link_Contact_object",
				sourceKey: "Link_Contact",
				foreignKey: "ID",
				constraints: false,
			});
			User.hasOne(User, {
				as: "Link_Reference_object",
				sourceKey: "Link_Reference",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	
	const UserModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		ADDATA: {
			type: DataTypes.JSON,
		},
		UserName: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		FirstName: {
			type: DataTypes.STRING(128),
			defaultValue: "",
		},
		LastName: {
			type: DataTypes.STRING(128),
			defaultValue: "",
		},
		PassWord: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		LastLogin: {
			type: DataTypes.DATE,
		},
		
		// Relations
		Link_Contact:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "Contact",
				key: "ID"
			},
		},
		Link_Reference:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
	};
	
	User.init(UserModel, {
		sequelize,
		modelName: "User",
		freezeTableName: true,
		tableName: 'User',
	});
	return User;
};