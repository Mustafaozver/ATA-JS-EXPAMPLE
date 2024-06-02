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
		ATA.FS.writeFile(filePath, JSON.stringify(Stack, null, "\t"), "UTF8", (err)=>{
			if(err)Logger.error(err);
		})
	};
	
	return{
		Set,
		Get,
		Push,
	};
	
})(ATA());