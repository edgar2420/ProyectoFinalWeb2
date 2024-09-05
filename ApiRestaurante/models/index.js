const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar los modelos
db.Usuario = require("./usuario.model")(sequelize, Sequelize);
db.Review = require("./review.model")(sequelize, Sequelize);
db.Restaurante = require("./restaurante.model")(sequelize, Sequelize);
db.Hamburguesa = require("./hamburguesa.model")(sequelize, Sequelize);

// Definir las relaciones

// Relación Usuario - Review (Un usuario puede tener muchas reviews)
db.Usuario.hasMany(db.Review, {
    foreignKey: 'usuarioId',
    as: 'reviews'
});
db.Review.belongsTo(db.Usuario, {
    foreignKey: 'usuarioId',
    as: 'usuario'
});

// Relación Restaurante - Hamburguesa (Un restaurante puede tener muchas hamburguesas)
db.Restaurante.hasMany(db.Hamburguesa, {
    foreignKey: 'restauranteId',
    as: 'hamburguesas'
});
db.Hamburguesa.belongsTo(db.Restaurante, {
    foreignKey: 'restauranteId',
    as: 'restaurante'
});

// Relación Hamburguesa - Review (Una hamburguesa puede tener muchas reviews)
db.Hamburguesa.hasMany(db.Review, {
    foreignKey: 'hamburguesaId',
    as: 'reviews'
});
db.Review.belongsTo(db.Hamburguesa, {
    foreignKey: 'hamburguesaId',
    as: 'hamburguesa'
});

module.exports = db;
