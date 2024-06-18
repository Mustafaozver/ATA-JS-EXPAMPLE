((ATA)=>{
	const HTTP = ANA.Library.HTTP;
	
	const http = HTTP.http; // https
	const app = HTTP.app;
	const Router = HTTP.Router();
	
	const config = ANA.Configurations.GetConstant("Environment");
	
	app.use((req, res, next)=>{
		const remoteAddress = "" + req.connection.remoteAddress;
		const userAgent = "" + req.headers["user-agent"];
		
		return next();
		
		res.setHeader("Access-Control-Allow-Origin", "http://" + config.DOMAIN + ":" + config.PORT + "/");
		res.setHeader("Access-Control-Allow-Origin", config.DOMAIN);
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
		//res.setHeader("Allow", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
		res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
		res.setHeader("Access-Control-Allow-Credentials", true);
		next();
	});
	
	app.use(Router);
	
	app.use(ATA.Require("./Controller/Express/Error/404.js"));
	
	ATA.Setups.push(()=>{
		const path = ATA.Path.join(ATA.CWD, "./Controller/Express/MiddleWare/");
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())return;
			const path_parse = ATA.Path.parse(filepath);
			if(path_parse === ".js")return;
			const mw = ATA.Require(filepath);
			Router.use((req, res, next)=>{
				mw(req, res, next);
			});
		});
	});
	
	ATA.Setups.push(()=>{
		const path = ATA.Path.join(ATA.CWD, "./Controller/Express/Router/");
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())return;
			const path_parse = ATA.Path.parse(filepath);
			if(path_parse === ".js")return;
			const router = ATA.Require(filepath);
			Router.use(router);
		});
	});
	
	ATA.Setups.push(()=>{
		const server = http.createServer(app);
		server.on("error", (error)=>{
			switch(error.code){
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
			//Logger.error("System works with non secure mood");
		});
		server.listen(config.PORT);
		ATA.Express.Server = server;
		
		ATA.Require("./Controller/Socket.js");
	});
	
	ATA.Express = {
		Router,
		//
	};
})(ATA());