((ATA)=>{
	ATA.Require("dotenv").config();
	
	const admin_uuid = "00000000-0000-4000-8000-000000000000";
	const empty_uuid = "FFFFFFFF-FFFF-4FFF-BFFF-FFFFFFFFFFFF";
	
	const Constants = {};
	const Configs = {};
	
	const ScanConstants = ()=>{
		const path = ATA.Path.join(ATA.CWD, "./Constant/");
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())return;
			const path_parse = ATA.Path.parse(filepath);
			if(path_parse === ".json")return;
			Constants[filename.split(".")[0]] = ATA.Require(filepath);
		});
	};
	
	const ScanConfigs = ()=>{
		const path = ATA.Path.join(ATA.CWD, "./Config/");
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())return;
			const path_parse = ATA.Path.parse(filepath);
			if(path_parse === ".js")return;
			Configs[filename.split(".")[0]] = ATA.Require(filepath);
		});
	};
	
	const GetAdminUUID = ()=>{
		return admin_uuid;
	};
	
	const GetEmptyUUID = ()=>{
		return empty_uuid;
	};
	
	const GetConstant = (key="")=>{
		return Constants[key] || false;
	};
	
	const GetConfig = (key="")=>{
		return Configs[key] || false;
	};
	
	ScanConstants();
	ScanConfigs();
	
	ANA.Configurations = {
		GetAdminUUID,
		GetEmptyUUID,
		GetConstant,
		GetConfig,
	};
	
})(ATA());