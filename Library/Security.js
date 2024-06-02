module.exports=((ATA)=>{
	const Crypto = ATA.Require("crypto");
	
	const GetHash = (query, privateKey)=>{
		return Crypto.createHmac("sha256",  privateKey).update(query).digest("hex");
	};
	
	const GenerateUUIDV4 = ()=>{
		return("XXXXXXXX-XXXX-4XXX-YXXX-XXXXXXXXXXXX").replace(/[XY]/g, (char)=>{
			const r = Math.random() * 16 | 0;
			const v = char === "X" ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		}).toUpperCase();
	};
	
	const Data2Token = (data, privateKey)=>{
		const header = Buffer.from(JSON.stringify({
			alg: "HS256",
			typ: "JWT"
		})).toString("base64");
		const payload = Buffer.from(JSON.stringify(data)).toString("base64");
		const signature = Crypto.createHmac("sha256", privateKey).update(header + "." + payload).digest("base64");
		return header + "." + payload + "." + signature;
	};
	
	const Token2Data = (token, privateKey)=>{
		const [header, payload, signature] = (token + "").split(".");
		const calculatedSignature = Crypto.createHmac("sha256", privateKey).update(header + "." + payload).digest("base64");
		if(calculatedSignature !== signature)return false;
		const data = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));
		return data;
	};
	
	return{
		GetHash,
		GenerateUUIDV4,
		Data2Token,
		Token2Data,
		//
	};
})(ATA());