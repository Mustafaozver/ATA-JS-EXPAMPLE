((ATA)=>{
	const inspector = ATA.Require("inspector");
	
	inspector.open(9555);
	process.env["METHOD"] = "INSTALL";
	ATA.Require("./Core/Main.JS");
	ATA.Setups.push(()=>{
		console.log("Inspector on => ", inspector.url());
		
		ATA.Require("./Core/Install.JS");
	});
})(require("ata.js")());