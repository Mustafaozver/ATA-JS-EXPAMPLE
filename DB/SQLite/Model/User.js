module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			username:{
				type: DataTypes.STRING(128)
			}
		};
	};
	
	const Associate = (Models)=>{
		//...
	};
	
	return{
		Definition,
		Associate,
	};
})(ATA());