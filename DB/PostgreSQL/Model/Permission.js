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
			
			Level: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			
			Create: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			Read: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			Update: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			Delete: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			
			CreatePermission: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			CreateProxy: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			
			Title: {
				type: DataTypes.STRING(128),
				//defaultValue: "",
				//allowNull: false
			},
			SubTitle: {
				type: DataTypes.STRING(128),
				//defaultValue: "",
				//allowNull: false
			},
			Type: {
				type: DataTypes.STRING(128),
				allowNull: false
			},
		};
	};
	
	const Link = ()=>{
		return{
			"For": "User",
			"From": "User",
		};
	};
	
	return{
		Definition,
		Link,
	};
})(ATA());