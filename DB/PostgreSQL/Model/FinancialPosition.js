module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			Name: {
				type: DataTypes.STRING(64),
				allowNull: false,
				defaultValue: "",
			},
			Status: {
				type: DataTypes.ENUM,
				values: ["BARROW", "LOAN"],
				defaultValue: "BARROW",
			},
			Quantity: {
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