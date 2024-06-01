((ATA)=>{
	const Logger = ATA.Require("./Library/Logger.js");
	const Render = ATA.Require("./Library/Render.js");
	
	ATA.Setups.push(()=>{
		ATA.Require("./Service/Scenario.JS");
	});
})(ATA());