((ATA, win, doc)=>{
	
	let Animation = async()=>{};
	let SetWin = ()=>{};
	let SetTitle = ()=>{};
	let SetPlatform = ()=>{};
	let SetRoundNo = ()=>{};
	let SetName = ()=>{};
	let SetSubInfo = ()=>{};
	let SetPoint = ()=>{};
	let SetIHTAR = ()=>{};
	let SetIKAZ = ()=>{};
	let SetCIKIS = ()=>{};
	let SetZSAYMA = () => { };
	let SetRoundTime = () => { };
	let ReSetRoundTime = ()=>{};
	
	let RTime = 0;
	let diffTime = 0;
	
	const WaitAsync = async(f)=>{
		return await new Promise((resolve, reject)=>{
			f(resolve, reject);
		});
	};
	
	const Setup = ()=>{
		const height_ = 1080;//Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight); // 1080
		const width_ = 1920;//Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth); // 1920
		
		const Margin = Math.min(height_ * 0.009, width_ * 0.005, 10);
		
		const height = height_ - 2 * Margin;
		const width = width_ - 2 * Margin;
		
		const Panel = new DomElement("DIV");
		Panel.SetClass("card bg-light").SetStyle("font-family:\"Play\";position:absolute;left:0;top:0;width:" + width_ + "px;height:" + height_ + "px;");
		
		const Title_Height = Math.max(80, height * 0.08);
		
		const Title = Panel.AddElement("DIV");
		
		Title.SetClass("").SetStyle("position:absolute;text-align:center;padding-left:1em;padding-right:1em;left:" + Margin + "px;right:" + Margin + "px;top:" + Margin + "px;height:" + Title_Height + "px;font-size:" + (Title_Height * 0.70 - 5) + "px;font-weight:900;");
		//Title.Text("ERKEK BÜYÜKLER LIGHT SANDA 48 KG");
		
		const Side_Height = Math.max(250, height * 0.22); // height - Title_Height - 2 * Margin
		const Side_Width = width * 0.37;
		const Round_area_Width = width * 0.26;// - 2 * Margin;
		
		const L_Side = Panel.AddElement("DIV");
		const R_Side = Panel.AddElement("DIV");
		
		L_Side.SetClass("bg-danger2 text-white").SetStyle("position:absolute;left:" + Margin + "px;height:" + Side_Height + "px;width:" + Side_Width + "px;top:" + (Title_Height + Margin) + "px;border-width:1em;");
		R_Side.SetClass("bg-primary2 text-white").SetStyle("position:absolute;right:" + Margin + "px;height:" + Side_Height + "px;width:" + Side_Width + "px;top:" + (Title_Height + Margin) + "px;border-width:1em;");
		
		const Round_area = Panel.AddElement("DIV");
		
		Round_area.SetClass("").SetStyle("position:absolute;left:" + (Margin + Side_Width) + "px;top:" + (Title_Height + Margin) + "px;height:" + Side_Height + "px;width:" + Round_area_Width + "px;");
		
		//////////////////
		
		const Name_Top = Side_Height * 0.04;
		const City_Top = Name_Top + Side_Height * 0.5;
		const Group_Top = Name_Top + Side_Height * 0.70;
		
		const Point_Top = Side_Height - Margin;
		const Info_Table_Top = height - Margin - Title_Height * 2;
		const Info_Table_Bottom = Margin;
		const Count_Top = Margin * 0.7;
		const Point_FontSize = Math.min(width, height) * 0.45;
		const Count_FontSize = Math.min(Side_Width, Side_Height) * 0.6;
		const Info_Width = Side_Width - 2 * Margin;
		
		const Session_Area_Top = height - Margin - Title_Height * 1.2;
		const Group_Area_Top = height - Margin - Title_Height * 0.7;
		
		const L_Name = L_Side.AddElement("H1");
		L_Name.SetStyle("position:absolute;padding-left:1em;padding-right:1em;left:0;top:" + Name_Top + "px;width:100%;text-align:center;font-size:3.6em;font-weight:900;");
		//L_Name.Text("MUSTAFA ÖZVER");
		
		const L_City = L_Side.AddElement("H3");
		L_City.SetStyle("position:absolute;padding-left:1em;padding-right:1em;left:0;top:" + City_Top + "px;width:100%;text-align:center;font-size:3.3em;");
		//L_City.Text("KONYA");
		
		const L_Point = Panel.AddElement("DIV");
		L_Point.SetClass("text-danger2").SetStyle("position:absolute;left:" + Margin + "px;top:" + Point_Top + "px;width:" + Side_Width + "px;text-align:center;font-size:" + Point_FontSize + "px;font-weight:900;border-width:0;");
		
		const L_Info_Table = Panel.AddElement("TABLE");
		L_Info_Table.SetStyle("position:absolute;left:" + Margin + "px;bottom:" + Info_Table_Bottom + "px;width:" + Side_Width + "px;text-align:center;font-size:1.7em;letter-spacing:1px;");
		
		const L_Info_Table_TR_1 = L_Info_Table.AddElement("TR").SetClass("text-light bg-danger").SetStyle("border:3px solid white;display: none;");
		
		L_Info_Table_TR_1.AddElement("TD").SetStyle("text-align:right;width:37%;font-weight:900;").Text("İHTAR");
		L_Info_Table_TR_1.AddElement("TD").SetStyle("width:1em;").Text(" ");
		const L_Info_Table_IHTAR = L_Info_Table_TR_1.AddElement("TD").SetStyle("text-align:left;letter-spacing:0.3em;").Text("");
		
		const L_Info_Table_TR_2 = L_Info_Table.AddElement("TR").SetClass("text-light bg-warning").SetStyle("border:3px solid white;display: none;");
		
		L_Info_Table_TR_2.AddElement("TD").SetStyle("text-align:right;width:37%;font-weight:900;").Text("İKAZ");
		L_Info_Table_TR_2.AddElement("TD").SetStyle("width:1em;").Text(" ");
		const L_Info_Table_IKAZ = L_Info_Table_TR_2.AddElement("TD").SetStyle("text-align:left;letter-spacing:0.3em;").Text("");
		
		const L_Info_Table_TR_3 = L_Info_Table.AddElement("TR").SetClass("text-light bg-secondary").SetStyle("border:3px solid white;display: none;");
		
		L_Info_Table_TR_3.AddElement("TD").SetStyle("text-align:right;width:37%;font-weight:900;letter-spacing:3px;").Text("ÇIKIŞ");
		L_Info_Table_TR_3.AddElement("TD").SetStyle("width:1em;").Text(" ");
		const L_Info_Table_CIKIS = L_Info_Table_TR_3.AddElement("TD").SetStyle("text-align:left;letter-spacing:0.3em;").Text("");
		
		const L_Info_Table_TR_4 = L_Info_Table.AddElement("TR").SetClass("text-light bg-primary").SetStyle("border:3px solid white;display: none;");
		
		L_Info_Table_TR_4.AddElement("TD").SetStyle("text-align:right;width:37%;font-weight:900;").Text("ZORUNLU SAYMA");
		L_Info_Table_TR_4.AddElement("TD").SetStyle("width:1em;").Text(" ");
		const L_Info_Table_ZSAYMA = L_Info_Table_TR_4.AddElement("TD").SetStyle("text-align:left;letter-spacing:0.3em;").Text("");
		
		////
		
		const R_Name = R_Side.AddElement("H1");
		R_Name.SetStyle("position:absolute;padding-left:1em;padding-right:1em;left:0;top:" + Name_Top + "px;width:100%;text-align:center;font-size:3.6em;font-weight:900;");
		//R_Name.Text("ALİ AHMETOĞLU");
		
		const R_City = R_Side.AddElement("H3");
		R_City.SetStyle("position:absolute;padding-left:1em;padding-right:1em;left:0;top:" + City_Top + "px;width:100%;text-align:center;font-size:3.3em;");
		//R_City.Text("İSTANBUL");
		
		const R_Point = Panel.AddElement("DIV");
		R_Point.SetClass("text-primary2").SetStyle("position:absolute;right:" + Margin + "px;top:" + Point_Top + "px;width:" + Side_Width + "px;text-align:center;font-size:" + Point_FontSize + "px;font-weight:900;border-width:0;");
		//R_Point.Text("0");
		
		const R_Info_Table = Panel.AddElement("TABLE");
		R_Info_Table.SetStyle("position:absolute;right:" + Margin + "px;bottom:" + Info_Table_Bottom + "px;width:" + Side_Width + "px;text-align:center;font-size:1.7em;letter-spacing:1px;");
		
		const R_Info_Table_TR_1 = R_Info_Table.AddElement("TR").SetClass("text-light bg-danger").SetStyle("border:3px solid white;display: none;");
		
		const R_Info_Table_IHTAR = R_Info_Table_TR_1.AddElement("TD").SetStyle("text-align:right;letter-spacing:0.3em;").Text("");
		R_Info_Table_TR_1.AddElement("TD").SetStyle("width:1em;").Text(" ");
		R_Info_Table_TR_1.AddElement("TD").SetStyle("text-align:left;width:37%;font-weight:900;").Text("İHTAR");
		
		const R_Info_Table_TR_2 = R_Info_Table.AddElement("TR").SetClass("text-light bg-warning").SetStyle("border:3px solid white;display: none;");
		
		const R_Info_Table_IKAZ = R_Info_Table_TR_2.AddElement("TD").SetStyle("text-align:right;letter-spacing:0.3em;").Text("");
		R_Info_Table_TR_2.AddElement("TD").SetStyle("width:1em;").Text(" ");
		R_Info_Table_TR_2.AddElement("TD").SetStyle("text-align:left;width:37%;font-weight:900;").Text("İKAZ");
		
		const R_Info_Table_TR_3 = R_Info_Table.AddElement("TR").SetClass("text-light bg-secondary").SetStyle("border:3px solid white;display: none;");
		
		const R_Info_Table_CIKIS = R_Info_Table_TR_3.AddElement("TD").SetStyle("text-align:right;letter-spacing:0.3em;").Text("");
		R_Info_Table_TR_3.AddElement("TD").SetStyle("width:1em;").Text(" ");
		R_Info_Table_TR_3.AddElement("TD").SetStyle("text-align:left;width:37%;font-weight:900;letter-spacing:3px;").Text("ÇIKIŞ");
		
		const R_Info_Table_TR_4 = R_Info_Table.AddElement("TR").SetClass("text-light bg-primary").SetStyle("border:3px solid white;display: none;");
		
		const R_Info_Table_ZSAYMA = R_Info_Table_TR_4.AddElement("TD").SetStyle("text-align:right;letter-spacing:0.3em;").Text("");
		R_Info_Table_TR_4.AddElement("TD").SetStyle("width:1em;").Text(" ");
		R_Info_Table_TR_4.AddElement("TD").SetStyle("text-align:left;width:37%;font-weight:900;").Text("ZORUNLU SAYMA");
		
		//const Round_Group = Round_area.AddElement("H1");
		//Round_Group.SetStyle("position:absolute;text-align:center;padding-left:1em;padding-right:1em;top:" + Name_Top + "px;width:" + Round_area_Width + "px;font-size:4em;font-weight:700;");
		
		const Round_CountDown = Round_area.AddElement("DIV");
		Round_CountDown.SetStyle("position:absolute;text-align:center;top:0;width:" + Round_area_Width + "px;font-size:" + Count_FontSize + "px;font-weight:700;line-height:1;");
		
		const Round_No = Round_area.AddElement("H1");
		Round_No.SetStyle("position:absolute;text-align:center;padding-left:1em;padding-right:1em;top:" + Group_Top + "px;width:" + Round_area_Width + "px;font-weight:700;");
		
		const Round_Table = Round_area.AddElement("TABLE");
		Round_Table.SetStyle("position:absolute;width:100%;top:" + (Group_Top + Title_Height) + "px;text-align:center;font-size:3.6em;font-weight:900;");
		
		//console.log({ Round_Table });
		
		const Round_Table_TR_1 = Round_Table.AddElement("TR");
		
		const Round_Table_TR_1_TD_L = Round_Table_TR_1.AddElement("TD").SetClass("bg-danger2 text-light");
		const Round_Table_TR_1_TD_J = Round_Table_TR_1.AddElement("TD").SetClass("");
		const Round_Table_TR_1_TD_R = Round_Table_TR_1.AddElement("TD").SetClass("bg-primary2 text-light");
		
		Round_Table.AddElement("TR").AddElement("TD");
		const Round_Table_TR_2 = Round_Table.AddElement("TR");
		
		const Round_Table_TR_2_TD_L = Round_Table_TR_2.AddElement("TD").SetClass("bg-danger2 text-light");
		const Round_Table_TR_2_TD_J = Round_Table_TR_2.AddElement("TD").SetClass("");
		const Round_Table_TR_2_TD_R = Round_Table_TR_2.AddElement("TD").SetClass("bg-primary2 text-light");
		
		Round_Table.AddElement("TR").AddElement("TD");
		const Round_Table_TR_3 = Round_Table.AddElement("TR");
		
		const Round_Table_TR_3_TD_L = Round_Table_TR_3.AddElement("TD").SetClass("bg-danger2 text-light");
		const Round_Table_TR_3_TD_J = Round_Table_TR_3.AddElement("TD").SetClass("");
		const Round_Table_TR_3_TD_R = Round_Table_TR_3.AddElement("TD").SetClass("bg-primary2 text-light");
		
		Round_Table.AddElement("TR").AddElement("TD");
		const Round_Table_TR_4 = Round_Table.AddElement("TR");
		
		const Round_Table_TR_4_TD_L = Round_Table_TR_4.AddElement("TD").SetClass("bg-danger2 text-light");
		const Round_Table_TR_4_TD_J = Round_Table_TR_4.AddElement("TD").SetClass("");
		const Round_Table_TR_4_TD_R = Round_Table_TR_4.AddElement("TD").SetClass("bg-primary2 text-light");
		
		Round_Table.AddElement("TR").AddElement("TD");
		const Round_Table_TR_5 = Round_Table.AddElement("TR");
		
		const Round_Table_TR_5_TD_L = Round_Table_TR_5.AddElement("TD").SetClass("bg-danger2 text-light");
		const Round_Table_TR_5_TD_J = Round_Table_TR_5.AddElement("TD").SetClass("");
		const Round_Table_TR_5_TD_R = Round_Table_TR_5.AddElement("TD").SetClass("bg-primary2 text-light");
		
		Round_Table_TR_1_TD_J.Text("1");
		Round_Table_TR_2_TD_J.Text("2");
		Round_Table_TR_3_TD_J.Text("3");
		Round_Table_TR_4_TD_J.Text("4");
		Round_Table_TR_5_TD_J.Text("5");
		
		Round_Table_TR_1_TD_L.Text("0");
		Round_Table_TR_1_TD_R.Text("0");
		
		Round_Table_TR_2_TD_L.Text("0");
		Round_Table_TR_2_TD_R.Text("0");
		
		Round_Table_TR_3_TD_L.Text("0");
		Round_Table_TR_3_TD_R.Text("0");
		
		Round_Table_TR_4_TD_L.Text("0");
		Round_Table_TR_4_TD_R.Text("0");
		
		Round_Table_TR_5_TD_L.Text("0");
		Round_Table_TR_5_TD_R.Text("0");
		
		const Session_Area = Panel.AddElement("H1");
		Session_Area.SetClass("").SetStyle("position:absolute;top:" + Session_Area_Top + "px;left:" + (Margin + Side_Width) + "px;width:" + Round_area_Width + "px;text-align:center;font-size:3em;font-weight:900;");
		Session_Area.Text("09:00 SEANSI - 001");
		
		const Round_Group = Panel.AddElement("H1");
		Round_Group.SetStyle("position:absolute;text-align:center;left:" + (Margin + Side_Width) + "px;top:" + Group_Area_Top + "px;width:" + Round_area_Width + "px;font-size:4em;font-weight:700;");
		
		const Winner = new DomElement("DIV");
		Winner.SetClass("card text-light").SetStyle("display: none;font-family:\"Play\";position:absolute;left:0;top:0;width:" + width_ + "px;height:" + height_ + "px;text-align:center;font-size:" + (Title_Height * 1.25) + "px;font-weight:900;padding:2em;");
		
		const LoginButton = new DomElement.Button();
		LoginButton.SetClass("loginbutton btn-success").SetStyle("position:absolute;left:0;top:0;").AddComponent("Icon", "sign-in");
		
		const LoginPanel = new DomElement("DIV");
		LoginPanel.SetClass("card bg-dark text-light loginpanel").SetStyle("position:absolute;left:2em;top:2em;padding:1em;display:none;");
		
		LoginPanel.AddElement("SPAN").Text("Platform");
		
		LoginButton.Click(()=>{
			LoginPanel.$.toggle();
		});
		
		const input1 = LoginPanel.AddComponent("SelectInput");
		
		input1.SetOption([
			"Platform A",
			"Platform B",
		]);
		
		//////
		
		SetRoundTime = (endTime=0, sNow=0)=>{
			const cNow = (new Date()).getTime();
			diffTime = cNow - sNow;
			if(Math.abs(diffTime) < 1000)RTime = Math.min(endTime - cNow, endTime - sNow);
			else RTime = endTime - cNow;
			if(RTime < 300){
				Round_CountDown.Text("00:00");
				return true;
			}
			const sec_ = Math.floor(RTime / 1000);
			const sep = "<span style=\"color:#BBBBBB;\">:</span>";
			const sec = sec_ % 60;
			const min = Math.floor(sec_ / 60) % 60;
			Round_CountDown.Text((min < 10 ? "0" : "") + min + sep + (sec < 10 ? "0" : "") + "" + sec);
			setTimeout(()=>{
				Round_CountDown.Text("0" + min + ":" + (sec < 10 ? "0" : "") + "" + sec);
			}, 370);
			return false;
		};
		
		ReSetRoundTime = (text="00:00")=>{
			Round_CountDown.Text(text + "");
		};
		
		SetWin = (side="N", name, city)=>{
			const colorClass = {
				L: "bg-danger2",
				R: "bg-primary2",
				N: "bg-dark"
			};
			Winner.Text(<% __append(JSON.stringify(C("Winner"))); %> + "<" + "BR/>" + name + "<" + "BR/>" + city);
			Winner.$.css({
				display: "block",
			});
			Winner.$.addClass(colorClass[side]);
		};
		
		SetTitle = (title="")=>{
			Title.Text(title + "");
		};
		
		SetPlatform = (text="")=>{
			Round_Group.Text(text + "");
		};
		
		SetRoundNo = (text="")=>{
			Round_No.Text(text + "");
		};
		
		SetName = (side, name="")=>{
			if(side === "L")L_Name.Text(name);
			else if(side === "R")R_Name.Text(name);
		};
		
		SetSubInfo = (side, name="")=>{
			if(side === "L")L_City.Text(name);
			else if(side === "R")R_City.Text(name);
		};
		
		SetIHTAR = (side, n=0)=>{
			let text = "";
			for(let i=0;i<n;i++)text += "<i class=\"fa fa-circle\"></i>";
			// fa-dot-circle-o , fa-circle , fa-square
			if(side === "L"){
				L_Info_Table_TR_1.$.css({
					display: "table-row"
				});
				L_Info_Table_IHTAR.Text(text);
			}else if(side === "R"){
				R_Info_Table_TR_1.$.css({
					display: "table-row"
				});
				R_Info_Table_IHTAR.Text(text);
			}
		};
		
		SetIKAZ = (side, n=0)=>{
			let text = "";
			for(let i=0;i<n;i++)text += "<i class=\"fa fa-circle\"></i>";
			// fa-dot-circle-o , fa-circle , fa-square
			if(side === "L"){
				L_Info_Table_TR_2.$.css({
					display: "table-row"
				});
				L_Info_Table_IKAZ.Text(text);
			}else if(side === "R"){
				R_Info_Table_TR_2.$.css({
					display: "table-row"
				});
				R_Info_Table_IKAZ.Text(text);
			}
		};
		
		SetCIKIS = (side, n=0)=>{
			let text = "";
			for(let i=0;i<n;i++)text += "<i class=\"fa fa-circle\"></i>";
			// fa-dot-circle-o , fa-circle , fa-square
			if(side === "L"){
				L_Info_Table_TR_3.$.css({
					display: "table-row"
				});
				L_Info_Table_CIKIS.Text(text);
			}else if(side === "R"){
				R_Info_Table_TR_3.$.css({
					display: "table-row"
				});
				R_Info_Table_CIKIS.Text(text);
			}
		};
		
		SetZSAYMA = (side, n=0)=>{
			let text = "";
			for(let i=0;i<n;i++)text += "<i class=\"fa fa-circle\"></i>";
			// fa-dot-circle-o , fa-circle , fa-square
			if(side === "L"){
				L_Info_Table_TR_4.$.css({
					display: "table-row"
				});
				L_Info_Table_ZSAYMA.Text(text);
			}else if(side === "R"){
				R_Info_Table_TR_4.$.css({
					display: "table-row"
				});
				R_Info_Table_ZSAYMA.Text(text);
			}
		};
		
		const Point_Elements_L = [
			L_Point,
			Round_Table_TR_1_TD_L,
			Round_Table_TR_2_TD_L,
			Round_Table_TR_3_TD_L,
			Round_Table_TR_4_TD_L,
			Round_Table_TR_5_TD_L,
		];
		
		const Point_Elements_R = [
			R_Point,
			Round_Table_TR_1_TD_R,
			Round_Table_TR_2_TD_R,
			Round_Table_TR_3_TD_R,
			Round_Table_TR_4_TD_R,
			Round_Table_TR_5_TD_R,
		];
		
		SetPoint = (side, judge=0, point=0, border=false)=>{
			const color = "#10FF42";
			if(side === "L"){
				Point_Elements_L[judge].Text(point + "");
				(judge === 0 ? L_Side : Point_Elements_L[judge]).$.css({
					borderColor: border ? color : "#80808000",
				});
			}
			else if(side === "R"){
				Point_Elements_R[judge].Text(point + "");
				(judge === 0 ? R_Side : Point_Elements_R[judge]).$.css({
					borderColor: border ? color : "#80808000",
				});
			}
		};
		
		Animation = async()=>{
			await WaitAsync((resolve)=>{
				Title.$.show().css({
					left: 0,
					top: 0,
					right: 0,
					height: height,
					fontSize: (height * 0.15),
				});
				setTimeout(resolve, 1000);
			});
			
			await WaitAsync((resolve)=>{
				Title.$.animate({
					left: Margin,
					top: Margin,
					right: Margin,
					height: Title_Height,
					fontSize: (Title_Height * 0.70 - 5)
				}, 1000, ()=>{
					L_Side.$.show();
					R_Side.$.show();
					resolve();
				});
			});
			
			const sameTime0 = [];
			
			sameTime0.push(WaitAsync((resolve)=>{
				L_Side.$.show().css({
					left: (Side_Width * 0.7)
				}).animate({
					left: Margin
				}, 2000, resolve);
			}));
			
			sameTime0.push(WaitAsync((resolve)=>{
				R_Side.$.show().css({
					right: (Side_Width * 0.7)
				}).animate({
					right: Margin
				}, 2000, resolve);
			}));
			
			await Promise.all(sameTime0);
			
			const sameTime1 = [];
			
			sameTime1.push(WaitAsync((resolve)=>{
				L_Side.$.animate({
					left: (width / 2 - Side_Width)
				}, 300, resolve);
			}));
			
			sameTime1.push(WaitAsync((resolve)=>{
				R_Side.$.animate({
					right: (width / 2 - Side_Width)
				}, 300, resolve);
			}));
			
			await Promise.all(sameTime1);
			
			const sameTime2 = [];
			
			sameTime2.push(WaitAsync((resolve)=>{
				L_Side.$.animate({
					left: (width / 2 - Side_Width - width * 0.02)
				}, 500, resolve);
			}));
			
			sameTime2.push(WaitAsync((resolve)=>{
				R_Side.$.animate({
					right: (width / 2 - Side_Width - width * 0.02)
				}, 500, resolve);
			}));
			
			await Promise.all(sameTime2);
			
			const sameTime3 = [];
			
			sameTime3.push(WaitAsync((resolve)=>{
				L_Side.$.animate({
					left: (width / 2 - Side_Width)
				}, 100, resolve);
			}));
			
			sameTime3.push(WaitAsync((resolve)=>{
				R_Side.$.animate({
					right: (width / 2 - Side_Width)
				}, 100, resolve);
			}));
			
			await Promise.all(sameTime3);
			
			const sameTime4 = [];
			
			sameTime4.push(WaitAsync((resolve)=>{
				L_Side.$.animate({
					left: (width / 2 - Side_Width - width * 0.02)
				}, 100, resolve);
			}));
			
			sameTime4.push(WaitAsync((resolve)=>{
				R_Side.$.animate({
					right: (width / 2 - Side_Width - width * 0.02)
				}, 100, resolve);
			}));
			
			await Promise.all(sameTime4);
			
			const sameTime5 = [];
			
			sameTime5.push(WaitAsync((resolve)=>{
				L_Side.$.animate({
					left: (width / 2 - Side_Width)
				}, 100, resolve);
			}));
			
			sameTime5.push(WaitAsync((resolve)=>{
				R_Side.$.animate({
					right: (width / 2 - Side_Width)
				}, 100, resolve);
			}));
			
			await Promise.all(sameTime5);
			
			const sameTime6 = [];
			
			sameTime6.push(WaitAsync((resolve)=>{
				L_Side.$.animate({
					left: (width / 2 - Side_Width - width * 0.02)
				}, 100, resolve);
			}));
			
			sameTime6.push(WaitAsync((resolve)=>{
				R_Side.$.animate({
					right: (width / 2 - Side_Width - width * 0.02)
				}, 100, resolve);
			}));
			
			await Promise.all(sameTime6);
			
			//////
			
			await WaitAsync((resolve)=>{
				L_Side.$.animate({
					left: Margin
				}, 500, resolve);
			});
			
			await WaitAsync((resolve)=>{
				R_Side.$.animate({
					right: Margin
				}, 500, resolve);
			});
			
			Round_area.$.show();
			SetCount(3 * 60);
		};
		
		Title.$.hide();
		L_Side.$.hide();
		R_Side.$.hide();
		Round_area.$.hide();
		
		setTimeout(()=>{
			Title.$.show();
			L_Side.$.show();
			R_Side.$.show();
			Round_area.$.show();
			
			$("div#spinnerpanel").css({
				visibility: "hidden",
				display: "none"
			});
		}, 500);
	};
	
	
	
	ATA.Setups.push(()=>{
		Socket.connect();
		Setup();
		ReSetRoundTime("00:00");
		Socket.on("SCREEN", (data)=>{
			Helper.InjectJS(data.CODE, {
				SetTitle,
				SetPlatform,
				SetRoundNo,
				SetName,
				SetSubInfo,
				SetPoint,
				SetIHTAR,
				SetIKAZ,
				SetCIKIS,
				SetZSAYMA,
				ReSetRoundTime,
				SetRoundTime,
				Animation,
				SetWin,
			}, [...(data.ARGS)]);
		});
		
		Socket.emit("MSG", {
			M: "SCREEN"
		});
	});
	
	setTimeout(()=>{
		
		
		let endTime = (new Date()).getTime() + 120 * 1000;
		setInterval(()=>{
			const sNow = (new Date()).getTime();
			SetRoundTime(endTime, sNow);
		}, 1000);
		
		setTimeout(()=>{
			endTime = (new Date()).getTime() + 120 * 1000;
		}, 15 * 1000);
		
	}, 100);
	
	// WUSHU SCREEN
})(ATA(), window, document);