((ATA, win, doc)=>{
	const Storage = (()=>{
		
		const private_key = Symbol();
		
		const class_stack = {};
		const config_stack = {};
		const hidden_stack = {};
		
		const Generate_Config = (config={})=>{
			return Object.assign({
				default: false,
				
			}, { ...config });
		};
		
		const register = (ins, Name, config={})=>{
			const ID = Symbol();
			ins[private_key] = ID;
			
			//class_stack[ID] = ins;
			config_stack[ID] = Generate_Config(config);
			hidden_stack[ID] = {
				Name,
				Value: false,
			};
		};
		
		const Class = class{
			[private_key] = null;
			constructor(name, config){
				register(this, name, config);
			};
			get Value(){
				const ID = this[private_key];
				return hidden_stack[ID].Value || config_stack[ID].Value;
			};
			set Value(val){
				const ID = this[private_key];
				hidden_stack[ID].Value = val;
			};
			toString(){
				const ID = this[private_key];
				return hidden_stack[ID].Value;
			};
			valueOf(){
				const ID = this[private_key];
				return hidden_stack[ID].Value;
			};
			Save(){
				SetData(this);
			};
			Restore(){
				//const l_val = this.Value;
				const ID = this[private_key];
				const n_val = GetData(this);
				hidden_stack[ID].Value = n_val;
				return n_val;
			};
			Push(){}; // servera kaydet
			Pull(){}; // serverdan getir
		};
		
		const GetData = (ins)=>{
			const ID = ins[private_key];
			const name = hidden_stack[ID].Name;
			try{
				return JSON.parse(localStorage.getItem(name + "_" + prefix) || "");
			}catch(e){
				console.error(e);
			}
			return config_stack[ID].default;
		};
		
		const SetData = (ins)=>{
			const ID = ins[private_key];
			const name = hidden_stack[ID].Name;
			try{
				return localStorage.setItem(name + "_" + prefix, JSON.stringify(hidden_stack[ID].Value));
			}catch(e){
				console.error(e);
			}
			return false;
		};
		
		return Class;
	})();
	
	
	/*
	
	
	
	const PushDataStorage = async(name, value={})=>{
		const query = {
			save: true,
			//
		};
		const req = await ATA.Communication.Request(BASE + "/session/preferences/" + name, {
			data :value,
			prefix,
			//
		}, query, {
			method: "POST",
		}, {
			"Accept": "application/json",
			"Content-Type": "application/json",
		});
		const resp = await req.json();
		return resp;
	};
	
	const PullDataStorage = async(name)=>{
		const query = {
			save: false,
			//
		};
		const req = await ATA.Communication.Request(BASE + "/session/preferences/" + name, {
			//data,
			prefix,
			//
		}, query, {
			method: "POST",
		}, {
			"Accept": "application/json",
			"Content-Type": "application/json",
		});
		const resp = await req.json();
		if(resp.success){
			return resp.data;
		}
		return{};
	};
	
	*/
	
	return Storage;
})(ATA(), window, document);