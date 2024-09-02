module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			Title: {
				type: DataTypes.STRING(512),
				allowNull: false,
			},
			Content: {
				type: DataTypes.STRING(8192),
				allowNull: false,
			},
		};
	};
	
	const Link = ()=>{
		return{
			"User": "User",
		};
	};
	
	return{
		Definition,
		Link,
	};
})(ATA());