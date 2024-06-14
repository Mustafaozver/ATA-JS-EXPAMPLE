module.exports=((ATA)=>{
	const { Router, static, app } = ANA.Library.HTTP;
	
	const router = Router();
	
	app.set("views", ATA.Path.join(ATA.CWD, "./View/www/"));
	router.use(static(ATA.Path.join(ATA.CWD, "./View/www/"), { index: "index.html" }));
	
	//router.use(ATA.Require("./Controller/Express/Error/404.js"));
	
	return router;
})(ATA());