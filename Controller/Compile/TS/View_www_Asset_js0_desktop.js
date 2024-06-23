((win, doc)=>{
	<%- include("./src/index.js"); %>;
	//
	const hostname = win.location.hostname;
	const port = win.location.port === "" ? "" : (":" + win.location.port);
	const protocol = win.location.protocol;
	
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
	const Connection = <%- include("./src/Connection.js"); %>;
	const WebRTC = <%- include("./src/WebRTC.js"); %>;
	const Socket  = <%- include("./src/Socket.js"); %>;
	const Device = <%- include("./src/Device.js"); %>;
	const UI = <%- include("./src/UI_Iframe.js"); %>;
	
	<%- include("./src/Development.js"); %>;
	
	<%- include("./src/main.js"); %>;
	
	
	Function("with(this)console.log({ATA});").apply({
		ATA,
		
	});
	
})(window, document);