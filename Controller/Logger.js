((ATA)=>{
	const Logger = ANA.Library.Logger;
	
	ATA.GLOBAL.Logger = Logger.createLog([
		Logger.file_transport,
		Logger.console_transport,
	]);
	
	ATA.Setups.push(()=>{
		const console_log = console.log;
		const console_info = console.info;
		const console_warn = console.warn;
		const console_error = console.error;
		const console_debug = console.debug;
		
		console.log = function(){
			const args = [...arguments];
			console_log.apply(console, args);
			//ATA.GLOBAL.Logger.debug("info", args.join(" "));
		};
		
		console.info = function(){
			const args = [...arguments];
			//console_info.apply(console, args);
			ATA.GLOBAL.Logger.info(args.join(" "));
		};
		
		console.warn = function(){
			const args = [...arguments];
			//console_warn.apply(console, args);
			ATA.GLOBAL.Logger.warn(args.join(" "));
		};
		
		console.error = function(){
			const args = [...arguments];
			//console_error.apply(console, args);
			ATA.GLOBAL.Logger.log("error", args.join(" "));
		};
		
		console.debug = function(){
			const args = [...arguments];
			//console_debug.apply(console, args);
			ATA.GLOBAL.Logger.log("debug", args.join(" "));
		};
	});
	
})(ATA());
