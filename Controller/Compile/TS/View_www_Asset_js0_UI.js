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
	const Storage = <%- include("./src/Storage.js"); %>;
	const DomElement  = <%- include("./src/DomElement.js"); %>;
	
	<%- include("./src/Development.js"); %>;
	
	<%- include("./src/UI.js"); %>;
})(window, document);