module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			Name: {
				type: DataTypes.STRING(64),
				allowNull: false,
				defaultValue: "",
			},
		};
	};
	
	const Link = ()=>{
		return{
			"Owner": "User",
		};
	};
	
	return{
		Definition,
		Link,
	};
})(ATA());