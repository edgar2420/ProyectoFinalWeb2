module.exports = (sequelize, DataTypes) => {
    const Evolucion = sequelize.define('evolucion', {
        pokemonId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pokemons',
                key: 'id'
            }
        },
        idEvPrevia: DataTypes.INTEGER,
        idEvSiguiente: DataTypes.INTEGER,
        nivelEvolucion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imagen_url: DataTypes.STRING
    });

    Evolucion.associate = (models) => {
        Evolucion.belongsTo(models.pokemon, { foreignKey: 'pokemonId', as: 'pokemon' });
    };

    return Evolucion;
};
