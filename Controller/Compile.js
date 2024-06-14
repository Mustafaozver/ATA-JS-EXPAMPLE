((ATA)=>{
	const Security = ANA.Library.Security;
	const { CompileTSFile, CompileSASSFile } = ANA.Library.Render;
	const config = ANA.Configurations.GetConstant("Security");
	
	const period = 1000 * 60 * 60 * 24 * 30;
	const cycled_key = (Math.floor((new Date()).getTime() / period) * 168297) % 1000;
	const secret_key = Security.GetHash("private_key", config.privatekey);
	
	const render_data = {
		time: (new Date()).getTime(),
		cycled_key,
		secret_key,
		msg: "BETA",
		version: "Beta-1.0.0.0-1",
		prefix: "Z0ZjVWZEJLs6lpqI",
	};
	
	const render_data_ts = {};
	const render_data_cs = {};
	
	ATA.Setups.push(()=>{
		const dir = ATA.Path.join(ATA.CWD, "./Controller/Compile/TS/");
		const regex = /^(?<name>\S+)\.js$/g;
		
		ATA.FS.readdirSync(dir).map((filename)=>{
			const filepath = ATA.Path.join(dir, filename);
			if(ATA.FS.statSync(filepath).isDirectory() || !regex.test(filename))return;
			const nPath = "./" + filename.split("_").join("/");
			
			Logger.info("Compile TS/JS File " + nPath);
			
			CompileTSFile(filepath, {
				...render_data,
				...render_data_ts,
			}).then((data)=>{
				ATA.FS.writeFile(ATA.Path.join(ATA.CWD, nPath), data, {
					flag: "w",
					encoding: "UTF8"
				}, (err)=>{
					if(err){
						Logger.error("Compiling File Write Error " + nPath);
						return;
					}
					Logger.info("Compiling File is DONE " + nPath);
				});
			});
		});
	});
	
	ATA.Setups.push(()=>{
		const dir = ATA.Path.join(ATA.CWD, "./Controller/Compile/SASS/");
		const regex = /^(?<name>\S+)\.css$/g;
		
		ATA.FS.readdirSync(dir).map((filename)=>{
			const filepath = ATA.Path.join(dir, filename);
			if(ATA.FS.statSync(filepath).isDirectory() || !regex.test(filename))return;
			const nPath = "./" + filename.split("_").join("/");
			
			Logger.info("Compile SASS/CSS File " + nPath);
			
			CompileSASSFile(filepath, {
				...render_data,
				...render_data_ts,
			}).then((data)=>{
				ATA.FS.writeFile(ATA.Path.join(ATA.CWD, nPath), data, {
					flag: "w",
					encoding: "UTF8"
				}, (err)=>{
					if(err){
						Logger.error("Compiling File Write Error " + nPath);
						return;
					}
					Logger.info("Compiling File is DONE " + nPath);
				});
			});
		});
	});
})(ATA());