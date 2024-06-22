((ATA, win, doc)=>{
	const RTCConfig = {
		iceServers: [
			{
				url: "stun:stun.1.google.com:19302"
			},
		]
	};
	
	const GetWebRTCConnection = ()=>{
		try{
			if(win.RTCPeerConnection)return win.RTCPeerConnection;
			else if(win.webkitRTCPeerConnection)return win.webkitRTCPeerConnection;
			else if(win.mozRTCPeerConnection)return win.mozRTCPeerConnection;
			else if(win.msRTCPeerConnection)return win.msRTCPeerConnection;
			else if(win.oRTCPeerConnection)return win.oRTCPeerConnection;
		}catch(e){
			console.log("RTCPeerConnection is not supported.");
		}
		return false;
	};
	
	const GetWebRTCDescription = ()=>{
		try{
			if(win.RTCSessionDescription)return win.RTCSessionDescription;
			else if(win.webkitRTCSessionDescription)return win.webkitRTCSessionDescription;
			else if(win.mozRTCSessionDescription)return win.mozRTCSessionDescription;
			else if(win.msRTCSessionDescription)return win.msRTCSessionDescription;
			else if(win.oRTCSessionDescription)return win.oRTCSessionDescription;
		}catch(e){
			console.log("RTCSessionDescription is not supported.");
		}
		return false;
	};
	
	const GetWebIceCandidate = ()=>{
		try{
			if(win.RTCIceCandidate)return win.RTCIceCandidate;
			else if(win.webkitRTCIceCandidate)return win.webkitRTCIceCandidate;
			else if(win.mozRTCIceCandidate)return win.mozRTCIceCandidate;
			else if(win.msRTCIceCandidate)return win.msRTCIceCandidate;
			else if(win.oRTCIceCandidate)return win.oRTCIceCandidate;
		}catch(e){
			console.log("RTCIceCandidate is not supported.");
		}
		return false;
	};
	
	const defaultDataChannelName = "DDCN";
	const RTCClass = GetWebRTCConnection();
	const RTCDescription = GetWebRTCDescription();
	const RTCIceCandidate = GetWebIceCandidate();
	
	const WebRTC = (()=>{
		
		const private_key = Symbol();
		
		const class_stack = {};
		const config_stack = {};
		const hidden_stack = {};
		
		const Generate_Config = (config={})=>{
			return Object.assign({
				//
				
			}, { ...config });
		};
		
		const register = (ins, tagname, area, config={})=>{
			const ID = Symbol();
			ins[private_key] = ID;
			
			//class_stack[ID] = ins;
			config_stack[ID] = Generate_Config(config);
			hidden_stack[ID] = {
				//
			};
		};
		
		const Class = class{
			[private_key] = null;
			constructor(config){
				register(this, config);
			};
		};
		
		return Class;
	})();
	
	return WebRTC;
})(ATA(), window, document);