((win, doc)=>{
	<%- include("./src/index.js"); %>;
	//
	const hostname ="localhost";
	const port = ":" + "8050";
	const protocol = "http:";
	
	const documentElement = doc.documentElement;
	const body = doc.body;
	
	const secret_key = <% __append(JSON.stringify(secret_key)); %>;
	const prefix = <% __append(JSON.stringify(prefix)); %>;
	const build_time = <% __append(time); %>;
	
	const Helper = <%- include("./src/Helper.js"); %>;
	const Caller = <%- include("./src/Caller.js"); %>;
	const Storage = <%- include("./src/Storage.js"); %>;
	const Module  = <%- include("./src/Module.js"); %>;
	const DomElement  = <%- include("./src/DomElement.js"); %>;
	const UI = <%- include("./src/UI.js"); %>;
	
	<%- include("./src/Development.js"); %>;
	
	<%- include("./src/electron.js"); %>;
	
	
	Function("with(this)console.log({ATA});").apply({
		ATA,
		
	});
	
})(window, document);