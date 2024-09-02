module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			StartTime: {
				type: DataTypes.DATE,
				allowNull: false
			},
			EndTime: {
				type: DataTypes.DATE,
				allowNull: false
			},
		};
	};
	
	const Link = ()=>{
		return{
			"For": "User",
			"Permission": "Permission",
		};
	};
	
	return{
		Definition,
		Link,
	};
})(ATA());