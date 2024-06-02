((ATA)=>{
	const Logger = ATA.Require("./Library/Logger.js");
	const Render = ATA.Require("./Library/Render.js");
	const DBMS = ATA.Require("./Library/DBMS.js");
	
	ATA.GLOBAL.ANA = {
		Library: {
			Logger,
			Render,
			DBMS,
		}
	};
	
	ATA.Setups.push(()=>{
		ATA.Require("./Controller/Logger.js");
		ATA.Require("./Controller/Configuration.js");
		ATA.Require("./Controller/DBMS.js");
		
		ATA.Require("./Service/Scenario.JS");
	});
})(ATA());