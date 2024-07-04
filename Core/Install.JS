((ATA)=>{
	const RL = ATA.Require("node:readline");
	
	const no_regex = /^(((H|h)+(a)*(y)*(ı)*(r)*)|((N|n)+(o)*))$/i;
	const ye_regex = /^(((E|e)+(v)*(e)*(t)*)|((Y|y)+(e)*(s)*))$/i;
	
	let rl = null;
	
	const Question = async(msg="")=>{
		const answer = await new Promise((resolve, reject)=>{
			rl.question(msg + " Devam edilsin mi? [E/H]", (answer)=>{
				resolve(answer);
			});
		});
		console.log("");
		if(ye_regex.test(answer))return true;
		else if(no_regex.test(answer))return false;
		return 2;
	};
	
	ATA.Setups.push(()=>{
		rl = RL.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		setTimeout(()=>{
			Setup(rl);
		}, 5000);
	});
	
	const Setup = async(rl)=>{
		await Question_PostgreSQL();
		await Question_SQLite();
	};
	
	//
	
	const Question_PostgreSQL = async()=>{
		const ID = ANA.Configurations.GetAdminUUID();
		try{
			const isCheck = await ANA.DBMS.PostgreSQL.GetModel("User").ReadByID(ID);
			if(isCheck)console.error("\n\n\n ==> PostgreSQL Yapılanması Bulundu!!!\n ==> Devam ederseniz veri kaybı yaşayabilirsiniz!!! \n\n\n");
		}catch(e){
			
		}
		const answer = await Question("PostgreSQL modelleri kurulacak. ");
		if(answer){
			await ANA.DBMS.PostgreSQL.Connection.sync({
				force: true,
				alter: true
			});
			ATA.Require("./Core/Install/User.Register.js");
		}
	};
	
	const Question_SQLite = async()=>{
		const answer = await Question("SQLite modelleri kurulacak. ");
		if(answer){
			await ANA.DBMS.SQLite.Connection.sync({
				force: true,
				alter: true
			});
		}
	};
	
	
})(ATA());