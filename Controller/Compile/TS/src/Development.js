// Development

const LoaderPromises = [];
const SESSION = new Storage("session", { default: "" });
const auth_token_regex = /^(?<token>[^ ]+\.[^ ]+\.[^ ]+)$/;

const isExport = true;

/*const console = {
	log: ()=>{}
};*/

const GeneratePromise = ()=>{
	const resp = {};
	resp.promise = new Promise((resolve, reject)=>{
		resp.resolve = resolve;
		resp.reject = reject;
	});
	return resp;
};

const GetOffsetPosition = (el=doc.body)=>{
	let x = 0;
	let y = 0;
	while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)){
		x += el.offsetLeft - 0 * el.scrollLeft;
		y += el.offsetTop - 0 * el.scrollTop;
		el = el.offsetParent;
	}
	return { x, y };
};

const GetWidth = ()=>{
	return win.innerWidth || documentElement.clientWidth || body.clientWidth || 0;
};


const GetHeight = ()=>{
	return win.innerHeight || documentElement.clientHeight || body.clientHeight || 0;
};

const ToFixingStyle = (str)=>{
	str = "" + str;
	if(str.constructor.prototype.toLocaleUpperCase)return str.toLocaleUpperCase();
	else return str.toUpperCase();
};

const ConvertBASE64URL = (mime, content)=>{
	return "data:" + mime + ";base64," + btoa(content + "");
};

const CreateElement = (tagname="DIV", area)=>{
	const element = doc.createElement(tagname);
	//element.className = "" + classname;
	area.appendChild(element);
	return element;
};

const SelectElement = (element)=>{
	element.O.style.border = "1px solid red";
};

const OptionCompleter = (defauls={}, opts={})=>{
	return Object.assign({}, { ...defauls }, { ...opts });
};

const GetLocalToken = ()=>{
	const auth = SESSION.toString();
	if(!auth_token_regex.test(auth))return false;
	try{
		return auth_token_regex.exec(auth).groups.token;
	}catch(e){
		//
		return false;
	}
};

const GetSessionToken = ()=>{
	return SESSION.toString();
};


(()=>{
	try{
		SESSION.Restore();
	}catch(e){
		
	}
	try{
		SESSION.Save();
	}catch(e){
		
	}
})();

((ATA)=>{
	//
	
	ATA.Setups.push(()=>{
		//Socket.io.open();
		//Socket.connect();
	});
})(ATA());

// Development