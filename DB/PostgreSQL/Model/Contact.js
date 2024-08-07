module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			name: {
				type: DataTypes.STRING(64),
				allowNull: false,
				defaultValue: "",
			},
			description: {
				type: DataTypes.STRING(128),
				allowNull: false,
				defaultValue: "",
			},
			interlocutor_firstname: {
				type: DataTypes.STRING(128),
			},
			interlocutor_lastname: {
				type: DataTypes.STRING(128),
			},
			profile_photo: {
				type: DataTypes.STRING(65536),
				defaultValue: "",
			},
			portalcode: {
				type: DataTypes.STRING(6),
			},
			// Address
			streetname: {
				type: DataTypes.STRING(128),
			},
			cityname: {
				type: DataTypes.STRING(128),
			},
			statename: {
				type: DataTypes.STRING(128),
			},
			countryname: {
				type: DataTypes.STRING(128),
			},
			latitude: {
				type: DataTypes.FLOAT,
			},
			longitude: {
				type: DataTypes.FLOAT,
			},
			utcoffset: {
				type: DataTypes.STRING(5),
			},
			language: {
				type: DataTypes.STRING(16),
			},
		};
	};
	
	const Link = ()=>{
		return{};
	};
	
	const Associate = (Models, ME)=>{
		//...
	};
	
	return{
		Definition,
		Associate,
		Link,
	};
})(ATA());