module.exports=((ATA)=>{
	const Stack = {};
	
	const ScanDBS = ()=>{
		const path = ATA.Path.join(ATA.CWD, "./Library/DBMS/DB/");
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())return;
			const path_parse = ATA.Path.parse(filepath);
			if(path_parse === ".js")return;
			Stack[filename.split(".")[0]] = ATA.Require(filepath);
		});
	};
	
	ScanDBS();
	
	return{
		...Stack,
		//
	};
	
})(ATA());