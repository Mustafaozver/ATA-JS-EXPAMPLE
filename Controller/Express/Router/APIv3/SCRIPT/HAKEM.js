(()=>{
	// /sc/platforms
	const API = "/sc/";
	
	const CallAPI = async(path, body=false, query=false)=>{
		const req = await Connection.Request(API + path, body, query, "POST", {
			"Accept": "application/json",
			"Content-Type": "application/json",
		});
		return await req.json();
	};
	
	const Setup = () => {
		const Content = new DomElement("DIV", $(content.O).children("div:nth-of-type(1)")[0]);
		const Header = LeftSide.AddElement("DIV").SetClass("d-flex");
		
		
		const select_platform = Header.AddComponent("SelectInput");
		const select_category = Header.AddComponent("SelectInput");
		const list_btn = Header.AddComponent("Button").SetClass("btn-success").Text("Listele");
		
		
		
		
		
		CallAPI("platforms").then((data)=>{
			select_platform.SetOption(data);
			$(select_platform.O).on("change", ()=>{
				console.log(select_platform.Value);
			});
		});
		
		CallAPI("category").then((data)=>{
			select_category.SetOption(data);
			$(select_category.O).on("change", ()=>{
				console.log(select_category.Value);
			});
		});
		
		list_btn.Click(()=>{
			const category_id = select_category.Value;
			CallAPI("member", { category_id }).then((data)=>{
				console.log("MEMBER => ", {data});
			});
		});
		
		
	};
	
	ATA.Setups.push(()=>{
		Setup();
	});
})()