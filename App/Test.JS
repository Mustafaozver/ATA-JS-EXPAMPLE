((ATA)=>{
	process.env["METHOD"] = "TEST";
	ATA.Require("./Core/Test.JS");
})(require("ata.js")());