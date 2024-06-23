((ATA)=>{
	const explorer = ATA.Require("express-explorer");
	const serveIndex = ATA.Require("serve-index");
	
	ATA.Setups.push(()=>{
		ATA.Express.Router.use("/pages", explorer({
			format: "html"
		}));
		ATA.Express.Router.use("/explore", serveIndex(ATA.Path.join(ATA.CWD, "./"), {
			icons: true
		}));
	});
})(ATA());