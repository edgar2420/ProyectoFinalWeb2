module.exports = (sequelize, Sequelize) => {
    const Venta = sequelize.define("venta", {
        monedaId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'monedas',
                key: 'id'
            }
        },
        valorVenta: {
            type: Sequelize.FLOAT
        },
        montoEnMoneda: {
            type: Sequelize.FLOAT
        },
        billeteraOrigenId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'billeteras',
                key: 'id'
            }
        },
        billeteraDestinoId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'billeteras',
                key: 'id'
            }
        },
        metodoPago: {
            type: Sequelize.STRING
        },
        estado: {
            type: Sequelize.STRING,
            defaultValue: 'Pend'
        }
    });

    return Venta;
};

