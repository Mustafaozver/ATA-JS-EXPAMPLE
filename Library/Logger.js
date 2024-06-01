module.exports=((ATA)=>{
	const Winston = ATA.Require("winston");
	const DailyRotateFile = ATA.Require("winston-daily-rotate-file");
	
	const {format, createLogger, transports} = Winston;
	const {combine, timestamp, label, json, colorize, printf, prettyPrint} = format;
	
	const logsFolderPath = ATA.Path.join(ATA.CWD, "./Log/");
	
	const file_transport = new DailyRotateFile({
		filename: logsFolderPath + "/log-%DATE%.log",
		datePattern: "YYYY-MM-DD",
		zippedArchive: true,
		maxSize: "20m",
		maxFiles: "14d",
		//json: true,
	});
	
	file_transport.on("new", (filename)=>{});
	file_transport.on("rotate", (oldFilename, newFilename)=>{});
	file_transport.on("archive", (zipFilename)=>{});
	file_transport.on("logRemoved", (removedFilename)=>{});
	
	const customFormat = printf(({ level, message, label, timestamp })=>{ // custom printf
		return "" + timestamp + " [" + label + "] " + level + " " + message;
	});
	
	const console_transport = new transports.Console({
		format: combine(colorize({
			all: true,
		})),
	});
	
	const transport_list = [];
	
	transport_list.push(console_transport);
	transport_list.push(file_transport);
	
	
	const createLog = (transports)=>{
		return createLogger({
			level: "debug",
			format: combine(label({
					label: "LOG"
				}), timestamp({
					format: "MM-DD-YYYY HH:mm:ss.SSS",
				}), customFormat),
			transports: transports,
		});
	};
	
	return{
		file_transport,
		console_transport,
		// external_transport,
		createLog,
	};
})(ATA());

