module.exports=((ATA)=>{
	const page = ATA.Path.join(ATA.CWD, "./View/error/404.html");
	
	return (req, res, next)=>{
		res.status(404).sendFile(page);
	};
})(ATA());