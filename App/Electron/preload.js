((ATA, process, window)=>{
	const Electron = ATA.Require("electron");
	process.env["METHOD"] = "ELECTRON";
	ATA.Electron = Electron;
	ATA.Window = window;
	window.Electron = Electron;
	
	ATA.Send = (method, data)=>{
		Electron.ipcRenderer.send("msgfrompage", {
			method,
			data
		});
	};
	
	ATA.OnMessage = (data) => {
		console.log("GELEN DATA => ", data);
	};
	
	Electron.ipcRenderer.on("msgfromstarter", (event, arg)=>{
		ATA.OnMessage(arg);
	});
	
	ATA.Setups.push(()=>{
		ATA.Require("./Core/Electron.JS");
	});
})(require("ata.js")(), process, window);