module.exports=((ATA)=>{
	
	
	
	return (socketid, data)=>{
		//console.log("LOW", data);
		//socket.emit("EXEC", "console.log(1453);");
		ATA.Socket.IO.to(socketid).emit("EXEC", "console.log(1682972);");
	};
})(ATA());