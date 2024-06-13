((ATA)=>{
	const HTTP = ANA.Library.HTTP;
	
	const http = HTTP.http; // https
	const app = HTTP.app;
	
	const config = ANA.Configurations.GetConstant("Environment");
	
	ATA.Setups.push(()=>{
		http.createServer(app);
		http.on("error", (error)=>{
			switch (error.code) {
				case "EACCES":
					Logger.error("Hata : Sunucu ek izinlere ihtiyaç duyuyor.");
					break;
				case "EADDRINUSE":
					Logger.error("Hata : Bu port zaten kullanılıyor.");
					break;
				default:
					Logger.error("Server Error => ");
					console.error(error);
					throw error;
					break;
			}
			return;
			setTimeout(()=>{
				Exit();
			}, 5000);
		});
		http.on("listening", ()=>{
			const ddr = http.address();
			Logger.info("HTTP server on " + ddr.address + ":" + ddr.port);
			Logger.error("System works with non secure mood");
		});
		http.listen(config.PORT);
	});
})(ATA());