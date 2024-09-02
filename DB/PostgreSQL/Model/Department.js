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
			"SubStation": "SubStation",
			"Organization": "Organization",
		};
	};
	
	return{
		Definition,
		Link,
	};
})(ATA());