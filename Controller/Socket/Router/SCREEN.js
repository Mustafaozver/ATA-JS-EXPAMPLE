module.exports=((ATA)=>{
	
	const init = "var args = [...arguments];";
	
	return (socketid, data)=>{
		//console.log("LOW", data);
		//socket.emit("EXEC", "console.log(1453);");
		ATA.Socket.IO.to(socketid).emit("EXEC", "console.log(1682972);");
		
		ATA.Socket.IO.to(socketid).emit("SCREEN", {
			ARGS: [1,2,4,5],
			CODE: init + "(" + (()=>{
				SetTitle("ERKEK BÜYÜKLER LIGHT SANDA 48 KG");
				SetPlatform("PLATFORM A");
				SetRoundNo("ROUND 1");
				SetName("L", "ABDULHAK HAMİT ÖZTÜRKOĞLU");
				SetName("R", "MUSTAFA ÖZVER");
				SetSubInfo("L", "KAHRAMANMARAŞ");
				SetSubInfo("R", "BURSA");
				SetPoint("L", 0, 8, true);
				SetPoint("R", 0, 1, false);
				SetPoint("L", 2, 1);
				SetPoint("R", 2, 1);
				SetPoint("R", 5, 2, true);
				SetPoint("L", 4, 2, true);
				SetIHTAR("L", 3);
				SetIKAZ("L", 9);
				//SetCIKIS("L", 2);
				SetZSAYMA("L", 3);
				SetIHTAR("R", 3);
				//SetIKAZ("R", 9);
				//SetCIKIS("R", 2);
				//SetZSAYMA("R", 3);
				ReSetRoundTime("02:00");
			}) + ")();"
		});
	};
})(ATA());