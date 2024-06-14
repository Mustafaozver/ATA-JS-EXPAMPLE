module.exports=((ATA)=>{
	const { Router, static, app } = ANA.Library.HTTP;
	const { CompileEJSFile, CompileTSFile, CompileSASSFile } = ANA.Library.Render;
	
	const router = Router();
	
	const regex = /^(?<name>\S+)\.ejs$/g;
	const zeroTS = ATA.Path.join(ATA.CWD, "./View/EJS/TS/0.js");
	const zeroSASS = ATA.Path.join(ATA.CWD, "./View/EJS/SASS/0.css");
	
	const GetTime = ()=>{
		const date = new Date();
		return date.getTime();
	};
	
	const GenerateData = (req, res)=>{
		
		return{
			time: GetTime(),
		};
	};
	
	const GenerateDataTS = (req, res)=>{
		
		return{
			TS: true,
		};
	};
	
	const GenerateDataCS = (req, res)=>{
		
		return{
			CS: true,
		};
	};
	
	
	router.get("/JS", (req, res, next)=>{
		const render_data = GenerateData(req, res);
		const render_data_ts = GenerateDataTS(req, res);
		CompileTSFile(zeroTS, {
			...render_data,
			...render_data_ts,
		}).then((data)=>{
			res.setHeader("Content-Type", "application/javascript; charset=UTF-8");
			res.status(200).end(data);
		}).catch((err)=>{
			next(err);
		});
	});
	
	router.get("/CSS", (req, res, next)=>{
		const render_data = GenerateData(req, res);
		const render_data_cs = GenerateDataCS(req, res);
		CompileSASSFile(zeroSASS, {
			...render_data,
			...render_data_cs,
		}).then((data)=>{
			res.setHeader("Content-Type", "text/css; charset=UTF-8");
			res.status(200).end(data);
		}).catch((err)=>{
			next(err);
		});
	});
	
	ATA.Setups.push(()=>{
		const dir = ATA.Path.join(ATA.CWD, "./View/EJS/TS/");
		ATA.FS.readdirSync(dir).map((filename)=>{
			const filepath = ATA.Path.join(dir, filename);
			if(ATA.FS.statSync(filepath).isDirectory() || !regex.test(filename))return;
			router.get("/_/" + filename.split(".")[0].toUpperCase() + ".js", (req, res, next)=>{
				const render_data = GenerateData(req, res);
				const render_data_ts = GenerateDataTS(req, res);
				CompileTSFile(filepath, {
					...render_data,
					...render_data_ts,
				}).then((data)=>{
					res.setHeader("Content-Type", "application/javascript; charset=UTF-8");
					res.status(200).end(data);
				}).catch((err)=>{
					next(err);
				});
			});
		});
	});
	
	ATA.Setups.push(()=>{
		const dir = ATA.Path.join(ATA.CWD, "./View/EJS/SASS/");
		ATA.FS.readdirSync(dir).map((filename)=>{
			const filepath = ATA.Path.join(dir, filename);
			if(ATA.FS.statSync(filepath).isDirectory() || !regex.test(filename))return;
			router.get("/_/" + filename.split(".")[0].toUpperCase() + ".css", (req, res, next)=>{
				const render_data = GenerateData(req, res);
				const render_data_cs = GenerateDataCS(req, res);
				CompileSASSFile(filepath, {
					...render_data,
					...render_data_cs,
				}).then((data)=>{
					res.setHeader("Content-Type", "text/css; charset=UTF-8");
					res.status(200).end(data);
				}).catch((err)=>{
					next(err);
				});
			});
		});
	});
	
	ATA.Setups.push(()=>{
		const dir = ATA.Path.join(ATA.CWD, "./View/EJS/HTML/");
		ATA.FS.readdirSync(dir).map((filename)=>{
			const filepath = ATA.Path.join(dir, filename);
			if(ATA.FS.statSync(filepath).isDirectory() || !regex.test(filename))return;
			router.get("/_/" + filename.split(".")[0].toUpperCase() + ".html", (req, res, next)=>{
				const render_data = GenerateData(req, res);
				CompileEJSFile(filepath, {
					...render_data,
					...render_data_cs,
				}).then((data)=>{
					res.setHeader("Content-Type", "text/html; charset=UTF-8");
					res.status(200).end(data);
				}).catch((err)=>{
					next(err);
				});
			});
		});
	});
	
	return router;
})(ATA());