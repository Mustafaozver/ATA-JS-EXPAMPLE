module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			Name: {
				type: DataTypes.STRING(64),
				allowNull: false,
			},
			Description: {
				type: DataTypes.STRING(128),
				allowNull: false,
			},
			StartTime: {
				type: DataTypes.DATE,
				allowNull: false
			},
			EndTime: {
				type: DataTypes.DATE,
				allowNull: false
			},
			CycleTimeSpan: {
				type: DataTypes.RANGE(DataTypes.BIGINT),
				//allowNull: false
			},
			StartTimeSpan: {
				type: DataTypes.RANGE(DataTypes.BIGINT),
				//allowNull: false
			},
			EndTimeSpan: {
				type: DataTypes.RANGE(DataTypes.BIGINT),
				//allowNull: false
			},
		};
	};
	
	const Link = ()=>{
		return{
			"Creator": "User"
		};
	};
	
	return{
		Definition,
		Link,
	};
})(ATA());