module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			Name: {
				type: DataTypes.STRING(64),
				allowNull: false,
				defaultValue: "",
			},
		};
	};
	
	const Link = ()=>{
		return{
			"Wallet": "Wallet",
			"Substation": "Substation",
			"Organization": "Organization",
		};
	};
	
	return{
		Definition,
		Link,
	};
})(ATA());