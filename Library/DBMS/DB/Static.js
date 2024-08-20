module.exports=((ATA)=>{
try{
	const Stack = {};
	
	const ScanStatics = ()=>{
		const path = ATA.Path.join(ATA.CWD, "./DB/Static/");
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())return;
			const path_parse = ATA.Path.parse(filepath);
			if(path_parse === ".js")return;
			Stack[filename.split(".")[0]] = ATA.Require(filepath);
		});
	};
	
	ScanStatics();
	
	return{
		...Stack,
		//
	};
	
}catch(e){console.log(e)}
})(ATA());