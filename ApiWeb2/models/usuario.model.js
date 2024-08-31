module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        nombre: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        esAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    });

    Usuario.associate = (models) => {
        Usuario.hasMany(models.Billetera, { foreignKey: 'usuario' });
        Usuario.hasMany(models.Tarjeta, { foreignKey: 'usuario' });
        Usuario.hasMany(models.CuentaBanco, { foreignKey: 'usuario' });
        Usuario.hasMany(models.Beneficiario, { foreignKey: 'usuario' });
    };

    return Usuario;
};

