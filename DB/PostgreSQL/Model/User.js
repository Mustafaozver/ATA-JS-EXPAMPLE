module.exports=((ATA)=>{
	
	const Setup = (conn, DataTypes, Op, Model)=>{
		const User = class extends Model {};
		User.Init(User, conn, columns);
	};
	
	const Associate = (Models)=>{
		//...
	};
	
	return{
		Setup,
		Associate,
	};
})(ATA());