module.exports=((ATA)=>{
	
	
	
	const Shuffle = (arr)=>{
		const length = [...arr].length;
		const order = Array.from({length}).map((x,i)=>{return i}).sort(()=>{return(Math.random() > 0.5 ? 1 : -1)});
		const keys = ["a", "b"];
		for(let i=0;i<5;i++){
			for(let j=0;j<keys.length;j++){
				for(let k=1;k<(length - 1);k++){
					const prev_o = order[k - 1];
					const curr_o = order[k];
					const next_o = order[k + 1];
					const prev = arr[prev_o];
					const curr = arr[curr_o];
					const next = arr[next_o];
					
					if(prev[keys[j]] === curr[keys[j]]){
						order[k - 1] = curr_o;
						order[k] = next_o;
						order[k + 1] = prev_o;
					}else if(next[keys[j]] === curr[keys[j]]){
						order[k - 1] = next_o;
						order[k] = prev_o;
						order[k + 1] = curr_o;
					}
				}
			}
		}
		
		console.log({order});
		
		return order.map((index)=>{
			return arr[index];
		});
	};
	
	
	
	return{
		//...
		Shuffle,
		
	}
})(ATA());