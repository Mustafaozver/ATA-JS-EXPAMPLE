((ATA)=>{
	
	ATA.Setups.push(()=>{
		ATA.Send("EVAL", "ATA.ANA.Win.show();");
	});
	
})(ATA());