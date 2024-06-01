((ATA)=>{
	process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
	
	const Electron = ATA.Require("electron");
	
	const func_stack = {};
	
	func_stack["EXIT"] = ()=>{
		process.exit();
	};
	
	func_stack["LOG"] = (data)=>{
		console.log("PAGE LOG => ", data.data);
	};
	
	Electron.app.whenReady().then(()=>{
		const path = ATA.Path.join(ATA.CWD, "./App/Electron/View/index.html");
		const preload = ATA.Path.join(ATA.CWD, "./App/Electron/preload.js");
		
		const Top = new Electron.BrowserWindow();
		
		const Win = new Electron.BrowserWindow({
			parent: Top,
			width: 600,
			height: 400,
			webPreferences: {
				nodeIntegration: true,
				nodeIntegrationInWorker: true,
				nodeIntegrationInSubFrames: true,
				preload,
				contextIsolation: false,
				enableRemoteModule: true,
			},
		});
		
		Top.hide();
		Win.hide();
		//Win.show();
		
		Win.loadFile(path);
		//Win.loadURL("http://localhost:1683/");
		
		//Win.webContents.openDevTools(true);
		//Win.maximize();
		
		//Win.setAlwaysOnTop(true);
		//Win.setFullScreen(true);
		//Win.setProgressBar(50);
		//Win.setOpacity(50);
		//Win.setIcon("");
		Win.setMenuBarVisibility(true);
		Win.setMovable(true);
		Win.setClosable(true);
		Win.setResizable(true);
		//Win.setKiosk(true);
		//Win.setMenu();
		
		Electron.globalShortcut.register("Control+Shift+I", ()=>{
			return false;
		});
		
		Electron.globalShortcut.register("ESC", ()=>{
			const choice = Electron.dialog.showMessageBoxSync(Win, {
				type: "question",
				buttons: ["Leave", "Stay"],
				title: "Do you want to exit program?",
				message: "Changes you made may not be saved.",
				defaultId: 0,
				cancelId: 1
			});
			switch(choice){
				case 0:
					process.exit(0);
				break;
				default:
					
				break;
			}
			return false;
		});
		
		Win.webContents.on('will-prevent-unload', (event)=>{
			
		});
		
		ATA.ANA = {
			Electron,
			Top,
			Win,
		};
		
		func_stack["EVAL"] = (data, event)=>{
			const resp = eval(data.data);
			//event.reply(resp);
		};
		
		ATA.Send = (method, data)=>{
			Win.webContents.send("msgfromstarter", {
				method,
				data
			});
		};
		
		ATA.OnMessage = (data, event)=>{
			if(!data.method)return console.log("INVALID PAGE MSG => ", data);
			const method = data.method;
			const func = func_stack[method];
			if(func)return func(data, event);
			console.log("UNKNOWN PAGE MSG => ", data);
		};
		
		Electron.ipcMain.on("msgfrompage", (event, arg)=>{
			ATA.OnMessage(arg, event);
		});
	});
})(require("ata.js")());