module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			Title: {
				type: DataTypes.STRING(64),
				allowNull: false,
			},
			Content: {
				type: DataTypes.STRING(65536),
				allowNull: false,
			},
			Status: {
				type: DataTypes.ENUM,
				values: ["DRAFT", "NEW", "SENT", "RECEIVED", "READ", "DELETED"],
				defaultValue: "DRAFT",
			},
		};
	};
	
	const Link = ()=>{
		return{
			"Sender": "User",
			"Recipient": "User",
			"CC": "User",
		};
	};
	
	return{
		Definition,
		Link,
	};
})(ATA());