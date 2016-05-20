module.exports = function(modelo) {
    return {
        agregar:function(req, res){
            modelo.hotel.create({
                idHotel:null,
				idMunicipio: req.body.idMunicipio,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precioNoche: req.body.precioNoche
            }).then(function(){
                res.json({"mensaje":"Agregado correctamente."});
            }).error(function(err){
                res.json({"mensaje":"Error. No se agrego."});
                throw err;
            });
        },
        eliminar:function(req,res){
            modelo.hotel.destroy({
                where: {
                    idHotel: req.params.id
                }
            }).then(function(){
                res.json({"mensaje":"Eliminado."})
            }).error(function(){
                throw err;
            });
        },
        listar:function(req, res){
            modelo.sequelize.query("CALL sp_listarHoteles").then(function(data){
                res.json(data);
            }).error(function(){
                res.json({"mensaje":"No se puede cargar los datos", "status":500});
            });
        },
        editar:function(req,res){
            modelo.hotel.find({
                where: {
                    idHotel: req.params.id
                }
            }).then(function(hotel){
                if(hotel){
                    hotel.updateAttributes({
						idMunicipio: req.body.idMunicipio,
                        nombre: req.body.nombre,
                        descripcion: req.body.descripcion,
                        precioNoche: req.body.precioNoche,
                    }).then(function(hotel){
                        res.json({"mensaje":"Se modifico "+hotel.nombre+"."});
                    });
                }
            }).error(function(err){
                res.json({"mensaje":"No se puede editar "+error,"status":500});
            });
        }
    }
}