((ATA)=>{
	process.env["METHOD"] = "MAIN";
	ATA.Require("./Core/Main.JS");
	
	ATA.Setups.push(()=>{
		ATA.Require("./Service/Scenario.JS");
	});
})(require("ata.js")());