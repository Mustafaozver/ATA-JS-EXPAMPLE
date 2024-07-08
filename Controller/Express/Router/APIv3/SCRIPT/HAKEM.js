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
	
	const Setup = ()=>{
		const Content = new DomElement("DIV", $(content.O).children("div:nth-of-type(1)")[0]);
		const Header = LeftSide.AddElement("DIV").SetClass("d-flex");
		
		
		const select_platform = Header.AddComponent("SelectInput");
		const select_category = Header.AddComponent("SelectInput");
		const list_btn = RightSide.AddComponent("Button").SetClass("btn-success").Text("Sporcular");
		const bunch_btn = RightSide.AddComponent("Button").SetClass("btn-warning").Text("Seanslar");
		
		const tr = Content.AddElement("TABLE").SetStyle("overflow: auto;width:100%;height:100%;").AddElement("TR");
		
		const platform_area = tr.AddElement("TD");
		const member_area = tr.AddElement("TD");
		
		const FixTure = (category_id)=>{
			CallAPI("fixture", { category_id }).then((data)=>{
				console.log(data);
			});
		};
		
		CallAPI("platforms").then((data)=>{
			select_platform.SetOption(data);
			$(select_platform.O).on("change", ()=>{
				console.log(select_platform.Value);
			});
			data.map((item, index)=>{
				AddCPanelPlatform(item, index);
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
				const win = new Window.Frame("Sporcular");
				
				win.Show();
				win.Frame.addEventListener("load", ()=>{
					const shell = new DomElement("DIV", win.Content);
					
					const member_table = shell
						.AddComponent("Table");
					
					(()=>{
						member_table.SetColumns([
							"NO",
							"S1",
							"S2",
							"FirstName",
							"LastName",
							"Il",
							"KG",
						]);
						
						member_table.columns[0].Name = "";
						member_table.columns[0].Renderer = (data, col, row, table, index)=>{
							col.O.style.width = "2em";
							col.Text(index)
						};
						
						member_table.columns[1].Name = "";
						member_table.columns[1].Renderer = (data, col, row, table, index)=>{
							col.O.style.width = "2em";
							const checkbox = col.AddComponent("CheckBoxInput");
							checkbox.SetStyle("width:2em;height:2em;border:1px solid #808080;");
							
							checkbox.$.click(()=>{
								if(checkbox.Value){
									row.$.addClass("table_row_selected");
									data.SetOver("select", true);
								}else{
									row.$.removeClass("table_row_selected");
									data.SetOver("select", false);
								}
							});
						};
						
						
						member_table.columns[2].Name = "";
						member_table.columns[2].Renderer = (data, col, row, table, index)=>{
							col.O.style.width = "7em";
							
							const div = col.AddElement("DIV").SetClass("d-flex").SetStyle("width:5em;");
							
							const look_btn = div.AddComponent("Button").SetClass("btn-outline-primary btn-sm");
							look_btn.AddComponent("Icon", "external-link");
							
							const update_btn = div.AddComponent("Button").SetClass("btn-outline-success btn-sm");
							update_btn.AddComponent("Icon", "pencil");
							
							const delete_btn = div.AddComponent("Button").SetClass("btn-outline-danger btn-sm");
							delete_btn.AddComponent("Icon", "trash");
							
							look_btn.Click(()=>{
								console.log("LOOK => ", data);
							});
							
							update_btn.Click(()=>{
								console.log("UPDATE => ", data);
							});
							
							delete_btn.Click(()=>{
								console.log("DELETE => ", data);
							});
						};
						
						member_table.columns[5].Renderer = (data, col, row, index)=>{
							col.Text(iller[data.GetValue("Il")]);
						};
					})();
					
					member_table.SetData(data);
					member_table.Build();
					
					member_table.SetStyle("");
					
					const fixture_btn = member_table.tfoot.AddComponent("Button").SetClass("btn-success btn-sm");
					fixture_btn.Text("Fixture");
					
					fixture_btn.Click(()=>{
						FixTure(category_id);
					});
					
					win.Inner.$("div#spinnerpanel").css({
						visibility: "hidden",
						display: "none"
					});
				});
			});
		});
		
		bunch_btn.Click(()=>{
			const category_id = select_category.Value;
			CallAPI("bunch", { category_id }).then((data)=>{
				const win = new Window.Frame("Seanslar");
				
				win.Show();
				win.Frame.addEventListener("load", ()=>{
					const shell = new DomElement("DIV", win.Content);
					
					const member_table = shell
						.AddComponent("Table");
					
					(()=>{
						member_table.SetColumns([
							"Seans",
							"S1",
							"S2",
							"Name",
							"Durum",
							"Maçlar",
							//"M",
						]);
						
						//member_table.columns[0].Name = "";
						member_table.columns[0].Renderer = (data, col, row, table, index)=>{
							col.O.style.width = "2em";
							col.Text("" + index);
						};
						
						member_table.columns[1].Name = "";
						member_table.columns[1].Renderer = (data, col, row, table, index)=>{
							col.O.style.width = "2em";
							const checkbox = col.AddComponent("CheckBoxInput");
							checkbox.SetStyle("width:2em;height:2em;border:1px solid #808080;");
							
							checkbox.$.click(()=>{
								if(checkbox.Value){
									row.$.addClass("table_row_selected");
									data.SetOver("select", true);
								}else{
									row.$.removeClass("table_row_selected");
									data.SetOver("select", false);
								}
							});
						};
						
						
						member_table.columns[2].Name = "";
						member_table.columns[2].Renderer = (data, col, row, table, index)=>{
							col.O.style.width = "7em";
							
							const div = col.AddElement("DIV").SetClass("d-flex").SetStyle("width:5em;");
							
							const look_btn = div.AddComponent("Button").SetClass("btn-outline-primary btn-sm");
							look_btn.AddComponent("Icon", "external-link");
							
							const update_btn = div.AddComponent("Button").SetClass("btn-outline-success btn-sm");
							update_btn.AddComponent("Icon", "pencil");
							
							const delete_btn = div.AddComponent("Button").SetClass("btn-outline-danger btn-sm");
							delete_btn.AddComponent("Icon", "trash");
							
							look_btn.Click(()=>{
								console.log("LOOK => ", data);
							});
							
							update_btn.Click(()=>{
								console.log("UPDATE => ", data);
							});
							
							delete_btn.Click(()=>{
								console.log("DELETE => ", data);
							});
						};
						
						member_table.columns[3].Renderer = (data, col, row, table, index)=>{
							col.Text(data.GetValue("Name") + ". n. Seans");
						};
						
						member_table.columns[4].Renderer = (data, col, row, table, index)=>{
							col.Text(data.GetValue("Status"));
						};
						
						member_table.columns[5].Renderer = (data, col, row, table, index)=>{
							col.Text(data.GetValue("Match").length);
						};
						
						/*
						member_table.columns[6].Name = "";
						member_table.columns[6].Renderer = (data, col, row, table, index)=>{
							col.O.style.width = "7em";
							const btn = col.AddComponent("Button");
							btn.Click(()=>{
								
							});
						};
						*/
					})();
					
					member_table.SetData(data);
					member_table.Build();
					
					member_table.SetStyle("");
					
					win.Inner.$("div#spinnerpanel").css({
						visibility: "hidden",
						display: "none"
					});
				});
			});
		});
		
		const bg_card_list = [
			"bg-primary text-light",
			"bg-danger text-light",
			"bg-success text-light",
			//"bg-secondary text-light",
			//"bg-warning text-light",
			//"bg-info text-light",
		];
		
		const CPanel = Content.AddElement("DIV").SetClass("d-flex");
		
		setInterval(()=>{
			CallAPI("platforms").then((data)=>{
				SetPanel(data);
			});
		}, 10000);
		
		Socket.emit("MSG", {
			M: "HAKEM",
			ID: SESSION.Value,
			
		});
		
		Socket.on("HAKEMUPDATE", (data)=>{
			SetPanel(data);
		});
		
		const SetPanel = (data)=>{
			//console.log("PLATFORM CONTROL => ", {data});
			data.map((item)=>{
				platforms[item.ID](item);
			});
		}
		
		const platforms = {};
		
		const AddCPanelPlatform = (data, n=0)=>{
			const our_update = (rt_data)=>{
				//Body.Text(new Date() + rt_data.ID);
				if(rt_data.Active){
					durum.Text("<span class=\"text-success\">AÇIK</span>");
					if(rt_data.Play){
						
						
						
						
						
						play.Text("<span class=\"text-success\">EVET</span>");
						return;
					}
					play.Text("<span class=\"text-warning\">BEKLEME</span>");
					return;
				}
				play.Text("<span class=\"text-danger\">HAYIR</span>");
				durum.Text("<span class=\"text-danger\">KAPALI</span>");
				return;
			};
			
			platforms[data.ID] = our_update;
			
			const Container = CPanel.AddElement("DIV").SetClass("card d-inline");
			
			Container.SetStyle("min-width:15em;min-height:20em;");
			
			const Header = Container.AddElement("DIV").SetClass("card-header " + bg_card_list[n % bg_card_list.length]);
			const Body = Container.AddElement("DIV").SetClass("card-header");
			//const Header = Container.AddElement("DIV").SetClass("card-header");
			
			Body.SetStyle("min-width:15em;min-height:20em;");
			
			const look_btn = Header.AddComponent("Button").SetClass("text-light");
			look_btn.AddComponent("Icon", "external-link");
			
			Header.AddElement("SPAN").Text(data.Name);
			
			const modal = new DomElement.Modal(data.Name);
			
			const table = Body.AddElement("TABLE");
			
			table.SetStyle("width:100%;height:100%;");
			
			const durum = (()=>{
				const tr0 = table.AddElement("TR");
				
				const td0 = tr0.AddElement("TD").Text("Durum");
				const td1 = tr0.AddElement("TD");
				
				return td1;
			})();
			
			const play = (()=>{
				const tr0 = table.AddElement("TR");
				
				const td0 = tr0.AddElement("TD").Text("Oyun");
				const td1 = tr0.AddElement("TD");
				
				return td1;
			})();
			
			const table0 = modal.body.AddElement("TABLE");
			
			const set_btn = modal.footer.AddComponent("Button").SetClass("btn-primary btn-sm");
			
			const play_btn = modal.footer.AddComponent("Button").SetClass("btn-success btn-sm");
			
			set_btn.Text("Uygula");
			play_btn.Text("Başlat");
			
			const bunches = (()=>{
				const tr0 = table0.AddElement("TR");
				const td0 = tr0.AddElement("TD").Text("Seans");
				const td1 = tr0.AddElement("TD");
				const input = td1.AddComponent("SelectInput");
				return input;
			})();
			
			const matches = (()=>{
				const tr0 = table0.AddElement("TR");
				const td0 = tr0.AddElement("TD").Text("Maçlar");
				const td1 = tr0.AddElement("TD");
				const input = td1.AddComponent("SelectInput");
				return input;
			})();
			
			const [point0, point1] = (() => {
				const tr0 = table0.AddElement("TR");
				const td0 = tr0.AddElement("TD");
				const td1 = tr0.AddElement("TD");
				const input0 = td0.AddComponent("TextInput");
				const input1 = td1.AddComponent("TextInput");
				return [input0, input1];
			})();
			
			
			
			
			look_btn.Click(()=>{
				modal.Show();
			});
			
			set_btn.Click(()=>{
				CallAPI("bunch", { platform_id : data.ID, data: {
					L_Point0: point0.Value - 0,
					R_Point0: point1.Value - 0,
				}}).then((data)=>{
					our_update(data);
				});
			});
			
			play_btn.Click(()=>{
				CallAPI("setplatform", { platform_id : data.ID, data: {
					
				}}).then((data)=>{
					our_update(data);
				});
			});
			
			const updateMatch = ()=>{
				CallAPI("match", { bunch_id: bunches.Value }).then((data)=>{
					matches.SetOption(data);
				});
			};
			
			CallAPI("bunch", {}).then((data)=>{
				bunches.SetOption(data);
				$(bunches.O).on("change", ()=>{
					updateMatch();
				});
			});
		};
	};
	
	ATA.Setups.push(()=>{
		Setup();
	});
	
	const iller = ["",
		"Adana",
		"Adıyaman",
		"Afyonkarahisar",
		"Ağrı",
		"Amasya",
		"Ankara",
		"Antalya",
		"Artvin",
		"Aydın",
		"Balıkesir",
		"Bilecik",
		"Bingöl",
		"Bitlis",
		"Bolu",
		"Burdur",
		"Bursa",
		"Çanakkale",
		"Çankırı",
		"Çorum",
		"Denizli",
		"Diyarbakır",
		"Edirne",
		"Elazığ",
		"Erzincan",
		"Erzurum",
		"Eskişehir",
		"Gaziantep",
		"Giresun",
		"Gümüşhane",
		"Hakkari",
		"Hatay",
		"Isparta",
		"Mersin",
		"İstanbul",
		"İzmir",
		"Kars",
		"Kastamonu",
		"Kayseri",
		"Kırklareli",
		"Kırşehir",
		"Kocaeli",
		"Konya",
		"Kütahya",
		"Malatya",
		"Manisa",
		"Kahramanmaraş",
		"Mardin",
		"Muğla",
		"Muş",
		"Nevşehir",
		"Niğde",
		"Ordu",
		"Rize",
		"Sakarya",
		"Samsun",
		"Siirt",
		"Sinop",
		"Sivas",
		"Tekirdağ",
		"Tokat",
		"Trabzon",
		"Tunceli",
		"Şanlıurfa",
		"Uşak",
		"Van",
		"Yozgat",
		"Zonguldak",
		"Aksaray",
		"Bayburt",
		"Karaman",
		"Kırıkkale",
		"Batman",
		"Şırnak",
		"Bartın",
		"Ardahan",
		"Iğdır",
		"Yalova",
		"Karabük",
		"Kilis",
		"Osmaniye",
		"Düzce"
	];
})()