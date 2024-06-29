((ATA, win, doc)=>{
	const BASE = protocol + "//" + hostname + port;
	const path = "/UI.html";
	const CreateIFrame = (Area)=>{
		const iframe = new DomElement("IFRAME", Area);
		iframe.SetAttribute("src", BASE + path);
		iframe.SetClass("UI_iframe");
		
		return iframe;
	};
	
	const UI = (()=>{
		
		const private_key = Symbol();
		
		const class_stack = {};
		const config_stack = {};
		const hidden_stack = {};
		
		const Generate_Config = (config={})=>{
			return Object.assign({
				//
				
			}, { ...config });
		};
		
		const register = (ins, Area, config={})=>{
			const ID = Symbol();
			ins[private_key] = ID;
			
			//class_stack[ID] = ins;
			const iframe = CreateIFrame(Area);
			config_stack[ID] = Generate_Config(config);
			hidden_stack[ID] = {
				//
				iframe,
			};
		};
		
		const Class = class{
			[private_key] = null;
			constructor(Area, config){
				register(this, Area, config);
			};
			InjectJS(code=""){
				InjectJS(this, code);
			};
			get O(){
				return GetDom(this);
			};
		};
		
		const InjectJS = (ins, ocde)=>{
			//contentWindow
			const ID = ins[private_key];
			const iframe = hidden_stack[ID].iframe;
			
			iframe.contentWindow.postMessage(code);
		};
		
		const GetDom = (ins)=>{
			const ID = ins[private_key];
			const iframe = hidden_stack[ID].iframe.O;
			
			return iframe;
		};
		
		return Class;
	})();
	
	ATA.Setups.push(()=>{
		const iframe = new UI(doc.body);
	});
	
	return UI;
})(ATA(), window, document);