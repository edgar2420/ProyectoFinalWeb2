module.exports = (sequelize, Sequelize) => {
    const CuentaBanco = sequelize.define("cuentaBanco", {
        nroCuenta: {
            type: Sequelize.STRING,
            unique: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        documento: {
            type: Sequelize.STRING
        },
        banco: {
            type: Sequelize.STRING
        },
        moneda: {
            type: Sequelize.STRING
        },
        usuarioId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'usuarios',
                key: 'id'
            }
        }
    });

    return CuentaBanco;
};
