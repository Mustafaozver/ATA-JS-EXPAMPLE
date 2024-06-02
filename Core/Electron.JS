((ATA)=>{
	
	ATA.Setups.push(()=>{
		ATA.Send("EVAL", "ANA.Win.show();");
	});
	
})(ATA());