module.exports=((ATA)=>{
	const Static = {};
	
	const ScanStatics = ()=>{
		const path = ATA.Path.join(ATA.CWD, "./DB/Static/");
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())return;
			const path_parse = ATA.Path.parse(filepath);
			if(path_parse === ".js")return;
			Static[filename] = ATA.Require(filepath);
		});
	};
	
	ScanStatics();
	
	return{
		...Static,
		//
	};
	
})(ATA());