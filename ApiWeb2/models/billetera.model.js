module.exports = (sequelize, Sequelize) => {
    const Billetera = sequelize.define("billetera", {
        usuarioId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'usuarios',
                key: 'id'
            }
        },
        monedaId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'monedas',
                key: 'id'
            }
        },
        saldo: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        codigo: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            unique: true
        }
    });

    return Billetera;
};
