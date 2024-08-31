const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos
db.usuarios = require("./usuario.model")(sequelize, Sequelize);
db.billeteras = require("./billetera.model")(sequelize, Sequelize);
db.monedas = require("./moneda.model")(sequelize, Sequelize);
db.ventas = require("./venta.model")(sequelize, Sequelize);
db.movimientos = require("./movimiento.model")(sequelize, Sequelize);
db.tarjetas = require("./tarjeta.model")(sequelize, Sequelize);
db.cuentasBanco = require("./cuentaBanco.model")(sequelize, Sequelize);
db.beneficiarios = require("./beneficiario.model")(sequelize, Sequelize);
db.usuarioauths = require("./auth.model")(sequelize, Sequelize);

// Relaciones entre Usuario y otros modelos
db.usuarios.hasMany(db.billeteras, { as: "billeteras", foreignKey: "usuarioId", onDelete: "CASCADE" });
db.billeteras.belongsTo(db.usuarios, { as: "usuario", foreignKey: "usuarioId" });

db.usuarios.hasMany(db.tarjetas, { as: "tarjetas", foreignKey: "usuarioId", onDelete: "CASCADE" });
db.tarjetas.belongsTo(db.usuarios, { as: "usuario", foreignKey: "usuarioId" });

db.usuarios.hasMany(db.cuentasBanco, { as: "cuentasBanco", foreignKey: "usuarioId", onDelete: "CASCADE" });
db.cuentasBanco.belongsTo(db.usuarios, { as: "usuario", foreignKey: "usuarioId" });

db.usuarios.hasMany(db.beneficiarios, { as: "beneficiarios", foreignKey: "usuarioId", onDelete: "CASCADE" });
db.beneficiarios.belongsTo(db.usuarios, { as: "usuario", foreignKey: "usuarioId" });

db.usuarios.hasMany(db.usuarioauths, { as: "auths", foreignKey: "usuario_id", onDelete: "CASCADE" });
db.usuarioauths.belongsTo(db.usuarios, { as: "usuario", foreignKey: "usuario_id" });

// Relaciones entre Billetera y Movimiento
db.billeteras.hasMany(db.movimientos, { as: "movimientos", foreignKey: "billeteraOrigenId", onDelete: "CASCADE" });
db.movimientos.belongsTo(db.billeteras, { as: "billeteraOrigen", foreignKey: "billeteraOrigenId" });

// Relaciones entre Billetera y Venta
db.billeteras.hasMany(db.ventas, { as: "ventasOrigen", foreignKey: "billeteraOrigenId", onDelete: "CASCADE" });
db.ventas.belongsTo(db.billeteras, { as: "billeteraOrigen", foreignKey: "billeteraOrigenId" });

db.billeteras.hasMany(db.ventas, { as: "ventasDestino", foreignKey: "billeteraDestinoId", onDelete: "CASCADE" });
db.ventas.belongsTo(db.billeteras, { as: "billeteraDestino", foreignKey: "billeteraDestinoId" });

// Relaciones entre Moneda y otros modelos
db.monedas.hasMany(db.billeteras, { as: "billeteras", foreignKey: "monedaId", onDelete: "CASCADE" });
db.billeteras.belongsTo(db.monedas, { as: "moneda", foreignKey: "monedaId" });

db.monedas.hasMany(db.ventas, { as: "ventas", foreignKey: "monedaId", onDelete: "CASCADE" });
db.ventas.belongsTo(db.monedas, { as: "moneda", foreignKey: "monedaId" });

module.exports = db;
