module.exports=((ATA)=>{
	const Sequelize = ATA.Require("sequelize");
	const {DataTypes, Op, Model} = Sequelize;
	
	const GenerateConfig = (opts={})=>{
		return Object.assign({
			"USER": "postgres",
			"PASSWORD": "postgres",
			"SCHEMA": "postgres",
			"HOST": "localhost",
			"PORT": 5432
		}, {...opts});
	};
	
	return{
		DataTypes,
		Op,
		Model,
		GenerateConfig,
	};
})(ATA());