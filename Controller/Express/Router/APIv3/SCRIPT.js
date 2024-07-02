module.exports=((ATA)=>{
	const { Router, static, app } = ANA.Library.HTTP;
	const { C } = ANA.Library.i18n;
	const { CompileEJSFile, CompileTSFile, CompileSASSFile } = ANA.Library.Render;
	
	const dir = ATA.Path.join(ATA.CWD, "./Controller/Express/Router/APIv3/SCRIPT/");
	
	const GetTime = ()=>{
		const date = new Date();
		return date.getTime();
	};
	
	const GenerateData = (req, res)=>{
		
		return{
			time: GetTime(),
			C,
			req, res,
		};
	};
	
	const GenerateDataTS = (req, res)=>{
		
		return{
			TS: true,
		};
	};
	
	const GenerateDataCS = (req, res)=>{
		
		return{
			CS: true,
		};
	};
	
	const GetScript = async(req, res, filepath)=>{
		const render_data = GenerateData(req, res);
		const render_data_ts = GenerateDataTS(req, res);
		return await CompileTSFile(filepath, {
			...render_data,
			...render_data_ts,
		});
	};
	
	return async(req, res, resp)=>{
		const filepath = ATA.Path.join(dir, (req.query.script + "").toUpperCase() + ".js");
		resp.SCRIPT = await GetScript(req, res, filepath);
		return "OK";
	};
})(ATA());