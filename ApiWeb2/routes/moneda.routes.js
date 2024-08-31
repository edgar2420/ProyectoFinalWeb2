const { checkAdminMiddleware } = require("../middlewares/check-admin.middleware.js");
const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");

module.exports = app => {
    const controller = require("../controllers/moneda.controller.js");
    let router = require("express").Router();

    // Rutas que requieren autenticación y permisos de administrador
    router.post("/", checkUserMiddleware, checkAdminMiddleware, controller.createCurrency);
    router.put("/:id", checkUserMiddleware, checkAdminMiddleware, controller.updateCurrency);
    router.delete("/:id", checkUserMiddleware, checkAdminMiddleware, controller.deleteCurrency);

    // Rutas que solo requieren autenticación
    router.get("/", checkUserMiddleware, controller.getAllCurrencies);
    router.get("/:id", checkUserMiddleware, controller.getCurrency);

    app.use('/api/monedas', router);
};
