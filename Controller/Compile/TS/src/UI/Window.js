((ATA, win, doc)=>{
	
	const HeadHeight = 30;
	let LastZIndex = 15000;
	var ActiveWindow = false;
	
	let Action = false;
	let Container = null;
	let Lock = null;
	let Flu = null;
	
	const MOVE = 0;
	const RESIZE = 1;
	
	
	const GenerateWinDom = ()=>{
		const dom = new DomElement("DIV", Container.O);
		dom.SetClass("ata_window").SetStyle("width:400px;height:250px;left:150px;top:150px;display:none;");
		return dom;
	};
	
	const Window = (()=>{
		
		const private_key = Symbol();
		
		const class_stack = {};
		const config_stack = {};
		const hidden_stack = {};
		
		const id_stack = {};
		let count_id = 0;
		
		const Generate_Config = (config={})=>{
			return Object.assign({
				//
				
			}, { ...config });
		};
		
		
		const documentMouseUp = (event)=>{
			Action = false;
			ActiveWindow = false;
			ContentAccess(null, true);
		};
		
		const documentMove = (event)=>{
			const win = ActiveWindow;
			
			if(!win || !(win instanceof Window))return;
			const ID = win[private_key];
			const _r = hidden_stack[ID].__R;
			
			let newX = false;
			let newY = false;
			let newW = false;
			let newH = false;
			
			switch(Action){
				case MOVE:{
						newX = event.pageX - _r.X;
						newY = event.pageY - _r.Y;
						
						const edgeX = newX + _r.W;
						const edgeY = newY + _r.H;
						
						win.Position = {
							X: newX,
							Y: newY,
						};
					}
				break;
				case RESIZE:{
						const Position = win.Position;
						
						newX = false;
						newY = false;
						newW = false;
						newH = false;
						
						if(_r.REX)newW = Number(event.pageX) - Position.X + 2;
						if(_r.REY)newH = Number(event.pageY) - Position.Y + 2;
						
						if(_r.RFX){
							const EWX = _r.EWX;
							newX = Number(event.pageX);
							newW = EWX - newX;
						}
						
						if(_r.RFY){
							const EHY = _r.EHY;
							newY = Number(event.pageY);
							newH = EHY - newY;
						}
						
						win.Position = {
							X: newX,
							Y: newY,
						};
						
						win.Size = {
							W: newW,
							H: newH,
						};
					}
				break;
			}
		};
		
		const register_id = (ins)=>{
			const ID = "_" + (count_id++);
			id_stack[ID] = ins;
			return ID;
		};
		
		const register = (ins, config={})=>{
			const ID = Symbol();
			ins[private_key] = ID;
			
			const id = register_id(ins);
			
			const win_dom = GenerateWinDom();
			
			config_stack[ID] = Generate_Config(config);
			hidden_stack[ID] = {
				win_dom,
				id,
			};
		};
		
		const Class = class{
			[private_key] = null;
			constructor(title="", config){
				register(this, config);
				GenerateHTML(this);
				this.Title = title;
			};
			
			Focus(_zindex){
				Focus(this, _zindex);
				return this;
			};
			
			Show(){
				Show(this);
				this.Focus();
				return this;
			};
			
			Hide(){
				Hide(this);
				return this;
			};
			
			Close(){
				Close(this);
				return this;
			};
			
			Toggle(){
				Toggle(this);
				return this;
			};
			
			ReStore(){
				ReStore(this);
				return this;
			};
			
			Maximize(){
				Maximize(this);
				return this;
			};
			
			Minimize(){
				Minimize(this);
				return this;
			};
			
			ContentAccess(statu=true){
				ContentAccess(this, statu);
			};
			
			set Title(title){
				SetTitle(this, title);
			};
			
			get Content(){
				return GetContent(this);
			};
			
			//
			get Size(){
				return GetSize(this);
			};
			set Size(size){
				SetSize(this, size.W, size.H);
			};
			
			//
			get Position(){
				return GetPosition(this);
			};
			set Position(pos){
				SetPosition(this, pos.X, pos.Y);
			};
		};
		
		const GenerateHTML = (ins)=>{
			const ID = ins[private_key];
			const win_dom = hidden_stack[ID].win_dom;
			
			const dom_content = win_dom.AddElement("DIV");
			const dom_edge_left = win_dom.AddElement("DIV");
			const dom_edge_right = win_dom.AddElement("DIV");
			const dom_edge_bottom = win_dom.AddElement("DIV");
			
			dom_content.SetClass("ata_window_content").SetStyle("height:calc(100% - " + HeadHeight + "px)");
			dom_edge_left.SetClass("ata_window_eleft").SetStyle("");
			dom_edge_right.SetClass("ata_window_eright").SetStyle("");
			dom_edge_bottom.SetClass("ata_window_ebottom").SetStyle("");
			
			const dom_head = win_dom.AddElement("DIV");
			const dom_lock = win_dom.AddElement("DIV");
			
			dom_head.SetClass("ata_window_head").SetStyle("height:" + HeadHeight + "px;");
			dom_lock.SetClass("ata_window_wlock").SetStyle("display:none;");
			
			const dom_actions = win_dom.AddElement("DIV");
			
			dom_actions.SetClass("ata_window_actions").SetStyle("height:" + HeadHeight + "px;");
			
			const minimize_btn = dom_actions.AddElement("I").SetClass("ata_window_minimize ata_window_action_btn btn btn-outline-warning fa fa-window-minimize").SetStyle("height:" + HeadHeight + "px;width:" + HeadHeight + "px;");
			
			const maximize_btn = dom_actions.AddElement("I").SetClass("ata_window_maximize ata_window_action_btn btn btn-outline-primary fa fa-window-maximize").SetStyle("height:" + HeadHeight + "px;width:" + HeadHeight + "px;");
			
			const restore_btn = dom_actions.AddElement("I").SetClass("ata_window_restore ata_window_action_btn btn btn-outline-success fa fa-window-restore").SetStyle("height:" + HeadHeight + "px;width:" + HeadHeight + "px;");
			
			const close_btn = dom_actions.AddElement("I").SetClass("ata_window_close ata_window_action_btn btn btn-outline-danger fa fa-times").SetStyle("height:" + HeadHeight + "px;width:" + HeadHeight + "px;");
			
			minimize_btn.$.mousedown((event)=>{
				console.log({ ins });
				ins.Minimize();
				ContentAccess(ins, false);
				event.pre();
			});
			
			maximize_btn.$.mousedown((event)=>{
				console.log({ ins });
				ins.Maximize();
				ContentAccess(ins, false);
				event.stopPropagation();
			});
			
			restore_btn.$.mousedown((event)=>{
				console.log({ ins });
				ins.ReStore();
				ContentAccess(ins, false);
				event.stopPropagation();
			});
			
			close_btn.$.mousedown((event)=>{
				console.log({ ins });
				ins.Close();
				ContentAccess(ins, false);
				event.stopPropagation();
			});
			
			minimize_btn.$.hide();
			maximize_btn.$.hide();
			restore_btn.$.hide();
			//close_btn.$.hide();
			
			dom_head.$.mousedown((event)=>{
				const Position = ins.Position;
				const Size = ins.Size;
				
				hidden_stack[ID].__R = {
					X: Number(event.pageX) - Number(Position.X),
					Y: Number(event.pageY) - Number(Position.Y),
					W: Size.W,
					H: Size.H,
				};
				
				ActiveWindow = ins;
				Action = MOVE;
				ins.Focus();
				
				ContentAccess(ins, false);
			}).mouseup(()=>{
				Action = false;
				//ContentAccess(ins, true);
			});
			
			win_dom.$.click(()=>{
				ins.Focus();
			}).mousedown((event)=>{
				const Position = ins.Position;
				const Size = ins.Size;
				
				var edgeX = Position.X + Size.W;
				var edgeY = Position.Y + Size.H;
				
				const wid = 13;
				
				const moveble = edgeX >= Number(event.pageX) && edgeX < (Number(event.pageX) + 20);
				
				const REX = edgeX >= Number(event.pageX) && edgeX < (Number(event.pageX) + wid);
				const REY = edgeY >= Number(event.pageY) && edgeY < (Number(event.pageY) + wid);
				const RFX = Position.x < Number(event.pageX) && Position.X > (Number(event.pageX) - wid);
				const RFY = false;//Position.Y < Number(event.pageY) && Position.Y > (Number(event.pageY)-wid);
				
				if(REX || REY || RFX || RFY){
					ActiveWindow = ins;
					Action = RESIZE;
					ContentAccess(ins, false);
					
					hidden_stack[ID].__R = {
						REX,
						REY,
						RFX,
						RFY,
						EHY: Size.H + Position.Y,
						EWX: Size.W + Position.X,
					};
				}else if(moveble){
					Container.$.mousemove();
					ContentAccess(ins, false);
				}
			});
			
			hidden_stack[ID].dom_content = dom_content;
			
			hidden_stack[ID].dom_head = dom_head;
			hidden_stack[ID].dom_lock = dom_lock;
			
			hidden_stack[ID].minimize_btn = minimize_btn;
			hidden_stack[ID].maximize_btn = maximize_btn;
			hidden_stack[ID].restore_btn = restore_btn;
			hidden_stack[ID].close_btn = close_btn;
		};
		
		const Focus = (ins, _zindex)=>{
			const ID = ins[private_key];
			const win_dom = hidden_stack[ID].win_dom;
			
			const zindex = (_zindex ? _zindex : (LastZIndex)) + 1;
			win_dom.O.style.zIndex = zindex;
			LastZIndex = zindex;
		};
		
		const Show = (ins)=>{
			const ID = ins[private_key];
			const win_dom = hidden_stack[ID].win_dom;
			
			win_dom.$.show();
		};
		
		const Hide = (ins)=>{
			const ID = ins[private_key];
			const win_dom = hidden_stack[ID].win_dom;
			
			win_dom.$.hide();
		};
		
		const Close = (ins)=>{
			const ID = ins[private_key];
			const win_dom = hidden_stack[ID].win_dom;
			const id = hidden_stack[ID].id;
			
			win_dom.$.hide();
			win_dom.$.remove();
			
			delete hidden_stack[id];
			delete config_stack[id];
			delete id_stack[id];
		};
		
		const Toggle = (ins)=>{
			const ID = ins[private_key];
			const win_dom = hidden_stack[ID].win_dom;
			
			win_dom.$.toggle();
		};
		
		const ReStore = (ins)=>{
			const ID = ins[private_key];
			
		};
		
		const Maximize = (ins)=>{
			const ID = ins[private_key];
			
		};
		
		const Minimize = (ins)=>{
			const ID = ins[private_key];
			
		};
		
		const SetTitle = (ins, title)=>{
			const ID = ins[private_key];
			const dom_head = hidden_stack[ID].dom_head;
			dom_head.Text(title);
		};
		
		const GetContent = (ins)=>{
			const ID = ins[private_key];
			const dom_content = hidden_stack[ID].dom_content;
			
			return dom_content;
		};
		
		const GetContent2 = (ins)=>{
			const ID = ins[private_key];
			const dom_window = hidden_stack[ID].dom_window;
			
			return dom_window.contentDocument.body;
		};
		
		const GetSize = (ins)=>{
			const ID = ins[private_key];
			const win_dom = hidden_stack[ID].win_dom;
			
			const W = Number(win_dom.$.width().toFixed(0));
			const H = Number(win_dom.$.height().toFixed(0));
			
			return{
				W,
				H,
			};
		};
		
		const LoadFrame = (ins)=>{
			const ID = ins[private_key];
			const dom_content = hidden_stack[ID].dom_content;
			const iframe = new UI(dom_content.O);
			hidden_stack[ID].dom_window = iframe.O;
			return iframe;
		};
		
		const GetFrame = (ins)=>{
			const ID = ins[private_key];
			const dom_window = hidden_stack[ID].dom_window;
			
			return dom_window;
		};
		
		const GetInner = (ins)=>{
			const ID = ins[private_key];
			const dom_window = hidden_stack[ID].dom_window;
			
			return dom_window.contentWindow;
		};
		
		const SetSize = (ins, W, H)=>{
			const ID = ins[private_key];
			const win_dom = hidden_stack[ID].win_dom;
			
			const entry = {};
			if(W)entry.width = Math.max(W, 120) + "px";
			if(H)entry.height = Math.max(H, 120) + "px";
			win_dom.$.css(entry);
		};
		
		const GetPosition = (ins)=>{
			const ID = ins[private_key];
			const win_dom = hidden_stack[ID].win_dom;
			
			const pos = win_dom.$.position();
			
			return{
				X: Number(pos.left.toFixed(0)),
				Y: Number(pos.top.toFixed(0)),
			};
		};
		
		const SetPosition = (ins, X, Y)=>{
			const ID = ins[private_key];
			const win_dom = hidden_stack[ID].win_dom;
			
			const entry = {};
			if(X)entry.left = Math.min(Math.max(0, X), 2000) + "px";
			if(Y)entry.top = Math.min(Math.max(0, Y), 2000) + "px";
			win_dom.$.css(entry);
		};
		
		const ContentAccess = (ins, statu=true)=>{
			Lock.SetStyle((statu ? "display:none;" : "") + "");
			
			return;
			
			const ID = ins[private_key];
			const win_dom = hidden_stack[ID].win_dom;
		};
		
		Class.GetWindows = ()=>{
			return GetWindows();
		};
		
		const GetWindows = ()=>{
			return Object.values(id_stack);
		};
		
		Class.SetContainer = (con)=>{
			Container = new DomElement("DIV", con);
			Lock = Container.AddElement("DIV");
			Flu = Container.AddElement("DIV");
			
			Container.SetClass("ata_window_container");
			Lock.SetClass("ata_window_glock").SetStyle("display:none");
			Flu.SetClass("ata_window_flu ata_popup_container").SetStyle("visibility:hidden;");
			
			$(con).on("mousemove", documentMove);
			$(con).on("mouseup", documentMouseUp);
			$(con).on("focusout", documentMouseUp);
		};
		
		Class.Frame = class extends Class{
			constructor(title=""){
				super(title);
				LoadFrame(this);
			};
			get Content(){
				return GetContent2(this);
			};
			get Frame(){
				return GetFrame(this);
			};
			get Inner(){
				return GetInner(this);
			};
		};
		
		Class.Popup = (class_="")=>{
			Flu.$.find("*").remove();
			Flu.$.css({
				visibility: "visible"
			});
			
			const div = Flu.AddElement("DIV").SetClass("ata_popup_shell card " + class_);
			const body = div.AddElement("DIV").SetClass("card-body body");
			
			//body.Text("dfhgf");
			
			return body;
		};
		
		return Class;
	})();
	
	//const 
	
	
	ATA.Setups.push(()=>{
		return;
		Window.SetContainer(doc.body);
		
		var win = new Window.Frame("Window");
		//win.Show();
		
		win.Frame.addEventListener("load", ()=>{
			
			win.Inner.$("div#spinnerpanel").css({
				visibility: "hidden",
				display: "none"
			});
			
			const div = new DomElement("DIV", win.Content);
			div.Text("div1");
			
			
			div.$.click(()=>{
				const popup = Window.Popup("bg-warning text-dark");
				const title = popup.AddElement("H4").SetClass("card-title text-light");
				title.Text("dfhgfhj");
				
				var win2 = new Window.Frame("Window");
				win2.Show();
			});
			
			win.Show();
		});
		
		
		console.log({win});
	});
	
	return Window;
})(ATA(), window, document);