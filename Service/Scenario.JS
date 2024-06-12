((ATA)=>{
	//...
	
	ATA.Setups.push(()=>{
		console.log("Sistem Başlatılıyor...");
		ATA.Require("./Controller/Compile.js");
	});
})(ATA());