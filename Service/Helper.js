module.exports=((ATA)=>{
	
	const Shuffle = (arr)=>{
		const length = [...arr].length;
		const order = Array.from({length}).map((x,i)=>{return i}).sort(()=>{return(Math.random() > 0.5 ? 1 : -1)});
		const keys = ["Il", "DD"];
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
		
		return order.map((index)=>{
			return arr[index];
		});
	};
	
	const BuildGroup = (arr, n=20)=>{
		const length = Math.floor(arr.length / n) + 1;
		
		return Array.from({length}).map((i,index)=>{
			return arr.slice(index * n, (index + 1) * n);
		});
		
	};
	
	
	const Match = class{
		LSide = null;
		RSide = null;
		constructor(l, r){
			this.LSide = l;
			this.RSide = r;
			//this.ID = "-";
		};
		Save(){
			console.log("MATCH (" + this.ID + ") => ", this.LSide.Save(), this.RSide.Save());
			//console.log("M" + this.ID + " --> M" + this.LSide.Save());
			//console.log("M" + this.ID + " --> M" + this.RSide.Save());
			return this.ID;
		};
	};
	
	const Member = class{
		FirstName = "";
		LastName = "";
		ID = 0;
		constructor({ ID, FirstName, LastName }){
			this.ID = ID;
			this.FirstName = FirstName;
			this.LastName = LastName;
		};
		Save(){
			return this.ID;
		};
	};
	
	const BuildTable = (obj, Pair, Member, n=0)=>{
		if(obj instanceof Array && obj.length === 1)return new Member(obj[0], n + 1);
		if(obj instanceof Array && obj.length === 2)return new Pair(
			BuildTable(obj[0], Pair, Member, n + 1),
			BuildTable(obj[1], Pair, Member, n + 1),
			n + 1
		);
		if(obj instanceof Array && obj.length > 2)return new Pair(
			BuildTable(obj.slice(0, obj.length / 2), Pair, Member, n + 1),
			BuildTable(obj.slice(obj.length / 2, obj.length), Pair, Member, n + 1),
			n + 1
		);
		return new Member(obj, n + 1);
	};
	
	const FixTure = (arr, Pair=Match)=>{
		const length = arr.length;
		const level = Math.floor(Math.log(length) / Math.log(2));
		const over = length - Math.pow(2, level);
		
		const hLevelMembers = Math.pow(2, level);
		
		const hMembers = hLevelMembers - over;
		const lMembers = over;
		
		
		const Larr = [];
		const Rarr = [];
		
		let index = 0;
		
		for(let i=0;i<lMembers;i++){
			const item = [
				arr[index],
				arr[index + 1],
			];
			if(i % 2 === 0)Larr.push(item);
			else Rarr.push(item);
			index+=2;
		}
		
		for(let i=0;i<hMembers;i++){
			const item = arr[index];
			if(i % 2 === 0)Larr.push(item);
			else Rarr.push(item);
			index++;
		}
		
		/*
		for(let i=0;i<lMembers;i++){
			const item = new Match(arr[index], arr[index + 1]);
			if(i % 2 === 0)Larr.push(item);
			else Rarr.push(item);
			index+=2;
		}
		
		for(let i=0;i<hMembers;i++){
			const item = new Member(arr[index]);
			if(i % 2 === 0)Larr.push(item);
			else Rarr.push(item);
			index++;
		}
		*/
		
		const arr_ = [...Larr, ...Rarr];
		
		return BuildTable(arr_, Pair, Member);
	};
	
	return{
		//...
		Shuffle,
		BuildGroup,
		FixTure,
	}
})(ATA());