//INFO: libreria para probar Y controlar paginas

GLOBAL= this;

if (!GLOBAL.srv_data_save) { //A: estamos en la consola del browser
	srv_data_save= function srv_data_save(d) { console.log("DATA_SAVE CONSOLE",d); }
}

var CfgScrollPagesMax= 10; //U: cuantas veces tratamos de bajar hasta decidir que llegamos al final
var CfgEsperaBajar= 2000; //U: cuanto esperamos que cargue el scroll

goToUrl= function goToUrl(url,env) {
	if (window.location.href==url) { return true; }
	else { window.location.href=url }
}

findXPath= function findXPath(expr,env) {
	var btn= document.evaluate(expr, document, null, XPathResult.ANY_TYPE, null );
	return btn.iterateNext();
}

clickXPath= function clickXPath(expr,env) {
	if (b = findXPath(expr,env)) { b.click(); return true; }
}

click_con_selector= function click_con_selector(selector){ //XXX: El e asumimos global, hacer explicito
    var btn_expandir= e.querySelectorAll(selector);
    console.log("Click con selector", selector, btn_expandir);
    try {
    for (var j= 0; j< btn_expandir.length; j++) {btn_expandir[j].click()}; 
    } catch (ex) { console.error("Click con selector", selector, ex, btn_expandir,j) }
    return(true);
}

ir_arriba= function ir_arriba(sts) { //U: sube, y baja de apaginas mientras procesarPagina devuelva true
	sts.quedanIntentosCnt= CfgScrollPagesMax; //DFLT
	window.scroll(0,0); 
	return true;
}

leerYbajar= function leerYbajar(procesarPagina,sts) { //U: una pagina
	if (sts.quedanIntentosCnt>0) { sts.quedanIntentosCnt--;
		console.log("de_arriba_hasta_el_final intento, quedan",sts.quedanIntentosCnt);
		var r= procesarPagina(sts.quedanIntentosCnt,sts)
		if (r) { sts.quedanIntentosCnt= CfgScrollPagesMax; }
		console.log("de_arriba_hasta_el_final intento r, quedan",r,sts.quedanIntentosCnt);
		window.scrollByPages(1); 
		return false; //A: no terminamos
	}
	else { //A: no aparecen nuevos, damos por terminado
		console.log("de_arriba_hasta_el_final FIN");
		procesarPagina(-1,sts);	
		return true; //A: terminamos
	}
};

//-----------------------------------------------
//S: una interfase fluida para escribir Y probar facil aunque sean asinc

Nav= { STEPS: [], isRecording: true };

Nav.set_recording= function (v) { this.isRecording= v; return this; }
Nav.on_cmd_= function (funYargs, forceExec) { //U: guarda O ejecuta un paso
	this.sts= this.sts || this.run_start();
	if (!forceExec && this.isRecording) { this.STEPS.push(funYargs); return this; }
	else { try {
		if (funYargs[0]=="call") { funYargs.shift(); }
		var f= GLOBAL[funYargs[0]];
		if (typeof(f) != "function") { console.error("CONTENT_LIB no hay funcion",funYargs[0]); }
		var args= funYargs.slice(1).concat([this.sts]);
		return f.apply(this,args);
	} catch (ex) { console.error("CONTENT_LIB error",this.sts,f,args,ex) } }
}

Nav.run_start= function () { return (this.sts= {ip: 0, done: false }); }
Nav.run_step= function run(sts) { 
	this.sts= sts || this.sts || this.run_start(); //A: tenemos sts ok
	if (this.sts.ip < this.STEPS.length) { 
		var step= this.STEPS[this.sts.ip];
		console.log("RUN STEP",this.sts, step);
		if (this.on_cmd_(step,1)) { this.sts.ip++ }; 
	}	
	else { 
		console.log("RUN DONE",this.sts);
		this.sts.done= true; 
	}
	return this.sts;
}

Nav.call= function (...funYargs) { return this.on_cmd_( ["call"].concat(funYargs) ); }
"ir_arriba".split(" ").map( k => { 
	Nav[k]= function () { return this.on_cmd_([k]); } 
}); 
//A: las de ningun argumento
"goToUrl clickXPath findXPath click_con_selector".split(" ").map( k => {
  Nav[k]= function (url) { return this.on_cmd_([k,url]); }
})
//A: las de un argumento

//============================================================

