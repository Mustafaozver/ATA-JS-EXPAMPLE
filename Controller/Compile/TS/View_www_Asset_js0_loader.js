((win, doc)=>{
	<%- include("./src/index.js"); %>;
	//
	const hostname = win.location.hostname;
	const port = win.location.port === "" ? "" : (":" + win.location.port);
	const protocol = win.location.protocol;
	const documentElement = doc.documentElement;
	
	const DomElement  = <%- include("./src/DomElement.js"); %>;
	const Socket  = <%- include("./src/Socket.js"); %>;
	
	
	console.log({
		hostname,
		port,
		protocol,
		documentElement,
		DomElement,
		Socket,
		
	});
	
	
	<%- include("./src/main.js"); %>;
})(window, document);