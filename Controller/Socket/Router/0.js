module.exports=(()=>{
	
	return (socket, data)=>{
		console.log("LOW", data);
		socket.emit("EXEC", "console.log(1453);");
	};
})(ATA());