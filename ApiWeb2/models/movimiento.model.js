module.exports = (sequelize, Sequelize) => {
    const Movimiento = sequelize.define("movimiento", {
        descripcion: {
            type: Sequelize.STRING
        },
        montoMoneda: {
            type: Sequelize.FLOAT
        },
        tipo: {
            type: Sequelize.STRING
        },
        movReferencia: {
            type: Sequelize.INTEGER,
            references: {
                model: 'movimientos',
                key: 'id'
            }
        },
        billeteraOrigenId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'billeteras',
                key: 'id'
            }
        }
    });

    return Movimiento;
};
