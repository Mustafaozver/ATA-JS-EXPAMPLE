((ATA)=>{
	const RL = ATA.Require("node:readline");
	
	const Question_PostgreSQL = async(rl)=>{
		const promise = new Promise((resolve, reject)=>{
			rl.question("PostgreSQL kurulacak.", (answer)=>{
				Logger.warn("fgjghk");
				resolve(answer);
			});
		});
		return await promise;
	};
	
	const Setup = async(rl)=>{
		await Question_PostgreSQL(rl);
		await Question_PostgreSQL(rl);
	};
	
	ATA.Setups.push(()=>{
		const rl = RL.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		setTimeout(()=>{
			Setup(rl);
		}, 5000);
	});
})(ATA());