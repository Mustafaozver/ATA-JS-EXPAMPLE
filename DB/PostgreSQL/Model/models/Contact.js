const {Model} = require('sequelize');
const userprofile = "./assets/images/avatar.png";
module.exports = (sequelize, DataTypes)=>{
	class Contact extends Model{
		static associate(models){
			Contact.hasOne(models.User, {
				as: "user",
				sourceKey: "user_id",
				foreignKey: "ID",
				constraints: false,
			});
			Contact.hasOne(models.Substation, {
				as: "substation",
				sourceKey: "substation_id",
				foreignKey: "ID",
				constraints: false,
			});
		};
	};
	const ContactModel = {
		ID:{
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		name:{
			type: DataTypes.STRING(64),
			allowNull: false,
			defaultValue: "",
		},
		description:{
			type: DataTypes.STRING(128),
			allowNull: false,
			defaultValue: "",
		},
		interlocutor_firstname:{
			type: DataTypes.STRING(128),
		},
		interlocutor_lastname:{
			type: DataTypes.STRING(128),
		},
		profile_photo:{
			type: DataTypes.STRING(65536),
			defaultValue: userprofile,
		},
		portalcode:{
			type: DataTypes.STRING(6),
		},
		// Address
		streetname:{
			type: DataTypes.STRING(128),
		},
		cityname:{
			type: DataTypes.STRING(128),
		},
		statename:{
			type: DataTypes.STRING(128),
		},
		countryname:{
			type: DataTypes.STRING(128),
		},
		latitude:{
			type: DataTypes.FLOAT,
		},
		longitude:{
			type: DataTypes.FLOAT,
		},
		utcoffset:{
			type: DataTypes.STRING(5),
		},
		language:{
			type: DataTypes.STRING(16),
		},
		
		// Relationships
		user_id:{
			type: DataTypes.UUID,
			//allowNull: false,
			references: {
				model: "User",
				key: "ID"
			},
		},
		substation_id:{
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: "Substation",
				key: "ID"
			},
		},
	};
	
	// Connects
	const connect_list = [
		"phone",
		"fax",
		"email",
		"website",
		"facebook",
		"linkedin",
		"whatsapp",
		"telegram",
		"skype",
	];
	
	connect_list.map((connect_name)=>{
		const column_name = "connect_" + connect_name;
		ContactModel[column_name] = {
			type: DataTypes.STRING(512),
		};
	});
	
	ContactModel.connect_from = {
		type: DataTypes.STRING(16),
		//allowNull: false,
		defaultValue: "",//connect_list[0],
	};
	
	Contact.init(ContactModel, {
		sequelize,
		modelName: "Contact",
		freezeTableName: true,
		tableName: 'Contact',
	});
	return Contact;
};