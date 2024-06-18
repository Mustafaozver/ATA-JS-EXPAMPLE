module.exports=((ATA)=>{
	const Ejs = ATA.Require("ejs");
	const Sass = ATA.Require("sass");
	const Terser = ATA.Require("terser");
	const Typescript = ATA.Require("typescript");
	
	const GetParamsGlobal = (data)=>{
		return{
			ATA,
			...data
		};
	};
	
	const GetParamsTS = (data)=>{
		return{
			...data
		};
	};
	
	const GetParamsSASS = (data)=>{
		return{
			...data
		};
	};
	
	const CompileEJS = async(content, data)=>{
		try{
			content = Ejs.render(content, GetParamsGlobal(data));
		}catch(e){
			Logger.error("EJS Render Error");
			console.log(" => ", e);
		}
		return content;
	};
	
	const CompileTS = async(content)=>{
		const _pTS = !true;
		const _pTR = !true;
		
		const typescript_options = {
			compilerOptions: {
				// tsconfig.json content
				esModuleInterop: false,
				sourceMap: true,
				inlineSources: true,
			}
		};
		
		const terser_options = {
			sourceMap: true,
			//toplevel: true,
		};
		
		if(_pTS){
			try{
				content = Typescript.transpileModule(content, typescript_options).outputText; // typescript
			}catch(e){
				Logger.error("TypeScript Transpile Error");
				console.log(" => ", e);
			}
		}
		
		if(_pTR){
			try{
				const terserobj = await Terser.minify(content, terser_options);
				content = terserobj.code; // terser minify
			}catch(e){
				Logger.error("Terser Minify Error");
				console.log(" => ", e);
			}
		}
		
		return content;
	};
	
	const CompileSASS = async(content)=>{
		const _pSASS = true;
		
		const sass_options = {
			outputStyle: "compressed",
			data: ""
		};
		
		if(_pSASS){
			try{
				const sassobj = Sass.renderSync(Object.assign(sass_options, {
					data: content,
				}));
				content = sassobj.css;
			}catch(e){
				Logger.error("SASS Render Error");
				console.log(" => ", e);
			}
		}
		
		return content;
	};
	
	const CompileEJS_TS = async(content, data)=>{
		content = await CompileEJS(content, GetParamsTS(data));
		content = await CompileTS(content);
		return content;
	};
	
	const CompileEJS_SASS = async(content, data)=>{
		content = await CompileEJS(content, GetParamsSASS(data));
		content = await CompileSASS(content);
		return content;
	};
	
	const CompileEJSFile = async(filepath, data)=>{
		const promise = new Promise((resolve, reject)=>{
			Ejs.renderFile(filepath, data, {}, (err, str)=>{
				if(err)return reject(err);
				resolve(str);
			});
		});
		return await promise;
	};
	
	const CompileTSFile = async(filepath, data)=>{
		let content = await CompileEJSFile(filepath, GetParamsTS(data));
		content = await CompileTS(content);
		return content;
	};
	
	const CompileSASSFile = async(filepath, data)=>{
		let content = await CompileEJSFile(filepath, GetParamsSASS(data));
		content = await CompileSASS(content);
		return content;
	};
	
	return{
		CompileEJS,
		
		CompileTS,
		CompileSASS,
		
		CompileEJS_TS,
		CompileEJS_SASS,
		
		CompileEJSFile,
		CompileTSFile,
		CompileSASSFile,
		
		//
	};
})(ATA());