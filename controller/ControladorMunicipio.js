module.exports = function(modelo) {
    return {
        agregar:function(req, res){
            modelo.municipio.create({
                idMunicipio:null,
                idDepartamento: req.body.idDepartamento,
                nombre: req.body.nombre
            }).then(function(){
                res.json({"mensaje":"Agregado correctamente."});
            }).error(function(err){
                res.json({"mensaje":"Error. No se pudo agregar."});
                throw err;
            });
        },
        eliminar:function(req,res){
            modelo.municipio.destroy({
                where: {
                    idMunicipio: req.params.id
                }
            }).then(function(){
                res.json({"mensaje":"Eliminado."})
            }).error(function(){
                throw err;
            });
        },
        listar:function(req, res){
            modelo.sequelize.query("CALL sp_listarMunicipio").then(function(data){
                res.json(data);
            }).error(function(){
                res.json({"mensaje":"No se puede cargar los datos ", "status":500});
            });
        },
        editar:function(req,res){
            modelo.municipio.find({
                where: {
                    idMunicipio: req.params.id
                }
            }).then(function(municipio){
                if(municipio){
                    municipio.updateAttributes({
                        idDepartamento: req.body.idDepartamento,
						nombre: req.body.nombre,
                    }).then(function(municipio){
                        res.json({"mensaje":"Se modifico "+municipio.nombre+" con éxito."});
                    });
                }
            }).error(function(err){
                res.json({"mensaje":"No se pudo editar "+error,"status":500});
            });
        }
    }
}