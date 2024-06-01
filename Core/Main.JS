((ATA)=>{
	const Logger = ATA.Require("./Library/Logger.js");
	const Render = ATA.Require("./Library/Render.js");
	
	ATA.ANA = {
		Library: {
			Logger,
			Render,
		}
	};
	
	ATA.Setups.push(()=>{
		ATA.Require("./Controller/Logger.js");
		
		ATA.Require("./Service/Scenario.JS");
	});
})(ATA());