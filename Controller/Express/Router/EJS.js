module.exports=((ATA)=>{
	const { Router, static, app } = ANA.Library.HTTP;
	const { CompileTSFile, CompileSASSFile } = ANA.Library.Render;
	
	const router = Router();
	
	const regex = /^(?<name>\S+)\.ejs$/g;
	const zeroTS = ATA.Path.join(ATA.CWD, "./View/EJS/TS/0.js");
	const zeroSASS = ATA.Path.join(ATA.CWD, "./View/EJS/SASS/0.css");
	
	const render_data  = {};
	const render_data_ts = {};
	const render_data_cs = {};
	
	
	router.get("/JS", (req, res, next)=>{
		CompileTSFile(zeroTS, {
			...render_data,
			...render_data_ts,
		}).then((data)=>{
			res.setHeader("Content-Type", "application/javascript; charset=UTF-8");
			res.status(200).end(data);
		}).catch((err)=>{
			//next(err);
		});
	});
	
	router.get("/CSS", (req, res, next)=>{
		CompileSASSFile(zeroSASS, {
			...render_data,
			...render_data_cs,
		}).then((data)=>{
			res.setHeader("Content-Type", "text/css; charset=UTF-8");
			res.status(200).end(data);
		}).catch((err)=>{
			//next(err);
		});
	});
	
	ATA.Setups.push(()=>{
		const dir = ATA.Path.join(ATA.CWD, "./View/EJS/TS/");
		ATA.FS.readdirSync(dir).map((filename)=>{
			const filepath = ATA.Path.join(dir, filename);
			if(ATA.FS.statSync(filepath).isDirectory() || !regex.test(filename))return;
			console.log(filepath);
			router.get("/_/" + filename.toUpperCase(), (req, res, next)=>{
				CompileTSFile(filepath, {
					...render_data,
					...render_data_ts,
				}).then((data)=>{
					res.setHeader("Content-Type", "application/javascript; charset=UTF-8");
					res.status(200).end(data);
				}).catch((err)=>{
					//next(err);
				});
			});
		});
	});
	
	ATA.Setups.push(()=>{
		const dir = ATA.Path.join(ATA.CWD, "./View/EJS/SASS/");
		ATA.FS.readdirSync(dir).map((filename)=>{
			const filepath = ATA.Path.join(dir, filename);
			if(ATA.FS.statSync(filepath).isDirectory() || !regex.test(filename))return;
			console.log(filepath);
			router.get("/_/" + filename.toUpperCase(), (req, res, next)=>{
				CompileSASSFile(filepath, {
					...render_data,
					...render_data_cs,
				}).then((data)=>{
					res.setHeader("Content-Type", "text/css; charset=UTF-8");
					res.status(200).end(data);
				}).catch((err)=>{
					//next(err);
				});
			});
		});
	});
	
	return router;
})(ATA());