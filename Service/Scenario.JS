((ATA)=>{
	//...
	
	ATA.Setups.push(()=>{
		console.log("\n\n\n\n");
		Logger.debug("Sistem Başlatılıyor...");
		ATA.Require("./Controller/Compile.js");
	});
})(ATA());