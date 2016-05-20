module.exports = function(modelo) {
    return {
        agregar:function(req, res){
            modelo.comentario.create({
                idComentario:null,
                idUsuario: req.body.idUsuario,
                idSitioTuristico: req.body.idSitioTuristico,
                comentario: req.body.comentario
            }).then(function(){
                res.json({"mensaje":"Comentario agregado."});
            }).error(function(err){
                res.json({"mensaje":"Error. No se pudo agregar."});
                throw err;
            });
        },
        eliminar:function(req,res){
            modelo.comentario.destroy({
                where: {
                    idComentario: req.params.id
                }
            }).then(function(){
                res.json({"mensaje":"Eliminado."})
            }).error(function(){
                throw err;
            });
        },
        listar:function(req, res){
            modelo.sequelize.query("CALL sp_listarComentarios").then(function(data){
                res.json(data);
            }).error(function(){
                res.json({"mensaje":"No se puede cargar los datos", "status":500});
            });
        },
        editar:function(req,res){
            modelo.comentario.find({
                where: {
                    idComentario: req.params.id
                }
            }).then(function(comentario){
                if(comentario){
                    comentario.updateAttributes({
                        idUsuario: req.body.idUsuario,
                        idSitioTuristico: req.body.idSitioTuristico,
                        comentario: req.body.comentario
                    }).then(function(comentario){
                        res.json({"mensaje":"Se edito correctamente."});
                    });
                }
            }).error(function(err){
                res.json({"mensaje":"No se puede editar"+error,"status":500});
            });
        }
    }
}
