module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			username:{
				type: DataTypes.STRING(128),
				allowNull: false,
			},
			firstname: {
				type: DataTypes.STRING(128),
				defaultValue: "",
			},
			lastname: {
				type: DataTypes.STRING(128),
				defaultValue: "",
			},
			password: {
					type: DataTypes.STRING,
					allowNull: false,
			},
			last_login: {
				type: DataTypes.DATE,
			},
		};
	};
	
	const Link = ()=>{
		return{
			"Contact": "Contact",
			"Reference": "User",
			"Organization": "Organization",
		};
	};
	
	return{
		Definition,
		Link,
	};
})(ATA());