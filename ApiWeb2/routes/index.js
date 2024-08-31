module.exports = app => {
    require("./usuario.routes")(app);
    require("./tarjeta.routes")(app);
    require("./beneficiario.routes")(app);
    require("./movimiento.routes")(app);
    require("./venta.routes")(app);
    require("./cuentaBanco.routes")(app);
    require("./moneda.routes")(app);
    require("./billetera.routes")(app);
};
