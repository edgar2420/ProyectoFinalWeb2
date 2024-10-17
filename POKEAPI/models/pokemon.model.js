module.exports = (sequelize, Sequelize) => {
    const Pokemon = sequelize.define("pokemon", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nroPokedex: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING
        },
        hp: {
            type: Sequelize.INTEGER
        },
        attack: {
            type: Sequelize.INTEGER
        },
        defense: {
            type: Sequelize.INTEGER
        },
        spattack: {
            type: Sequelize.INTEGER
        },
        spdefense: {
            type: Sequelize.INTEGER
        },
        speed: {
            type: Sequelize.INTEGER
        },
        nivelEvolucion: {
            type: Sequelize.INTEGER
        },
        imagen_url: {
            type: Sequelize.STRING
        }
    });

    Pokemon.associate = (models) => {
        Pokemon.belongsToMany(models.Tipo, { through: 'Pokemon_Tipos', foreignKey: 'pokemonId', as: 'tipos' });
        Pokemon.belongsToMany(models.Habilidad, { through: 'Pokemon_Habilidades', foreignKey: 'pokemonId', as: 'habilidades' });
        Pokemon.hasMany(models.Evolucion, { as: 'evoluciones', foreignKey: 'pokemonId' });
    };

    return Pokemon;
};
