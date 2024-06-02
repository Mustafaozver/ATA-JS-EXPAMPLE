((ATA)=>{
	const CP = ATA.Require("child_process");
	
	const Setup = ()=>{
		let worker = null;
		const path = ATA.Path.join(ATA.CWD, "./App/Main.JS");
		const mode = "PROD";
		const Start = ()=>{
			worker = CP.spawn("sudo", ["-s -k", "node", path, mode], {
				stdio: "inherit",
				shell: true,
				cwd: ATA.CWD,
				//detached: true,
				env: {
					mode,
					
				}
			});
			worker.addListener("exit", ()=>{
				console.log("exit");
				OnExit();
			});
		};
		const ReStart = ()=>{
			try {
				worker.terminate();
			} catch (e) { }
			try {
				Start();
			} catch (e) { }
		};
		const OnExit = ()=>{
			//return;
			setTimeout(ReStart, 1);
		};
		Start();
	};
	
	ATA.Setups.push(()=>{
		Setup();
	});
})(require("ata.js")());