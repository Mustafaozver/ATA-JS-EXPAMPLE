module.exports=((ATA)=>{
	const http = ATA.Require("http");
	const https = ATA.Require("https");
	
	const express = ATA.Require("express");
	const useragent = ATA.Require("express-useragent");
	const bodyparser = ATA.Require("body-parser");
	const cors = ATA.Require("cors");
	const morgan = ATA.Require("morgan");
	const cookieParser = ATA.Require("cookie-parser");
	const helmet = ATA.Require("helmet");
	
	const { Router, static, json, urlencoded } = express;
	
	//const multer = ATA.Require("multer");
	//const RateLimiter = ATA.Require("rate-limiter-flexible");
	
	const Request = async(req_options, post_data)=>{
		const promise = new Promise((resolve, reject)=>{
			const req = (req_options.secure ? https : http).request(req_options, (res)=>{
				const chunks = [];
				res.on("data", (data)=>{
					chunks.push(data);
				});
				res.on("end", ()=>{
					resolve(Buffer.concat(chunks));
				});
			});
			req.on("error", reject);
			if(post_data)req.write(post_data); // if = body exist...
			req.end();
		});
		return await promise;
	};
	
	/*
	
	const post_data = "";
	
	const req_options = {
		host: ATA.config.OUTDOORSERVER.host,
		port: ATA.config.OUTDOORSERVER.port,
		path: ATA.config.OUTDOORSERVER.path,
		method: "GET",//"POST",
		headers: {
			"Content-Type": "application/json",
			"Content-Length": Buffer.byteLength(post_data)
		}
	};
	
	Request(req_options, post_data).then((data)=>{
		console.log(data.toString());
	});
	
	*/
	
	const app = express();
	
	app.use(helmet({
		contentSecurityPolicy: false,
	}));
	
	app.set("view options", {
		layout: false,
		pretty: false,
	});
	
	app.set("view engine", "ejs");
	app.enable("view cache");
	
	app.use(cors());
	
	app.use(morgan("combined", {
		// TYPE = ":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\""
		skip: (req, res)=>{
			return res.statusCode === 200;
		},
		stream: {
			write: (msg)=>{
				Logger.http(msg.trim());
			}
		}
	}));
	
	app.use(cookieParser());
	app.use(useragent.express());
	app.use(bodyparser.urlencoded({ extended: true }));
	app.use(bodyparser.json());
	app.use(json({ limit: "50mb" }));
	app.use(urlencoded({ extended: false, limit: "50mb" }));
	
	return{
		http,
		https,
		Request,
		Router,
		static,
		app,
	};
})(ATA());