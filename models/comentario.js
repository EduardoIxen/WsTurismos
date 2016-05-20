module.exports = function(sequelize, DataTypes) {
    return sequelize.define('comentario', {
        idComentario:{
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'usuario',
                key: 'idUsuario'
            }
        },
        idSitioTuristico: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'sitioturistico',
                key: 'idSitioTuristico'
            }
        },
        comentario: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'comentario',
        timestamps:false
    });
};
