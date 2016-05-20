var ruta=require('express').Router();
module.exports=(function(modelo){
    var usuario=require('../controller/ControladorUsuario.js')(modelo);
	var comentario = require('../controller/ControladorComentario.js')(modelo);
    var municipio = require('../controller/ControladorMunicipio.js')(modelo);
	var sitioturistico = require('../controller/ControladorSitioTuristico.js')(modelo);
    var hotel = require('../controller/ControladorHotel.js')(modelo);
	var departamento = require('../controller/ControladorDepartamento.js')(modelo);
    

    ruta.get('/',function(peticion,respuesta){
        respuesta.send("Servicio iniciado");
    });

    /*Rutas para Usuarios*/
    ruta.post('/usuario/registro',usuario.registro);
    ruta.post('/usuario/login',usuario.login);
    ruta.get('/token', usuario.tokenGenerator);

	
	/*Rutas para Comentarios*/
    ruta.get('/comentario/listar', comentario.listar);
    ruta.post('/comentario', comentario.agregar);
    ruta.put('/comentario/:id', comentario.editar);
    ruta.delete('/comentario/:id', comentario.eliminar);


    /*Rutas para Municipios*/
    ruta.get('/municipio/listar', municipio.listar);
    ruta.post('/municipio', municipio.agregar);
    ruta.put('/municipio/:id', municipio.editar);
    ruta.delete('/municipio/:id', municipio.eliminar);	
	
	
	/*Rutas para Sitios Turisticos*/
    ruta.get('/sitioturistico/listar', sitioturistico.listar);
    ruta.post('/sitioturistico', sitioturistico.agregar);
    ruta.put('/sitioturistico/:id', sitioturistico.editar);
    ruta.delete('/sitioturistico/:id', sitioturistico.eliminar);
    
	
	/*Rutas para Hoteles*/
    ruta.get('/hotel/listar', hotel.listar);
    ruta.post('/hotel', hotel.agregar);
    ruta.put('/hotel/:id', hotel.editar);
    ruta.delete('/hotel/:id', hotel.eliminar);	
	
	
    /*Rutas para Departamentos*/
    ruta.get('/departamento/listar', departamento.listar);
    ruta.post('/departamento', departamento.agregar);
    ruta.put('/departamento/:id', departamento.editar);
    ruta.delete('/departamento/:id', departamento.eliminar);


	ruta.use(usuario.tokenMiddleware);
    ruta.get('/usuario/listar',usuario.listar);
	
	
    return ruta;
});