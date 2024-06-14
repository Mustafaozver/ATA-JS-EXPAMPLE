/****************************************************************************************************
*	
*	A JavaScript LifeCycle Library (And also a Manifest) : ATA.JS (V7.0 Beta)
*	https://github.com/mustafaozver/atajs/
*	
*	--------------------------------------------- (C) ----------------------------------------------
*	
*	Author : Mustafa ÖZVER
*	<mustafa.ozver@hotmail.com>
*	
*	Distributed under the BSD license:
*	
*	Copyright 2024 (c) Mustafa ÖZVER <mustafa.ozver@hotmail.com>
*	
*	Redistribution and use in source and binary forms, with or without modification, are permitted
*	provided that the following conditions are met:
*            
*		* Redistributions of source code must retain the above copyright notice, this list of
*	conditions and the following disclaimer.
*	
*		* Redistributions in binary form must reproduce the above copyright notice, this list of
*	conditions and the following disclaimer in the documentation and/or other materials provided
*	with the distribution.
*	
*	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES,
*	INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
*	A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE 	LIABLE FOR ANY
*	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
*	LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
*	BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
*	STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
*	THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
****************************************************************************************************/

const GLOBAL = (()=>{
	return this;
})();

GLOBAL.NAME = "";
GLOBAL.VERSION = "";
GLOBAL.DESCRIPTION = "";
GLOBAL.COPYRIGHT = "";
GLOBAL.LICENSE = "";

if(typeof ATA === "undefined")(function(GLOBAL){
	if(!GLOBAL["Infinity"])GLOBAL["Infinity"] = 99999999999999999;
	const PInfinity = 0.0000000000000001;
	
	const mCode = "" + arguments.callee;
	
	const DecodeObject = function(obj){
		if(obj)switch((typeof obj).toLowerCase()){
			default:
			case "string": // String
				return JSON.stringify(obj);
			break;
			case "object": // Object or Array or else
				const objType = obj.constructor.name;
				let text;
				switch(objType.toLowerCase()){
					default:break;
					case "array": // Array
						text = [];
						for(var i=0;i<obj.length;i++) text.push(DecodeObject(obj[i]));
						return "[" + text.join(",") + "]";
						break;
					case "object": // Object
						const keys = Object.keys(obj);
						text = "";
						for (var i=0;i<keys.length;i++) {
							try{
								if(!obj[keys[i]])continue; // Unreadable values
								//if(keys[i] == "")continue;
								text += (keys[i]) + ":" + DecodeObject(obj[keys[i]]) + "";
								if (i < keys.length - 1) text += ",";
							}catch(e){
								return "{}";
							}
						}
						return "{" + text + "}";
					break;
				}
				if (objType == "RegExp"){
					return (obj)+""; // "new RegExp()";
				}
				if (objType == "Error"){
					return "new Error(\"\")";
				}
				//return "Object.assign(new " + objType + "(),{" + text + "})";
				return"{}";
			break;
			case "number": // Number
				return obj;
			break;
			case "function": // Function
				return obj+"";
			break;
			case "boolean": // Boolean
				return obj+"";
			break;
		}
	};
	
	const FormatTime = function(oMsec) {
		let ftext = "[Y-M-D] [H:m:S]";
		const micSec = oMsec % 1000;
		let totalcount = Math.floor(oMsec/1000);
		const sec = totalcount%60;
		totalcount = Math.floor(totalcount/60);
		const min = totalcount%60;
		totalcount = Math.floor(totalcount/60);
		const hour = totalcount%24;
		totalcount = Math.floor(totalcount/24);
		const day = totalcount%30;
		totalcount = Math.floor(totalcount/30);
		const month = totalcount%12;
		const year = Math.floor(totalcount/12);
		if(year == 0){
			ftext = ftext.replace("Y-","");
			if(month == 0){
				ftext = ftext.replace("M-","");
				if(day == 0){
					ftext = ftext.replace("[D] ","");
					if(hour == 0){
						ftext = ftext.replace("H:","");
					}
				}
			}
		}
		ftext = ftext.replace("Y",year);
		ftext = ftext.replace("M",(month/100).toFixed(2).substr(2));
		ftext = ftext.replace("D",(day/100).toFixed(2).substr(2));
		ftext = ftext.replace("H",(hour/100).toFixed(2).substr(2));
		ftext = ftext.replace("m",(min/100).toFixed(2).substr(2));
		ftext = ftext.replace("S",(sec/100).toFixed(2).substr(2)+(micSec/1000).toFixed(3).substr(1));
		return ftext;
	};
	
	const DoFinalize = function(func, args){
		const THAT = this;
		setTimeout(function(){
			func.apply(THAT,[...args]);
		},10);
	};
	
	const waitUntil = async function(if_, eval_,time_=25) {
		const promise = new Promise(function(resolve, reject) {
			let f_temp = ()=>{
				if((if_)()){
					delete f_temp;
					resolve();
				}else{
					setTimeout(f_temp, time_);
				}
			};
			f_temp();
		}).then(function() {
			return (eval_)();
		});
		return await promise;
	};
	
	const isTimeCycled = function(lasttime, period){
		const thisTime = (new Date()).getTime();
		const PivotTime = thisTime % period;
		const lastPivotTime = lasttime % period;
		return(PivotTime < lastPivotTime);
	};
	
	let ATA = class{
		constructor(){
			
		};
	};
	
	Object.assign(ATA.prototype,{
		LoopTime:1000,
		StartTime:(new Date()).getTime(),
		valueOf: ()=>{
			return GLOBAL;
		},
		toString: ()=>{
			return ATA.Name + " V(" + ATA.Version + ")";
		},
		ID: <% __append(JSON.stringify({...ATA.ID}));%>,
	});
	
	let ANA = ATA;
	ATA = new ATA();
	
	Object.assign(ATA,{
		LastActivite: 0,
		Settings: {
			//ID:"",
			//ROOT:loc + "\\NODE_TRADER\\"
		},
		Loops: [],
		Setups: [],
		UUID: {
			varIDs: {},
			Generate: ()=>{
				const len = 16;
				const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
				while(true){
					let text = "_";
					for(var i=0;i<len;i++)text += chars.charAt(Math.floor(chars.length*Math.random()));
					if(!ATA.UUID.varIDs[text]){
						ATA.UUID.varIDs[text] = true;
						return text;
					}
				}
			},
		},
		Log: (message)=>{
			if(!ATA.isDebug)return;
			const thisDate = new Date();
			let text = "";
			text += "|\t[" + thisDate.getTime() + "]" + thisDate,"\t" + FormatTime(thisDate.getTime() - ATA.StartTime) + "\n\r";
			text += "|\tSystem : " + message + "\n\r";
			console.log(text);
			ATA.LOGs___[(new Date()).getTime()] = message;
		},
		LOGs___: {},
		CheckSystem: async()=>{ // Check system
			if(ATA.Setups.length > 0){
				ATA.Log("ATA is starting...");
				await ATA.Setup();
				ATA.Log("ATA is started.");
				return;
			}
			ATA.Loop();
			ATA.Log("ATA is alive.");
		},
		Setup: async()=>{ // Setup function
			while(ATA.Setups.length > 0){
				const tempf = ATA.Setups.shift();
				try{
					await tempf.apply(ATA, [ATA.LastActivite]);
				}catch(e){
					console.warn(e,tempf);
					ATA.Setups.push(tempf);
					return;
				}
			}
		},
		Loop: async()=>{
			const newdate = new Date();
			for(let i=0;i<ATA.Loops.length;i++){
				try{
					ATA.Loops[i].apply(ATA,[newdate]);
					ATA.Log("ATA cycled " + ATA.Loops.length + " function(s) successfuly.");
				}catch(e){
					ATA.Log(e);
				}
			}
			ATA.Log("ATA forced %" + ((newdate.getTime()%ATA.LoopTime)*100/ATA.LoopTime).toFixed(2));
		},
	});
	
	Object.assign(ATA, {
		Name		: "ATA.JS for Browser",
		Version		: "Beta 10.0.0.0-00",
		Description	: "",
		CopyRight	: "Copyright (C) 2024",
		isReady		: false,
		isDebug		: false,
		isMaster	: false,
	});
	
	ATA.GLOBAL = GLOBAL;
	ATA.Settings.ID = "ATAV10_" + ATA.UUID.Generate();
	GLOBAL.NAME = ATA.Name;
	GLOBAL.VERSION = ATA.Version;
	GLOBAL.DESCRIPTION = ATA.Description;
	GLOBAL.COPYRIGHT = ATA.CopyRight;
	
	GLOBAL["ATA"] = function(){
		return ATA;
	};
	
	GLOBAL["ANA"] = function(){
		return ANA;
	};
	
	setTimeout(async()=>{ // Start trigger
		setInterval(()=>{ // Time => /|. Clock
			const thisTime = (new Date()).getTime();
			const PivotTime = thisTime % ATA.LoopTime;
			const lastPivotTime = ATA.LastActivite % ATA.LoopTime;
			if(PivotTime < lastPivotTime){
				ATA.CheckSystem();
			}
			ATA.LastActivite = thisTime;
			const title = ATA.Name + " V(" + ATA.Version + ") " + (new Date(thisTime)) + " " + FormatTime(thisTime - ATA.StartTime);
			//document.title = title;
		},200);
	},1);
	
	Object.assign(ATA, {
		waitUntil,
		isTimeCycled,
		DoFinalize,
		FormatTime,
		DecodeObject,
		// Addons
		Helpers: {},
		Communication: {},
		Screen: {},
		Module: {},
		Dom: {},
	});
	
})(GLOBAL);