((ATA)=>{
	process.env["METHOD"] = "MAIN";
	ATA.Require("./Core/Main.JS");
})(require("ata.js")());