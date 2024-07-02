((ATA, win, doc)=>{
	// Connection
	const BASE = protocol + "//" + hostname + port;
	const API = BASE + <% __append(JSON.stringify(Environment.API_V3)); %>;
	
	const Serialize = (obj)=>{
		const arr = [];
		for(let key in obj)if(obj.hasOwnProperty(key))arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
		return arr.join("&");
	};
	
	const CheckAPIResponse = (data)=>{
		if(data.error){
			console.log("API Error => ", data.msg);
			return data;
		}else if(data.success){
			return data;
		}
		throw new Error("Unknown API Error => ", data);
	};
	
	const GenerateQuery = (query)=>{
		if(!query)return"";
		return "?" + Serialize(query);
	};
	
	const GenerateHeaders = (option={})=>{
		return Object.assign({
			"Accept": "text/plain",
			"Content-Type": "text/plain",
			"Authorization": "Bearer " + GetLocalToken(),
		}, {...option});
	};
	
	const GetXHR = ()=>{
		if(win.XMLHttpRequest)return win.XMLHttpRequest;
		return false;
	};
	
	const Request = async(url, body=false, query=false, method="GET", header={}, option={})=>{
		return await Request_(url, body, query, method, header, option);
	};
	const Request_ = async(url, body=false, query=false, method="GET", header={}, option={})=>{
		const querystring = GenerateQuery(query);
		
		const options = {
			...option,
			method,
			headers: GenerateHeaders(header),
		};
		
		switch(method){
			case"POST":
			case"PUT":
			case"DELETE":
				options.body = JSON.stringify({...body});
			break;
			default:
			case"GET":
			break;
		}
		
		const req = await fetch(url + querystring, options);
		return req;
	};
	
	const CallAPI = async(path, body=false, query=false)=>{
		const req =await Request_(API + path, body, query, "POST", {
			"Accept": "application/json",
			"Content-Type": "application/json",
		});
		return CheckAPIResponse(await req.json());
	};
	const GetScript = async(path, obj={}, body=false, query=false)=>{
		return await GetScript_(path, obj, body, query);
	};
	const GetScript_ = async(script="", obj={}, body=false, query=false)=>{
		const resp = await CallAPI("/SCRIPT", {}, { script });
		try{
			return Helper.InjectJS(resp.SCRIPT, {
				...obj
			}, [ATA]);
		}catch(e){
			return e;
		}
	};
	
	const Upload = (path, form, callback=()=>{})=>{
		return Upload_(path, form, callback);
	};
	const Upload_ = (path, form, callback)=>{
		const xhr = new(GetXHR())();
		
		xhr.upload.addEventListener("progress", (event)=>{
			callback("P", event, event.loaded / event.total);
		});
		
		xhr.addEventListener("load", (event)=>{
			const data = JSON.parse(event.target.responseText);
			callback("L", event, data);
		}, false);
		
		xhr.addEventListener("error", (event)=>{
			callback("E", event);
		}, false);
		
		xhr.addEventListener("abort", (event)=>{
			callback("A", event);
		}, false);
		
		xhr.onreadystatechange = (response)=>{
			callback("C", response);
		};
		
		xhr.open("POST", API + path, true);
		xhr.send(new FormData(form));
		return xhr;
	};
	
	setTimeout(()=>{
		CallAPI("/TRY", {y:5,h:8}, {g:7,e:1453}).then((data)=>{
			console.log({data});
		});
		GetScript("0", {l:1071}).then((data)=>{
			console.log({data});
		});
	}, 5000);
	
	return{
		Request,
		Upload,
		CallAPI,
		GetScript,
	};
	// Connection
})(ATA(), window, document);