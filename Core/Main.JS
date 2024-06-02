((ATA)=>{
	const Logger = ATA.Require("./Library/Logger.js");
	const Render = ATA.Require("./Library/Render.js");
	
	ATA.GLOBAL.ANA = {
		Library: {
			Logger,
			Render,
		}
	};
	
	ATA.Setups.push(() => {
		ATA.Require("./Controller/Logger.js");
		ATA.Require("./Controller/Configuration.js");
		
		ATA.Require("./Service/Scenario.JS");
	});
})(ATA());