module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			username:{
				type: DataTypes.STRING(128)
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
			//"Contact": "Contact",
			"Reference": "User"
		};
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