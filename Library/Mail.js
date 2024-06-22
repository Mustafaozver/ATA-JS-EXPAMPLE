module.exports=((ATA)=>{
	const NM = ATA.Require("nodemailer");
	
	const CreateTransporter = (option)=>{
		return NM.createTransport(Object.assign({
			service: "gmail",
			Host: "smtp.gmail.com",
			port: 465,
			secure: true,
			logger: false,
			debug: false,
			secureConnection: false,
			tls: {
				rejectUnAuthorized: true
			},
		}, {...option}));
	};
	
	return{
		//...
		CreateTransporter,
	};
	
})(ATA());