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
				values: ["NONE", "IDEA", "PENDING", "INPROGRESS", "DONE", "FAILED"],
				defaultValue: "NONE",
			},
		};
	};
	
	const Link = ()=>{
		return{
			//"sender": "Member",
			//"from": "Member",
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