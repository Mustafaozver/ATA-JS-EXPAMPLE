module.exports=((ATA)=>{
	const { Router, static, app } = ANA.Library.HTTP;
	
	const Environment = ANA.Configurations.GetConstant("Environment");
	
	const router = Router();
	
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
		GenerateResponse((resp)=>{
			//
			resp.HHH = req.params;
		}).then((resp)=>{
			res.status(200).json(resp);
		});
	});
	
	return router;
})(ATA());