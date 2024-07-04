
module.exports = ({ sequelize, DataTypes, Model })=>{
	class Contact extends Model{
		static associate(models){
		};
	};
	const ContactModel = {
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
			type: DataTypes.STRING(64),
			allowNull: false,
			defaultValue: "",
		},
		Description: {
			type: DataTypes.STRING(128),
			allowNull: false,
			defaultValue: "",
		},
		ProfilePhoto: {
			type: DataTypes.STRING(65536),
			defaultValue: "",
		},
		PortalCode: {
			type: DataTypes.STRING(6),
		},
		// Address
		StreetName: {
			type: DataTypes.STRING(128),
		},
		CityName: {
			type: DataTypes.STRING(128),
		},
		StateName: {
			type: DataTypes.STRING(128),
		},
		CountryName: {
			type: DataTypes.STRING(128),
		},
		Latitude: {
			type: DataTypes.FLOAT,
		},
		Longitude: {
			type: DataTypes.FLOAT,
		},
		UTCOffset: {
			type: DataTypes.STRING(5),
		},
		Language: {
			type: DataTypes.STRING(16),
		},
		
		// Relations
		/*
		Link_Contact: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: "Contact",
				key: "ID"
			},
		},
		*/
	};
	Contact.init(ContactModel, {
		sequelize,
		modelName: "Contact",
		freezeTableName: true,
		tableName: 'Contact',
	});
	return Contact;
};