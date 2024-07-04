module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			no: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
			status: {
				type: DataTypes.ENUM,
				values: ["PENDING", "INPROGRESS", "DONE"],
				defaultValue: "PENDING",
			},
			time: {
				//allowNull: false,
				type: DataTypes.DATE
			},
		};
	};
	
	const Link = ()=>{
		return{
			//"LSide": "Member",
			//"RSide": "Member",
			"Out": "Result",
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