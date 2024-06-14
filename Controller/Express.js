((ATA)=>{
	const HTTP = ANA.Library.HTTP;
	
	const http = HTTP.http; // https
	const app = HTTP.app;
	const router = HTTP.Router();
	
	const config = ANA.Configurations.GetConstant("Environment");
	
	app.use((req, res, next)=>{
		const remoteAddress = "" + req.connection.remoteAddress;
		//const userAgent = "" + req.headers["user-agent"];
		
		//res.setHeader("Access-Control-Allow-Origin", "http://" + ATA.config.DOMAIN + ":" + port + "/");
		res.setHeader("Access-Control-Allow-Origin", domain);
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
		//res.setHeader("Allow", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
		res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
		res.setHeader("Access-Control-Allow-Credentials", true);
		next();
	});
	
	app.use(router);
	
	ATA.Setups.push(()=>{
		const server = http.createServer(app);
		server.on("error", (error)=>{
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
		server.on("listening", ()=>{
			const ddr = server.address();
			Logger.info("HTTP server on " + ddr.address + ":" + ddr.port);
			Logger.error("System works with non secure mood");
		});
		server.listen(config.PORT);
	});
})(ATA());