module.exports=((ATA)=>{
	const i18n = ATA.Require("i18n");
	
	const Configure = (option)=>{
		i18n.configure(Object.assign({
			locales: ["tr", "en"],
			directory: "./Locale",
			defaultLocale: "tr",
			objectNotation: true,
			updateFiles: false,
			logDebugFn: (msg)=>{
				Logger.debug(msg);
			},
			// setting of log level WARN - default to require('debug')('i18n:warn')
			logWarnFn: (msg)=>{
				Logger.warn(msg);
			},
			// setting of log level ERROR - default to require('debug')('i18n:error')
			logErrorFn: (msg)=>{
				Logger.error(msg);
			},
			missingKeyFn: (locale, value)=>{
				Logger.error("Missing Lang Key [" + locale + "] => \"" + value + "\"");
				return value;
			}
		}, {...option}));
	};
	
	const C = function(){
		const args = [...arguments];
		return i18n.__.apply(i18n, args);
	};
	
	return{
		Configure,
		C,
		i18n,
	};
	
})(ATA());