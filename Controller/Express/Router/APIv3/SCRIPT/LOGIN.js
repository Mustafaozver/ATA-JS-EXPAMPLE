(()=>{
	console.log("LOGIN => ", <% __append(JSON.stringify(req.Session));%>);
	
	<%
	if(req.Session){
	%>
	
	const Setup = ()=>{
		console.log("SESSION => EVET");
	
	};
	
	<%
	}else{
	%>
	
	const Setup = ()=>{
		console.log("SESSION => HAYIR");
		const panel = new DomElement("DIV").SetClass("align-items-center d-flex justify-content-center").SetStyle("position:absolute;width:100%;height:100%;left:0;top:0;background-color:#3535A8FF;");
		
		const container = panel.AddElement("DIV").SetClass("bg-white shadow rounded card col-6").SetStyle("min-width:25em;");
		
		const header = container.AddElement("DIV").SetClass("card-header");
		const body = container.AddElement("DIV").SetClass("card-body row");
		const footer = container.AddElement("DIV").SetClass("card-footer");
		
		header.Text("<H2>OMS LOGIN</H2>");
		footer.Text("Bu bir <a href=\"https://www.ataioterp.com.tr/\">ATA</a> Şirketi ürünüdür. &copy; 2024");
		
		const logo_div = body.AddElement("DIV").SetClass("col-md-5 ps-0 d-none d-md-block");
		logo_div.Text("<IMG src=\"./assets/images/logo.png\" alt=\"logo\" style=\"width:100%;\"/>");
		
		const form_div = body.AddElement("DIV").SetClass("col-md-7 pe-0");
		const form_row = form_div.AddElement("DIV").SetClass("row g-4 p-1");
		
		
		
		
	};
	
	<%
	}
	%>
	
	setTimeout(Setup, 1);
	
	return{
		//...
		
	};
})();