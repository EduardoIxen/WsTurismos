module.exports = function(modelo) {
    return {
        agregar:function(req, res){
            modelo.sitioturistico.create({
                idSitioTuristico:null,
				idMunicipio: req.body.idMunicipio,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion
            }).then(function(){
                res.json({"mensaje":"Agregado correctamente."});
            }).error(function(err){
                res.json({"mensaje":"Error, No se guardo los datos"});
                throw err;
            });
        },
        eliminar:function(req,res){
            modelo.sitioturistico.destroy({
                where: {
                    idSitioTuristico: req.params.id
                }
            }).then(function(){
                res.json({"mensaje":"Eliminado."})
            }).error(function(){
                throw err;
            });
        },
        listar:function(req, res){
            modelo.sequelize.query("CALL sp_listarSitioTuristico").then(function(data){
                res.json(data);
            }).error(function(){
                res.json({"mensaje":"No se cargo los datos", "status":500});
            });
        },
        editar:function(req,res){
            modelo.sitioturistico.find({
                where: {
                    idSitioTuristico: req.params.id
                }
            }).then(function(sitioturistico){
                if(sitioturistico){
                    sitioturistico.updateAttributes({
                        idMunicipio: req.body.idMunicipio,
						nombre: req.body.nombre,
                        descripcion: req.body.descripcion,
                    }).then(function(sitioturistico){
                        res.json({"mensaje":"Se modifico "+sitioturistico.nombre+" con éxito."});
                    });
                }
            }).error(function(err){
                res.json({"mensaje":"Error. No se puede editar "+error,"status":500});
            });
        }
    }
}