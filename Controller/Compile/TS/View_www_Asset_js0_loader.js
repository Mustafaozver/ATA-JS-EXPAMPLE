((win, doc)=>{
	<%- include("./src/index.js"); %>;
	//
	const hostname = win.location.hostname;
	const port = win.location.port === "" ? "" : (":" + win.location.port);
	const protocol = win.location.protocol;
	const documentElement = doc.documentElement;
	
	const Helper = <%- include("./src/Helper.js"); %>;
	const Module  = <%- include("./src/Module.js"); %>;
	const DomElement  = <%- include("./src/DomElement.js"); %>;
	const Socket  = <%- include("./src/Socket.js"); %>;
	
	
	
	
	
	
	console.log({
		//
		hostname,
		port,
		protocol,
		documentElement,
		//
		Helper,
		Module,
		DomElement,
		Socket,
		
	});
	
	
	<%- include("./src/main.js"); %>;
})(window, document);