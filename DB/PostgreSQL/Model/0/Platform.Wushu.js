module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			firstname: {
				type: DataTypes.STRING(128),
				defaultValue: "",
			},
		};
	};
	
	const Link = ()=>{
		return{
			"Category": "Category",
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