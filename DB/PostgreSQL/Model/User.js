module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			username:{
				type: DataTypes.STRING(128)
			}
		};
	};
	
	const Associate = (Models, ME)=>{
		//...
	};
	
	return{
		Definition,
		Associate,
	};
})(ATA());