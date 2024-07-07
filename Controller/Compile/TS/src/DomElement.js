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
			AddElement(tagname, config={}){
				return AddElement(this, tagname, config);
			};
			AddComponent(name, config={}){
				return AddComponent(this, name, config);
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
		
		const AddElement = (ins, tagname, config={})=>{
			const ID = ins[private_key];
			const ele = hidden_stack[ID].ele;
			
			const dom = new Class(tagname, ele, config);
			
			hidden_stack[ID].childs.push(dom);
			
			return dom;
		};
		
		const AddComponent = (ins, name, config={})=>{
			const ID = ins[private_key];
			const ele = hidden_stack[ID].ele;
			
			const component = Stack[name];
			
			const dom = new component(ele, config);
			
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
	
	
	
	
	
	
	const Button = (()=>{
		const Class = class extends DomElement{
			constructor(ele=doc.body, config={}){
				super("BUTTON", ele, config);
				this.SetClass();
			};
			Click(f=()=>{}){
				this.$.click(f);
			};
			SetClass(classname=""){
				return super.SetClass(classname + " btn");
			};
		};
		return Class;
	})();
	
	const Icon = (()=>{
		const Class = class extends DomElement{
			constructor(ele=doc.body, config){
				super("I", ele);
				this.SetClass(config);
			};
			SetClass(classname=""){
				return super.SetClass("fa fa-" + classname);
			};
		};
		return Class;
	})();
	
	const SelectInput = (()=>{
		const Class = class extends DomElement{
			constructor(ele=doc.body, config={}){
				super("SELECT", ele, config);
				this.SetClass();
			};
			//
			SetClass(classname=""){
				return super.SetClass(classname + " form-select");
			};
			SetOption(arr=[]){
				const THAT = this;
				this.$.children("option").remove();
				this.Text("<" + "option hidden disabled selected value>Seçiniz...<" + "/option>");
				arr.map((item, index)=>{
					const option = THAT.AddElement("OPTION");
					option.SetAttribute("value", item.ID);
					option.Text(item.Name);
				});
			};
			get Value(){
				return this.O.value;
			};
			set Value(val=""){
				this.O.value = val;
			};
		};
		return Class;
	})();
	
	const Input = (()=>{
		const Class = class extends DomElement{
			constructor(ele=doc.body, config){
				const type = (config + "").toUpperCase();
				super("INPUT", ele, {});
				this.SetAttribute("type", type);
				this.SetClass();
			};
			SetClass(classname=""){
				return super.SetClass(classname + " form-control");
			};
			get Value(){
				return this.O.value;
			};
			set Value(val=""){
				this.O.value = val;
			};
		};
		return Class;
	})();
		
	const TextInput = (()=>{
		const Class = class extends Input{
			constructor(ele=doc.body){
				super(ele, "TEXT");
			};
		};
		return Class;
	})();
	
	const PasswordInput = (()=>{
		const Class = class extends Input{
			constructor(ele=doc.body){
				super(ele, "PASSWORD");
			};
		};
		return Class;
	})();
	
	const CheckBoxInput = (()=>{
		const Class = class extends Input{
			constructor(ele=doc.body){
				super(ele, "CHECKBOX");
				this.Value = false;
				this.SetClass("form-check-input");
			};
			get Value(){
				return this.O.checked ? true : false;
			};
			set Value(val=false){
				this.O.checked = val ? true : false;
			};
		};
		return Class;
	})();
	
	const Table = (()=>{
		
		const Row = class{
			Data = null;
			Over = {};
			constructor(data){
				this.Data = {...data};
			};
			GetValue(key){
				return this.Data[key];
			};
			SetOver(key, value){
				this.Over["" + key] = value;
			};
			GetOver(key){
				return this.Over["" + key];
			};
		};
		
		const Column = class{
			Renderer = null;
			Name = "";
			constructor(name){
				this.Name = name + "";
				this.Renderer = ((key)=>{
					return(data, col, row, table, index)=>{
						col.Text(data.GetValue(key));
					};
				})(name + "");
			};
			Build(data, col, row, table, index){
				this.Renderer(data, col, row, table, index);
			};
		};
		
		const BuildTable = (table)=>{
			const rows = table.rows.length;
			const columns = table.columns.length;
			
			
			for(let j=0;j<columns;j++){
				const TD = table.thead.AddElement("TD");
				TD.Text(table.columns[j].Name);
			}
			
			for(let i=0;i<rows;i++){
				const TR = table.tbody.AddElement("TR");
				for(let j=0;j<columns;j++){
					const TD = TR.AddElement("TD");
					table.columns[j].Build(table.rows[i], TD, TR, table, i);
				}
			}
		};
		
		/*
		.tableFixHead          { overflow: auto; height: 100px; }
.tableFixHead thead th { position: sticky; top: 0; z-index: 1; }
		
		*/
		
		const Class = class extends DomElement{
			columns_obj = {};
			columns = [];
			rows = [];
			
			thead = null;
			tbody = null;
			tfoot = null;
			constructor(ele=doc.body, config={}){
				super("DIV", ele, config);
				const table = new DomElement("TABLE", this.O);
				table.SetClass("table-borderless table table-hover table-striped");
				this.SetStyle("overflow: auto;width:100%;height:100%;border:3px solid #808080;");
				this.thead = table.AddElement("THEAD").AddElement("TR").SetStyle("font-weight:700;position:sticky;top:0;z-index:1;");
				this.tbody = table.AddElement("TBODY");
				this.tfoot = table.AddElement("TFOOT").SetStyle("display:;").AddElement("TR").SetStyle("font-weight:700;position:sticky;bottom:0;z-index:1;").AddElement("TD");
				
			};
			Build(){
				this.Clear();
				BuildTable(this);
				this.tfoot.SetAttribute("colspan", this.columns.length);
			};
			Clear(){
				this.tbody.$.children("*").remove();
			};
			SetColumns(arr=[]){
				//this.columns_obj
				return this.columns = arr.map((data)=>{
					return new Column(data);
				});
			};
			SetData(arr=[]){
				return this.rows = arr.map((data)=>{
					return new Row(data);
				});
			};
		};
		
		return Class;
	})();
	
	
	const Modal = (()=>{
		
		const Class = class extends DomElement{
			shell = null;
			constructor(title, config={}){
				super("DIV", doc.body, config);
				
				this.SetClass("modal_shell_area");
				
				this.win = this.AddElement("DIV").SetClass("modal_window_area card");
				
				this.header = ((that)=>{
					const header = that.win.AddElement("DIV").SetClass("card-header d-flex w-100 justify-content-between");
					
					const h_title = header.AddElement("H2").SetClass("card-title mb-1");
					
					const close_btn = header.AddComponent("Button").SetClass("btn-secondary mb-1");
					close_btn.Text("&times;");
					close_btn.Click(()=>{
						that.Close();
					});
					
					return h_title;
				})(this);
				
				this.body = this.win.AddElement("DIV").SetClass("card-body");
				
				
				this.footer = ((that)=>{
					const footer = that.win.AddElement("DIV").SetClass("card-footer d-flex flex-row-reverse");
					
					return footer;
				})(this);
			};
			SetTitle(title){
				this.header.Text(title + "");
			};
			Close(){
				this.$.remove();
			};
		};
		return Class;
	})();
	
	
	const Stack = {
		Button,
		Icon,
		Table,
		SelectInput,
		TextInput,
		PasswordInput,
		CheckBoxInput,
		Modal,
	};
	
	Object.assign(DomElement, { ...Stack });
	
	return DomElement;
	// Dom Element
})(ATA(), window, document);