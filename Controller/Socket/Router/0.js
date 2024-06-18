module.exports=(()=>{
	
	return (socket, data)=>{
		console.log("LOW");
		socket.emit("EXEC", "console.log(1453);", data);
	};
})(ATA());