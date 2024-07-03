module.exports=((ATA)=>{
	const { Router, static, app } = ANA.Library.HTTP;
	const Environment = ANA.Configurations.GetConstant("Environment");
	const router = Router();
	const Stack = {};
	
	const GenerateResponse = async(callback=()=>{})=>{
		const resp = {
			//
		};
		try{
			resp.success = true;
			resp.error = false;
			resp.msg = await callback(resp);
		}catch(e){
			resp.success = false;
			resp.error = true;
			resp.msg = e + "";
		}
		return resp;
	};
	
	router.all(Environment.API_V3 + "/:name", (req, res, next)=>{
		GenerateResponse(async(resp)=>{
			const f = Stack["" + req.params.name];
			if(f)return f(req, res, resp);
			resp.success = false;
			return "UNKNOWN FUNCTION";
		}).then((resp)=>{
			res.status(200).json(resp);
		});
	});
	
	ATA.Setups.push(()=>{
		const path = ATA.Path.join(ATA.CWD, "./Controller/Express/Router/APIv3/");
		ATA.FS.readdirSync(path).map((filename)=>{
			const filepath = ATA.Path.join(path, filename);
			if(ATA.FS.statSync(filepath).isDirectory())return;
			const path_parse = ATA.Path.parse(filepath);
			if(path_parse === ".js")return;
			const name = filename.split(".")[0].toUpperCase();
			Stack[name] = ATA.Require(filepath);
		});
	});
	
	return router;
})(ATA());