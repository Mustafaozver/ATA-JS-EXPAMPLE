((ATA) => {
	const { CreateTransporter } = ANA.Library.Mail;
	const { CompileEJSFile } = ANA.Library.Render;
	const { C } = ANA.Library.i18n;
	let Transporter = null;
	
	const config = ANA.Configurations.GetConstant("Mail");
	const Environment = ANA.Configurations.GetConstant("Environment");
	
	const GenerateMailConfig = (option)=>{
		return Object.assign({
			from: config.MAIL,
			to: "",
			subject: "Deneme",
			html: "",
		}, {...option});
	};
	
	const Send = async(to, subject, html)=>{
		const mail = GenerateMailConfig({
			to,
			subject,
			html
		});
		const promise = new Promise((resolve, reject)=>{
			Transporter.sendMail(mail, (err, info)=>{
				if(err)return reject(err);
				resolve(info.response);
			});
		});
		return await promise;
	};
	
	const SendEJS = async(to, subject, filepath, render_data)=>{
		const promise = new Promise((resolve, reject)=>{
			CompileEJSFile(filepath, {
				C,
				ATA,
				Environment,
				...render_data,
			}).then((data)=>{
				Send(to, subject, data).then((data)=>{
					resolve(data);
				}).catch((err)=>{
					reject(err);
				});
			}).catch((err)=>{
				reject(err);
			});
		});
		return await promise;
	};
	
	ATA.Setups.push(()=>{
		Transporter = CreateTransporter({
			auth: {
				user: config.USER,
				pass: config.PASS,
			},
		});
	});
	
	ATA.Mail = {
		Send,
		SendEJS,
	};
})(ATA());