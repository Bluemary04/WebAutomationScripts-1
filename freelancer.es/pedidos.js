// Nav.set_recording(false); //ejecutar en el momento mientras desarrollo

Nav.gotoUrl('https://www.freelancer.es/jobs/php_html_javascript_css/?hourly=true&hourly_min=11.388940000000002&languages=en,es');

/* A mano
	Con inspect encontre que CADA pedido tiene class 'JobSearchCard-item-inner'
  pedidos= document.querySelectorAll(".JobSearchCard-item-inner"); //A: consigo visibles
	i=0; unPedido= pedidos[i]; //A; me "imagino" que voy a usar un forEach

	asumiendo que tengo UN PEDIDO, ahora voy a conseguir los datos, voy probando con inspect ...
*/

function datosUnPedido(unPedido) {
	datosPedido= {};
	datosPedido.precio= unPedido.querySelector(".JobSearchCard-secondary-price").innerText; 
	datosPedido.oferentes= unPedido.querySelector(".JobSearchCard-secondary-entry").innerText;
	datosPedido.quedanDias= unPedido.querySelector(".JobSearchCard-primary-heading-days").innerText;

	datosPedido.link= unPedido.querySelector(".JobSearchCard-primary-heading-link").href;
	datosPedido.titulo= unPedido.querySelector(".JobSearchCard-primary-heading-link").innerText;
	datosPedido.bajada= unPedido.querySelector(".JobSearchCard-primary-description").innerText;
	datosPedido.tags= tags= [];
	tags_els= unPedido.querySelectorAll(".JobSearchCard-primary-tagsLink");
	tags_els.forEach( el => tags.push(el.innerText) );
	
	return datosPedido;
}

//Escribo esta que procesa todos como me había imaginado
function procesarPedidosUnaPagina() {
	pedidos= document.querySelectorAll(".JobSearchCard-item-inner"); //A: consigo visibles
	pedidos.forEach(p => srv_data_save(datosUnPedido(p)))
}
//Si la ejecuto en la consola me trae todos los de esta pagina como esperaba
//procesarPedidosPagina()

//Ahora le agrego que avance de a paginas, use inspect y un atributo claro
function procesarTodasLasPaginas(estado) {
	num_pag= document.querySelector(".is-active").innerText;
	if (num_pag == estado.pagina_procesada) { return true; } //A: termine
	estado.pagina_procesada= num_pag;
	//A: tengo que procesar esta
	procesarPedidosUnaPagina();
	btn_next= document.querySelector("[data-link=next_page]");
	btn_next.click();
	return false; //A: que me llamen de nuevo
}

Nav.call("procesarTodasLasPaginas");


