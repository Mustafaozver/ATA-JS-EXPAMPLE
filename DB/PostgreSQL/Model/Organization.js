module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			Name:{
				type: DataTypes.STRING,
				allowNull: false,
			},
			FoundingDate:{
				type: DataTypes.DATE,
				allowNull: false
			},
			Status:{
				type: DataTypes.ENUM,
				values: ["NEW", "PASSIVE", "ACTIVE"],
				defaultValue: "NEW",
			},
		};
	};
	
	const Link = ()=>{
		return{
			"Owner": "User"
		};
	};
	
	return{
		Definition,
		Link,
	};
})(ATA());