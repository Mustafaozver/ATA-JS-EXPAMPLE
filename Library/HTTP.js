module.exports=((ATA)=>{
	const http = ATA.Require("http");
	const https = ATA.Require("https");
	
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
	
	return{
		http,
		https,
		Request,
		
	};
	
})(ATA());