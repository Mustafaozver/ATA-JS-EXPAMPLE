((ATA)=>{
	const Logger = ATA.Require("./Library/Logger.js");
	const Render = ATA.Require("./Library/Render.js");
	const DBMS = ATA.Require("./Library/DBMS.js");
	const HTTP = ATA.Require("./Library/HTTP.js");
	const Security = ATA.Require("./Library/Security.js");
	
	ATA.GLOBAL.ANA = {
		Library: {
			Logger,
			Render,
			DBMS,
			HTTP,
			Security,
		}
	};
	
	ATA.Setups.push(()=>{
		ATA.Require("./Controller/Logger.js");
		ATA.Require("./Controller/Configuration.js");
		ATA.Require("./Controller/DBMS.js");
		//ATA.Require("./Controller/DBMS.js");
		ATA.Require("./Controller/Security.js");
		
		ATA.Require("./Service/Scenario.JS");
	});
})(ATA());