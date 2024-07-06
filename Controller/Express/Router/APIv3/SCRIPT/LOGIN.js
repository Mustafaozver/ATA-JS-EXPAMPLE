(()=>{
	console.log("LOGIN => ", "<% __append(req.Session ? "EVET" : "HAYIR");%>");
	
	const exports = {};
	const BASE = protocol + "//" + hostname + port;
	
	const Role = <% __append(JSON.stringify(req.Session.Role)); %>
	
	const GetExports = ()=>{
		return exports;
	};
	
	<%
	if(req.Session){
	%>
	
	let LeftSide = null;
	let RightSide = null;
	let dashboard = null;
	let content = null;
	
	const Setup = ()=>{
		console.log("SESSION => EVET");
		const shell = new DomElement("DIV").SetClass("layout_panel").SetStyle("position:absolute;width:100%;height:100%;left:0;top:0;background-color:#FFFFFF;");
		
		const panel = shell.AddElement("DIV").SetClass("layout_panel").SetStyle("position:absolute;width:100%;height:100%;");
		const hpanel = shell.AddElement("DIV").SetClass("layout_panel").SetStyle("position:absolute");
		
		const table = panel.AddElement("TABLE").SetStyle("width:100%;height:100%;");
		
		const tr_header = table.AddElement("TR");
		const tr_content = table.AddElement("TR");
		const tr_footer = table.AddElement("TR");
		
		tr_header.SetStyle("height:4em;min-height:4em;max-height:4em;");
		tr_footer.SetStyle("height:4em;min-height:4em;max-height:4em;");
		
		const td_header = tr_header.AddElement("TD").SetStyle("position:relative;");
		const td_content = tr_content.AddElement("TD").SetStyle("position:relative;");
		const td_footer = tr_footer.AddElement("TD").SetStyle("position:relative;");
		
		const Header = BuildHeader(td_header, hpanel);
		const Footer = BuildFooter(td_footer, hpanel);
		
		const Content = BuildContent(td_content, hpanel);
		
		ATA.Setups.push(()=>{
			Connection.Request(BASE + "/session/me", {}, false, "POST", {
				"Accept": "application/json",
				"Content-Type": "application/json",
			}).then(async(req)=>{
				const json = await req.json();
				console.log({json});
			});
			Connection.GetScript(Role, {
				Window,
				UI,
				Helper,
				secret_key,
				DomElement,
				WebRTC,
				Socket,
				Device,
				Storage,
				SESSION,
				Connection,
				
				hostname,
				port,
				protocol,
				
				LeftSide,
				RightSide,
				
				dashboard,
				content,
				
				//td_content,
				
			}).then((data)=>{
				console.log({ data });
			});
		});
	};
	
	const BuildHeader = (area, hpanel)=>{
		const header = area.AddElement("HEADER")
			.SetStyle("border-bottom:2px solid red;position:relative;")
			.SetClass("d-flex justify-content-between");
		
		LeftSide = header.AddElement("DIV").SetClass("d-flex");
		RightSide = header.AddElement("DIV").SetClass("d-flex");
		
		const header_size = 3 * 16; // 1em = 16px
		
		return;
		LogoRenderer(LeftSide, header_size);
		HomeButtonRenderer(LeftSide, header_size);
		MenuBarRenderer(LeftSide, header_size);
		
		ButtonSetRenderer(RightSide, header_size);
	};
	
	const BuildFooter = (area, hpanel)=>{
		const footer = area.AddElement("FOOTER");
		footer.SetStyle("border-top:2px solid red;position:relative;");
		
		
	};
	
	const BuildContent = (area, hpanel)=>{
		dashboard = area.AddElement("DIV");
		content = area.AddElement("DIV");
		
		dashboard.SetStyle("position:absolute;left:0;top:0;right:0;bottom:0;");
		content.SetStyle("position:absolute;left:0;top:0;right:0;bottom:0;");
		
		Window.SetContainer(content.O);
		
		
		var win = new Window.Frame("Window");
		
		win.Show();
	};
	
	////////////////
	
	const LogoRenderer = (area, size)=>{
		const img = area.AddElement("IMG");
		img.SetStyle("width:" + size + "px;height:" + size + "px;");
		img.SetAttribute("width", size);
		img.SetAttribute("height", size);
		img.SetAttribute("src", "./Asset/image/logo.png");
	};
	
	const HomeButtonRenderer = (area, size)=>{
		const btn = area.AddComponent("Button")
			.SetClass("dashboard_button")
			.SetStyle("height:" + size + "px;font-size:" + (size / 2) + "px;");
		btn.AddComponent("Icon", "home");
		
		btn.Click(()=>{
			alert("HOME");
		});
		
	};
	
	const MenuBarRenderer = (area, size)=>{
		
	};
	
	const ButtonSetRenderer = (area, size)=>{
		const profile_btn = area.AddComponent("Button")
			.SetClass("dashboard_button")
			.SetStyle("height:" + size + "px;font-size:" + (size / 2) + "px;");
		profile_btn.AddComponent("Icon", "home");
		
		const notification_btn = area.AddComponent("Button")
			.SetClass("dashboard_button")
			.SetStyle("height:" + size + "px;font-size:" + (size / 2) + "px;");
		notification_btn.AddComponent("Icon", "bell");
		
		const setting_btn = area.AddComponent("Button")
			.SetClass("dashboard_button")
			.SetStyle("height:" + size + "px;font-size:" + (size / 2) + "px;");
		setting_btn.AddComponent("Icon", "gear");
	};
	
	
	<%
	}else{
	%>
	
	const username_storage = new Storage("un_", { default: "" });
	const password_storage = new Storage("pw_", { default: "" });
	const remember_storage = new Storage("rm_", { default: "H" });
	
	const Setup = ()=>{ // login panel
		console.log("SESSION => HAYIR");
		const panel = new DomElement("DIV").SetClass("align-items-center d-flex justify-content-center").SetStyle("position:absolute;width:100%;height:100%;left:0;top:0;background-color:#3535A8FF;");
		
		const container = panel.AddElement("DIV").SetClass("bg-white shadow rounded card col-6").SetStyle("min-width:25em;");
		
		const header = container.AddElement("DIV").SetClass("card-header");
		const body = container.AddElement("DIV").SetClass("card-body row");
		const footer = container.AddElement("DIV").SetClass("card-footer");
		
		header.Text("<H2>OMS LOGIN</H2>");
		footer.Text("Bu bir <A href=\"https://www.ataioterp.com.tr/\">ATA</A> Şirketi ürünüdür. &copy; 2024")
		
		body.AddElement("DIV") // logo
			.SetClass("col-md-5 ps-0 d-none d-md-block")
			.Text("<IMG src=\"./LOGOM.svg\" alt=\"logo\" style=\"width:100%;\"/>");
		
		const form_div = body.AddElement("DIV").SetClass("col-md-7 pe-0");
		const form_row = form_div.AddElement("DIV").SetClass("row g-4 p-1");
		
		// username
		const div_username = form_row.AddElement("DIV").SetClass("col-12");
		div_username.AddElement("LABEL").Text("Kullanıcı Adı <SPAN class=\"text-danger\">*</SPAN>");
		
		const div_username_input_group = div_username.AddElement("DIV").SetClass("input-group");
		div_username_input_group.AddElement("DIV").SetClass("input-group-text").AddComponent("Icon", "user");
		
		const username_input = div_username_input_group.AddComponent("TextInput");
		username_input.SetAttribute("placeholder", "Enter Username");
		
		// password
		const div_password = form_row.AddElement("DIV").SetClass("col-12");
		div_password.AddElement("LABEL").Text("Şifre <SPAN class=\"text-danger\">*</SPAN>");
		
		const div_password_input_group = div_password.AddElement("DIV").SetClass("input-group");
		div_password_input_group.AddElement("DIV").SetClass("input-group-text").AddComponent("Icon", "key");
		
		const password_input = div_password_input_group.AddComponent("PasswordInput");
		password_input.SetAttribute("placeholder", "Enter Password");
		
		// remember
		const label_remember = form_row.AddElement("DIV").SetClass("col-sm-6")
			.AddElement("DIV")
			.SetClass("form-check")
			.AddElement("LABEL")
			.SetClass("form-check-label");
		
		const input_remember = label_remember.AddComponent("CheckBoxInput").SetClass("form-check-input");
		label_remember.AddElement("SPAN").Text("Beni Hatırla");
		
		const link_forget = form_row.AddElement("DIV").Text("<a href=\"#\" class=\"float-end text-primary\">Şifremi unuttum </a>");
		
		const btn_login = form_row.AddElement("DIV")
			.SetClass("col-12")
			.AddComponent("Button")
			.SetClass("btn-primary px-4 float-end")
			.Text("Giriş");
		
		btn_login.Click(()=>{
			const username = username_input.Value;
			const password = password_input.Value;
			Connection.Request(BASE + "/session/login", {
				username,
				password,
			}, false, "POST", {
				"Accept": "application/json",
				"Content-Type": "application/json",
			}).then(async(req)=>{
				const json = await req.json();
				if (json.S && !json.E) return Login(json.MSG);
				alert("Kullanıcı adı veya şifre hatalı!");
			});
			
		});
		
		const Login = (token)=>{
			SESSION.Value = token;
			SESSION.Save();
			
			console.log({
				token
			});
			
			if(input_remember.Value){
				remember_storage.Value = "E";
				username_storage.Value = username_input.Value;
				password_storage.Value = password_input.Value;
			}else{
				remember_storage.Value = "H";
				username_storage.Value = "";
				password_storage.Value = "";
			}
			remember_storage.Save();
			username_storage.Save();
			password_storage.Save();
			
			setTimeout(()=>{
				window.location.reload();
			}, 100);
		};
		
		(()=>{ // remember
			remember_storage.Restore();
			if(remember_storage.Value === "E"){
				username_storage.Restore();
				password_storage.Restore();
				username_input.Value = username_storage.Value;
				password_input.Value = password_storage.Value;
				input_remember.Value = true;
			}
		})();
		
		exports.L = 1453;
	};
	
	<%
	}
	%>
	
	setTimeout(Setup, 1);
	
	return GetExports;
})()