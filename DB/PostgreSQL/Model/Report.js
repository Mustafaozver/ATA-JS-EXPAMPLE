module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			Name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			VerifyTime: {
				//allowNull: false,
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			},
			ExpireTime: {
				//allowNull: false,
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			},
			Type: {
				type: DataTypes.STRING(32),
				defaultValue: "REPORT",
				allowNull: false,
			},
		};
	};
	
	const Link = ()=>{
		return{
			"Reporter": "User",
		};
	};
	
	return{
		Definition,
		Link,
	};
})(ATA());