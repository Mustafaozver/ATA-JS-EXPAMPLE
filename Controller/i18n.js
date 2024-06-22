((ATA)=>{
	const i18n = ANA.Library.i18n;
	
	ATA.Setups.push(()=>{
		i18n.Configure({
			directory: ATA.Path.join(ATA.CWD, "./Locale/"),
			defaultLocale: "tr",
		});
		
		i18n.i18n.setLocale("tr");
		
		console.log(i18n.C("Greeting"));
	});
})(ATA());