((ATA)=>{
	ATA.Require("./Core/Main.JS");
	
	ATA.Setups.push(()=>{
		ATA.Send("EVAL", "ANA.Win.show();");
		ATA.Require("./Service/Scenario.JS");
	});
})(ATA());