module.exports=((ATA)=>{
	//const i18n = ATA.Require("i18n");
	
	/*
	role:
		ROOT
		EMPTY
		GUEST
	
	
	*/
	
	const ID = Symbol();
	const Path = Symbol();
	
	const User = class{
		[ID] = "";
		[Path] = "";
		constructor(ID){
			
		};
		Verify(){
			
		};
		Run(code=""){
			
		};
	};
	
	return{
		//...
	};
	
})(ATA());