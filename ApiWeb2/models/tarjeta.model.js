module.exports = (sequelize, Sequelize) => {
    const Tarjeta = sequelize.define("tarjeta", {
        nombre: {
            type: Sequelize.STRING
        },
        numero: {
            type: Sequelize.STRING,
            unique: true
        },
        cvv: {
            type: Sequelize.STRING
        },
        fechaVenc: {
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

    return Tarjeta;
};
