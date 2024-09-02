module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
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
		};
	};
	
	const Link = ()=>{
		return{
			"Creator": "User"
		};
	};
	
	return{
		Definition,
		Link,
	};
})(ATA());