((ATA, win, doc)=>{
	// Helper
	const ToggleFullScreen = ()=>{
		if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement){
			if(doc.exitFullscreen)doc.exitFullscreen();
			else if(doc.mozCancelFullScreen)doc.mozCancelFullScreen();
			else if(doc.webkitExitFullscreen)doc.webkitExitFullscreen();
			else if(doc.msExitFullscreen)doc.msExitFullscreen();
			return false;
		}else{
			const element = doc.body;
			if(element.requestFullscreen)element.requestFullscreen();
			else if(element.mozRequestFullScreen)element.mozRequestFullScreen();
			else if(element.webkitRequestFullscreen)element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			else if(element.msRequestFullscreen)element.msRequestFullscreen();
			return true;
		}
	};
	
	const ChangeMode = (mode="")=>{
		switch(mode.toUpperCase()){
			case"WAIT":
				$("div#spinnerpanel").css({
					visibility: "visible",
					display: "block"
				});
			break;
			default:
			case"OK":
				$("div#spinnerpanel").css({
					visibility: "hidden",
					display: "none"
				});
			break;
		}
	};
	
	const Date_ = (()=>{
		const private_key = Symbol();
		
		const class_stack = {};
		const config_stack = {};
		const hidden_stack = {};
		
		const Generate_Config = (config={})=>{
			return Object.assign({
				//
			}, { ...config });
		};
		
		const register = (ins, config={})=>{
			const ID = Symbol();
			ins[private_key] = ID;
			
			//class_stack[ID] = ins;
			config_stack[ID] = Generate_Config(config);
			hidden_stack[ID] = {
				date: 0
				//
			};
		};
		
		const Class = class{
			[private_key] = null;
			constructor(config){
				register(this, config);
			};
			
		};
		
		
		
		
		
		const date = new Date();
		const timeofyear = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0);
		
		
		const hijridate = date.toLocaleDateString("tr-u-ca-islamic").split(" ")[1];
		const parsed = hijridate.split(".");
		const h_day = Number(parsed[0]);
		const h_month = Number(parsed[1]);
		const h_year = Number(parsed[2]);
		const iMonthNames = [
			"Muharrem", // 1
			"Sefer", // 2
			"Rebi'ul Evvel", // 3
			"Rebi'ul Ahir", // 4
			"Cemaziyel Evvel", // 5
			"Cemaziyel Ahir", // 6
			"Recep", // 7
			"Şaban", // 8
			"Ramazan", // 9
			"Şevval", // 10
			"Zilkade", // 11
			"Zilhicce" // 12
		];
		
		const resp = "HİCRİ => " + h_day + " " + iMonthNames[h_month-1] + " " + h_year;
		console.log(resp);
		
		
		
		
		
		
		
		return Class;
	})();
	
	const Color = (()=>{
		const colorNames = {
			"WHITE": [255, 255, 255, 255],
			"BLACK": [0, 0, 0, 255],
			
			"RED": [255, 0, 0, 255],
			"GREEN": [0, 255, 0, 255],
			"BLUE": [0, 0, 255, 255],
			
			"YELLOW": [255, 255, 0, 255],
			"CYAN": [0, 255, 255, 255],
			"MAGENTA": [255, 0, 255, 255],
			
			"DARKRED": [127, 0, 0, 255],
			"DARKGREEN": [0, 127, 0, 255],
			"DARKBLUE": [0, 0, 127, 255],
		};
		
		const private_key = Symbol();
		
		const class_stack = {};
		const config_stack = {};
		const hidden_stack = {};
		
		const Generate_Config = (config={})=>{
			return Object.assign({
				//
			}, { ...config });
		};
		
		const register = (ins, config={})=>{
			const ID = Symbol();
			ins[private_key] = ID;
			
			//class_stack[ID] = ins;
			config_stack[ID] = Generate_Config(config);
			hidden_stack[ID] = {
				r: 0,
				g: 0,
				b: 0,
				a: 0,
				//
			};
		};
		
		const Class = class{
			[private_key] = null;
			constructor(r = 0, g, b, a = 255){
				register(this, {
					
				});
				if (g && b) {
					this.rgba = [r, g, b, a];
				} else if (colorNames[("" + r).toUpperCase()]) {
					const col = colorNames[("" + r).toUpperCase()];
					this.rgba = [...col];
				} else if (r[0] === "#" && (r.length === 7 || r.length === 9)) {
					const _r = parseInt(r.substr(1, 2), 16);
					const _g = parseInt(r.substr(3, 2), 16);
					const _b = parseInt(r.substr(5, 2), 16);
					const _a = r.length === 9 ? parseInt(r.substr(7, 2), 16) : 255;
					this.rgba = [_r, _g, _b, _a];
				}
			};
			
			get r(){
				return GetRed(this);
			};
			set r(value=0){
				SetRed(this, value);
			};
			
			get g(){
				return GetGreen(this);
			};
			set g(value=0){
				SetGreen(this, value);
			};
			
			get b(){
				return GetBlue(this);
			};
			set b(value=0){
				SetBlue(this, value);
			};
			
			get a(){
				return GetAlpha(this);
			};
			set a(value=0){
				SetAlpha(this, value);
			};
			
			set rgba(hexcode){
				this.r = hexcode[0] - 0;
				this.g = hexcode[1] - 0;
				this.b = hexcode[2] - 0;
				this.a = parseInt(hexcode[3]) >= 0 ? (hexcode[3] - 0) : 255;
			};
			
			get rgba(){
				return [
					this.r,
					this.g,
					this.b,
					this.a,
				];
			};
			
			set rgb(hexcode){
				this.r = hexcode[0] - 0;
				this.g = hexcode[1] - 0;
				this.b = hexcode[2] - 0;
				this.a = 255;
			};
			
			get rgb(){
				return [
					this.r,
					this.g,
					this.b
				];
			};
			
			get hex(){
				const _r = this.r.toString(16);
				const _g = this.g.toString(16);
				const _b = this.b.toString(16);
				
				const r = (this.r < 16 ? "0" : "") + _r;
				const g = (this.g < 16 ? "0" : "") + _g;
				const b = (this.b < 16 ? "0" : "") + _b;
				
				const color = "#" + r + g + b;
				
				if (this.a === 255)return color.toUpperCase();
				
				const _a = this.a.toString(16);
				return (color + (this.a < 16 ? "0" : "") + _a).toUpperCase();
			};
			
			get HSL(){
				const max = Math.max.apply(Math, [...this.rgba]);
				const min = Math.min.apply(Math, [...this.rgba]);
				const delta = max - min;
				let h = 0;
				let l = (max + min) / 2;
				let s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
				if (delta === 0) {
					h = 0;
				} else if (max === this.r) {
					h = ((this.g - this.b) / delta) % 6;
				} else if (max === this.g) {
					h = (this.b - this.r) / delta + 2;
				} else if (max === this.b) {
					h = (this.r - this.g) / delta + 4;
				}
				h = Math.round(h * 60);
				if (h < 0) h += 360;
				s = +(s * 100).toFixed(1);
				l = +(l * 100).toFixed(1);
				return [h, s, l];
				//return "hsl(" + h + "," + s + "%," + l + "%)";
			};
			
			isLight(){
				return isLight(this);
			};
			
			toString(){
				return this.hex;
			};
			valueOf(){
				return this.hex;
			};
		};
		
		const GetScale = (value=0)=>{
			return Math.floor(Math.min(Math.max(value - 0, 0), 255));
		};
		
		const GetRed = (ins)=>{
			const ID = ins[private_key];
			return hidden_stack[ID].r;
		};
		
		const SetRed = (ins, value=0)=>{
			const ID = ins[private_key];
			hidden_stack[ID].r = GetScale(value);
		};
		
		const GetGreen = (ins)=>{
			const ID = ins[private_key];
			return hidden_stack[ID].g;
		};
		
		const SetGreen = (ins, value=0)=>{
			const ID = ins[private_key];
			hidden_stack[ID].g = GetScale(value);
		};
		
		const GetBlue = (ins)=>{
			const ID = ins[private_key];
			return hidden_stack[ID].b;
		};
		
		const SetBlue = (ins, value=0)=>{
			const ID = ins[private_key];
			hidden_stack[ID].b = GetScale(value);
		};
		
		const GetAlpha = (ins)=>{
			const ID = ins[private_key];
			return hidden_stack[ID].a;
		};
		
		const SetAlpha = (ins, value=0)=>{
			const ID = ins[private_key];
			hidden_stack[ID].a = GetScale(value);
		};
		
		const isLight = (ins)=>{
			const brightness = ins.r * 0.3 + ins.g * 0.586 + ins.b * 0.114;
			return brightness > 155;
		};
		
		return Class;
	})();
	
	const colors1 = [
		"#C16068",
		"#A2BF8A",
		"#EBCC87",
		"#80A0C3",
		"#B58DAE",
		"#85C0D1",
	];
	
	const colors2 = [
		"#5C2983",
		"#0076C5",
		"#21B372",
		"#FDDE02",
		"#F76700",
		"#D30018",
	];
	
	const colors3 = [
		"#007bff",
		"#28a745",
		"#dc3545",
		"#ffc107",
		"#17a2b8",
		"#343a40",
	];
	
	const colors4 = [
		"#00BCD4",
		"#607D8B",
		"#4CAF50",
		"#8BC34A",
		"#3F51B5",
		"#F0E68C",
		"#CDDC39",
		"#FF9800",
		"#795548",
		"#FF5722",
		"#000FFF",
		"#E91E63",
		"#9C27B0",
		"#673AB7",
		"#F44336",
		"#009688",
		"#FFEB3B",
		"#616161",
		"#FFC107",
		"#00FFFF",
		"#2196F3",
		"#FFDDDD",
		"#87CEEB",
	];
	
	let _GenerateColor_count = 0;
	const GenerateColor = (n = 1)=>{
		_GenerateColor_count += n - 0;
		const arr = [];
		const colors = [...colors4, ...colors3, ...colors2, ...colors1];
		while (n-- > 0) {
			arr.push(colors[(_GenerateColor_count + n) % colors.length]);
		}
		return arr;
	};
	
	const GetCameraStream = async()=>{
		const promise = new Promise((resolve, reject)=>{
			try{
				navigator.mediaDevices.getUserMedia({
					audio: true,
					video: true,
				}).then((stream)=>{
					resolve(stream);
				}).catch((e)=>{
					reject(e);
				});
			}catch(e){
				reject(e);
			}
		});
		return await promise;
	};
	
	const GetScreenStream = async()=>{
		const promise = new Promise((resolve, reject)=>{
			try{
				navigator.mediaDevices.getDisplayMedia({
					audio: true,
					video: true,
				}).then((stream)=>{
					resolve(stream);
				}).catch((e)=>{
					reject(e);
				});
			}catch(e){
				reject(e);
			}
		});
		return await promise;
	};
	
	const CreateService = async(url)=>{
		const promise = new Promise((resolve, reject)=>{
			try{
				navigator.serviceWorker.register("" + url, {
					//scope: "./"
				}).then((item)=>{
					resolve(item);
				}).catch((e)=>{
					reject(false);
				});
			}catch(e){
				reject(false);
			}
		});
		return await promise;
	};
	
	
	
	ATA.ThemeColor = "LIGHT";
	const Qmedia = win.matchMedia("(prefers-color-scheme: " + "dark" + ")");
	const checkThemeColor = () => {
		ATA.ThemeColor = Qmedia.matches ? "DARK" : "LIGHT";
		console.log("Theme => ", ATA.ThemeColor);
	};
	Qmedia.addEventListener("change", checkThemeColor);
	checkThemeColor();
	
	
	return{
		ToggleFullScreen,
		ChangeMode,
		GenerateColor,
		Date: Date_,
		Color,
		
		GetCameraStream,
		GetScreenStream,
		CreateService,
		
	};
	// Helper
})(ATA(), window, document);