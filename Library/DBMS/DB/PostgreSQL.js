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
	
	const Connect = (config)=>{
		return new Sequelize(
			config.SCHEMA,
			config.USER,
			config.PASSWORD,
			{
				host: config.HOST,
				port: config.PORT,
				dialect: "postgres",
				pool: {
					max: 5,
					min: 0,
					acquire: 30000,
					idle: 10000,
				},
				logging: true,
			}
		);
	};
	
	return{
		DataTypes,
		Op,
		Model,
		GenerateConfig,
		Connect,
	};
})(ATA());