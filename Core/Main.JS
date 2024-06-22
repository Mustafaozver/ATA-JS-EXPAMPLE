((ATA)=>{
	const Logger = ATA.Require("./Library/Logger.js");
	const Render = ATA.Require("./Library/Render.js");
	const Mail = ATA.Require("./Library/Mail.js");
	const DBMS = ATA.Require("./Library/DBMS.js");
	const i18n = ATA.Require("./Library/i18n.js");
	const HTTP = ATA.Require("./Library/HTTP.js");
	const Socket = ATA.Require("./Library/Socket.js");
	const Security = ATA.Require("./Library/Security.js");
	
	const Package = ATA.Require("./package.json");
	const Me = ATA.Require("./Service/Me.json");
	
	const Project = {
		Name: Package.name,
		Version: Package.version,
		Description: Package.description,
		Author: Package.author,
		License: Package.license,
	};
	
	ATA.GLOBAL.ANA = {
		Me,
		Package,
		Project,
		Library: {
			Logger,
			Render,
			Mail,
			DBMS,
			i18n,
			HTTP,
			Socket,
			Security,
		}
	};
	
	ATA.Setups.push(()=>{
		// Gerekli ayarlamaların uygulanması
		ATA.Require("./Controller/Configuration.js");
		
		// Gerekli Denetimlerin Etkinleştirilmesi
		ATA.Require("./Controller/Logger.js");
		ATA.Require("./Controller/Mail.js");
		ATA.Require("./Controller/DBMS.js");
		ATA.Require("./Controller/i18n.js");
		ATA.Require("./Controller/Security.js");
		ATA.Require("./Controller/Express.js");
		
		// Gerekli Servislerin Ayaklandırılması
	});
})(ATA());