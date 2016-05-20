module.exports = function(sequelize, DataTypes) {
    return sequelize.define('municipio', {
        idMunicipio: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
		idDepartamento: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'departamento',
                key: 'idDepartamento'
            }
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'municipio',
        timestamps:false
    });
};
