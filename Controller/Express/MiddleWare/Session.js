module.exports=((ATA)=>{
	
	return (req, res, next)=>{
		req.LOO = "erdhytf";
		next();
	};
})(ATA());