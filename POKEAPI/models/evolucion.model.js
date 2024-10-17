module.exports = (sequelize, Sequelize) => {
    const Evolucion = sequelize.define("evolucion", {
        idEvPrevia: {
            type: Sequelize.INTEGER
        },
        idEvSiguiente: {
            type: Sequelize.INTEGER
        },
        nivelEvolucion: {
            type: Sequelize.INTEGER
        },
        imagen_url: {
            type: Sequelize.STRING,
        }
    });

    Evolucion.associate = (models) => {
        Evolucion.belongsTo(models.Pokemon, { as: 'pokemon', foreignKey: 'pokemonId' });
    };

    return Evolucion;
};
