module.exports = function(modelo) {
    return {
        agregar:function(req, res){
            modelo.departamento.create({
                idDepartmento:null,
                nombre: req.body.nombre
            }).then(function(){
                    res.json({"mensaje":"Agregado correctamente."});
            }).error(function(err){
                    res.json({"mensaje":"Error. No se agrego."});
                throw err;
            });
        },
        eliminar:function(req,res){
            modelo.departamento.destroy({
                where: {
                    idDepartamento: req.params.id
                }
            }).then(function(){
                res.json({"mensaje":"Eliminado."})
            }).error(function(){
                throw err;
            });
        },
        listar:function(req, res){
            modelo.departamento.findAll().then(function(data){
               res.json(data);
            }).error(function(){
               res.json({"mensaje":"No se puede cargar los datos", "status":500});
            });
        },
        editar:function(req,res){
             modelo.departamento.find({
                 where: {
                     idDepartamento: req.params.id
                 }
             }).then(function(departamento){
                if(departamento){
                    departamento.updateAttributes({
                        nombre: req.body.nombre,
                    }).then(function(departamento){
                        res.json({"mensaje":"Se modifico "+departamento.nombre+" ."});
                    });
                }
             }).error(function(err){
                    res.json({"mensaje":"No se puede editar "+error,"status":500});
             });
        }
    }
}