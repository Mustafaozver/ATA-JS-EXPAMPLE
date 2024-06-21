((ATA, win, doc)=>{
	// DomElement
	const DomElement = (()=>{
		
		const private_key = Symbol();
		
		const class_stack = {};
		const config_stack = {};
		const hidden_stack = {};
		
		const Generate_Config = (config={})=>{
			const default_config = {
				
			};
			
			return Object.assign({
				// configurations
			}, { ...default_config }, { ...config });
		};
		
		const register = (ins, tagname, area, config={})=>{
			const ID = Symbol();
			ins[private_key] = ID;
			
			let ele = null;
			
			if(config.Element){
				ele = config.Element
			}else{
				ele = doc.createElement(tagname);
				area.appendChild(ele);
			}
			
			//class_stack[ID] = ins;
			config_stack[ID] = Generate_Config(config);
			hidden_stack[ID] = {
				ele,
				childs:[],
			};
		};
		
		const Class = class{
			[private_key] = null;
			constructor(tagname="DIV", area=doc.body, config){
				register(this, tagname, area, config);
			};
			Remove(){
				Remove(this);
			};
			AddElement(tagname){
				return AddElement(this, tagname);
			};
			SetClass(classname=""){
				SetClass(this, classname);
				return this;
			};
			SetStyle(css){
				SetStyle(this, css);
				return this;
			};
			SetAttribute(key, value){
				SetAttribute(this, key, value);
				return this;
			};
			get $(){
				return Get$(this);
			};
			get O(){
				return GetO(this);
			};
			Text(text){
				SetText(this, text);
				return this;
			};
		};
		
		const Remove = (ins)=>{
			Get$(ins).remove();
		};
		
		const AddElement = (ins, tagname)=>{
			const ID = ins[private_key];
			const ele = hidden_stack[ID].ele;
			
			const dom = new Class(tagname, ele);
			
			hidden_stack[ID].childs.push(dom);
			
			return dom;
		};
		
		const SetClass = (ins, classname)=>{
			const ID = ins[private_key];
			const ele = hidden_stack[ID].ele;
			
			ele.className = "" + classname;
		};
		
		const SetStyle = (ins, css)=>{
			const ID = ins[private_key];
			const ele = hidden_stack[ID].ele;
			
			ele.style.cssText = css + "";
		};
		
		const SetAttribute = (ins, key, value)=>{
			const ID = ins[private_key];
			const ele = hidden_stack[ID].ele;
			
			ele.setAttribute(key, value);
		};
		
		const GetO = (ins)=>{
			const ID = ins[private_key];
			const ele = hidden_stack[ID].ele;
			return ele;
		};
		
		const Get$ = (ins)=>{
			return $(ins.O);
		}; 
		
		const SetText = (ins, text)=>{
			const ID = ins[private_key];
			const ele = hidden_stack[ID].ele;
			
			ele.innerHTML = "" + text;
		};
		
		return Class;
	})();
	
	return DomElement;
	// Dom Element
})(ATA(), window, document);