module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			NickName:{
				type: DataTypes.STRING(128),
				allowNull: false,
			},
			PassWord: {
					type: DataTypes.STRING,
					allowNull: false,
			},
			LastLogin: {
				type: DataTypes.DATE,
			},
		};
	};
	
	const Link = ()=>{
		return {
			"Contact": "Contact",
			"Member": "Member",
			"Organization": "Organization",
			"Reference": "User",
			"Partner": "User",
		};
	};
	
	return{
		Definition,
		Link,
	};
})(ATA());