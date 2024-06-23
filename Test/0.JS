((ATA)=>{
	const explorer = ATA.Require("express-explorer");
	
	ATA.Setups.push(()=> {
		ATA.Express.Router.use("/explorer", explorer({
			format: "html"
		}));
	});
})(ATA());