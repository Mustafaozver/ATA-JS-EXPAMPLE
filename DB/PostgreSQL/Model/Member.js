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
			ProfilePhoto: {
				type: DataTypes.STRING(65536),
				defaultValue: "",
			},
			FirstName: {
				type: DataTypes.STRING(128),
				defaultValue: "",
			},
			LastName: {
				type: DataTypes.STRING(128),
				defaultValue: "",
			},
		};
	};
	
	const Link = ()=>{
		return{};
	};
	
	return{
		Definition,
		Link,
	};
})(ATA());