((ATA)=>{
	process.env["METHOD"] = "INSTALL";
	ATA.Require("./Core/Main.JS");
})(require("ata.js")());