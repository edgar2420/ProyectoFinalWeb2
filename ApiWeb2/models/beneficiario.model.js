module.exports = (sequelize, Sequelize) => {
    const Beneficiario = sequelize.define("beneficiario", {
        nombreReferencia: {
            type: Sequelize.STRING
        },
        nroCuenta: {
            type: Sequelize.STRING,
            unique: true
        },
        usuarioId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'usuarios',
                key: 'id'
            }
        }
    });

    return Beneficiario;
};
