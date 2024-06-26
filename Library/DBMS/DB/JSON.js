module.exports=((ATA)=>{
	const filePath = ATA.Path.join(ATA.CWD, "./Constant/JSON.json");
	const Stack = {
		...(ATA.Require(filePath))
	};
	
	const Set = (key="", value=false)=>{
		Stack[key+""] = JSON.parse(JSON.stringify(value));
	};
	
	const Get = (key="")=>{
		return Stack[key + ""];
	};
	
	const Push = ()=>{
		//ATA.FS.writeFile(filePath, JSON.stringify(Stack), "UTF8", (err)=>{
		ATA.FS.writeFile(filePath, JSON.stringify(Stack, null, "\t"), "UTF8", (err)=>{
			if(err)Logger.error(err);
		})
	};
	
	ATA.Setups.push(()=>{
		//return;
		Set("count", 1+Get("count"));
		Push();
	});
	
	return{
		Set,
		Get,
		Push,
	};
	
})(ATA());