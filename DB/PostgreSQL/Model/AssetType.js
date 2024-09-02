module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			Name: {
				type: DataTypes.STRING(64),
				allowNull: false,
			},
			Symbol: {
				type: DataTypes.STRING(8),
				allowNull: false,
			},
			Price: {
				type: DataTypes.FLOAT,
				defaultValue: null,
			},
			Multiple: {
				type: DataTypes.FLOAT,
				allowNull: false,
				defaultValue: 1,
			},
			Tolerance: {
				type: DataTypes.FLOAT,
				allowNull: false,
				defaultValue: 0,
			},
		};
	};
	
	const Link = ()=>{
		return{
			"AssetType": "AssetType",
			"Wallet": "Wallet",
		};
	};
	
	return{
		Definition,
		Link,
	};
})(ATA());