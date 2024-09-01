module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			name:{
				type: DataTypes.STRING,
				allowNull: false,
			},
			foundingdate:{
				type: DataTypes.DATE,
				allowNull: false
			},
			status:{
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
	
	const Associate = (Models, ME)=>{
		//...
	};
	
	return{
		Definition,
		Associate,
		Link,
	};
})(ATA());