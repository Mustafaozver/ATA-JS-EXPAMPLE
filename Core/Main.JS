((ATA)=>{
	const Logger = ATA.Require("./Library/Logger.js");
	const Render = ATA.Require("./Library/Render.js");
	const DBMS = ATA.Require("./Library/DBMS.js");
	const HTTP = ATA.Require("./Library/HTTP.js");
	const Security = ATA.Require("./Library/Security.js");
	
	const Package = ATA.Require("./package.json");
	
	ATA.GLOBAL.ANA = {
		Package,
		Library: {
			Logger,
			Render,
			DBMS,
			HTTP,
			Security,
		}
	};
	
	console.log("gg => ", Package);
	
	ATA.Setups.push(()=>{
		ATA.Require("./Controller/Logger.js");
		ATA.Require("./Controller/Configuration.js");
		ATA.Require("./Controller/DBMS.js");
		//ATA.Require("./Controller/DBMS.js");
		ATA.Require("./Controller/Security.js");
		
		ATA.Require("./Service/Scenario.JS");
	});
})(ATA());