((ATA)=>{
	const DBMS = ANA.Library.DBMS;
	const Stack = {};
	
	ANA.DBMS = {
		Stack,
		//...
	};
	
	const ScanDBS = ()=>{
		const path = ATA.Path.join(ATA.CWD, "./Controller/DBMS/");
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())return;
			const path_parse = ATA.Path.parse(filepath);
			if(path_parse === ".js")return;
			ATA.Require(filepath);
		});
	};
	
	ScanDBS();
	
})(ATA());