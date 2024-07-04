module.exports=((ATA)=>{
	
	const Definition = (DataTypes)=>{
		return{
			firstname: {
				type: DataTypes.STRING(128),
				defaultValue: "",
			},
			lastname: {
				type: DataTypes.STRING(128),
				defaultValue: "",
			},
			kg: {
				type: DataTypes.FLOAT,
				allowNull: false,
				defaultValue: 0,
			},
			
		};
	};
	
	const Link = ()=>{
		return{
			//"Category": "Contact",
			"Reference": "User"
		};
	};
	
	const Associate = (Models, ME)=>{
		return;
		ME.hasOne(Models["User"], {
			as: "Reference_link_object",
			sourceKey: "Reference_link",
			foreignKey: "ID",
			//constraints: false,
		});
	};
	
	return{
		Definition,
		Associate,
		Link,
	};
})(ATA());