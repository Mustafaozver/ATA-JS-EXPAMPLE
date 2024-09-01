((ATA)=>{
	//...
	ATA.Require("./Test/0.JS");
	ATA.Require("./Core/Main.JS");
	
	ATA.Setups.push(()=>{
		//ATA.Require("./Service/Scenario.JS");
		//ATA.Require("./Test/Scenario0.JS");
	});
})(ATA());