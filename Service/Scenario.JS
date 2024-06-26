((ATA)=>{
	//...
	
	const Platform = (()=>{
		let count = 0;
		const Class = class{
			ID = 0;
			constructor(){
				this.ID = "P_" + count;
				this.Name = GetName();
				Platforms[this.ID] = this;
			};
		};
		
		const Arr = ["A", "B", "C", "D", "E"];
		
		const GetName = ()=>{
			return "Platform " + Arr[count++];
		};
		
		return Class;
	})();
	
	const Platforms = {};
	
	const GetPlatforms = ()=>{
		return Object.keys(Platforms);
	};
	
	ATA.Setups.push(()=>{
		console.log("\n\n\n\n");
		Logger.debug("Sistem Başlatılıyor...");
		ATA.Require("./Controller/Compile.js");
	});
})(ATA());