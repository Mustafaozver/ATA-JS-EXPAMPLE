(()=>{
	console.log("LOGIN => ", <% __append(JSON.stringify(req.Session));%>);
	
	const exports = {};
	const GetExports = ()=>{
		return exports;
	};
	
	<%
	if(req.Session){
	%>
	
	const Setup = ()=>{
		console.log("SESSION => EVET");
		
		
		
		
		
		exports.L = 1071;
	};
	
	<%
	}else{
	%>
	
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
			if(input_remember.Value){
				
			}else{
				
			}
			console.log({
				username,
				password,
			});
		});
		
		
		exports.L = 1453;
	};
	
	<%
	}
	%>
	
	setTimeout(Setup, 1);
	
	return GetExports;
})();