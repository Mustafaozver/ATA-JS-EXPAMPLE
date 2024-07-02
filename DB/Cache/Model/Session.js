module.exports=((ATA)=>{
	
	const userprofile = "";
	
	const Definition = (DataTypes)=>{
		return{
			sid: {
				type: DataTypes.STRING,
				primaryKey: true,
				unique: true,
			},
			expires: {
				type: DataTypes.DATE,
			},
			data: {
				type: DataTypes.STRING(65536),
			},
			// Relationships
			user_id: {
				type: DataTypes.UUID,
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