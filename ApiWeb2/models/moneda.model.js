module.exports = (sequelize, Sequelize) => {
    const Moneda = sequelize.define("moneda", {
        nombre: {
            type: Sequelize.STRING,
            unique: true
        },
        valorUsd: {
            type: Sequelize.FLOAT
        }
    });

    Moneda.associate = (models) => {
        Moneda.hasMany(models.Billetera, { foreignKey: 'moneda' });
        Moneda.hasMany(models.Venta, { foreignKey: 'moneda' });
    };

    return Moneda;
};
