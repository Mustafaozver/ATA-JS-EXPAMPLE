module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			name: {
				type: DataTypes.STRING(128),
				allowNull: false,
			},
		};
	};
	
	const Link = ()=>{
		return{};
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