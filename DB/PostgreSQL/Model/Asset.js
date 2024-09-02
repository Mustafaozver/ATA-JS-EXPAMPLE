module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			Quantity: {
				type: DataTypes.FLOAT,
				allowNull: false,
				defaultValue: 0,
			},
			DueTime: {
				//allowNull: false,
				type: DataTypes.DATE
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