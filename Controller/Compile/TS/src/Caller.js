((ATA, win, doc)=>{
	const Module = (()=>{
		
		const private_key = Symbol();
		
		const class_stack = {};
		const config_stack = {};
		const hidden_stack = {};
		
		const Generate_Config = (config={})=>{
			return Object.assign({
				//
				
			}, { ...config });
		};
		
		const register = (ins, tagname, area, config={})=>{
			const ID = Symbol();
			ins[private_key] = ID;
			
			//class_stack[ID] = ins;
			config_stack[ID] = Generate_Config(config);
			hidden_stack[ID] = {
				//
			};
		};
		
		const Class = class{
			[private_key] = null;
			constructor(tagname="DIV", config){
				register(this, config);
			};
		};
		
		return Class;
	})();
	
	return Module;
})(ATA(), window, document);