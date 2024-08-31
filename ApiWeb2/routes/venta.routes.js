const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");

module.exports = app => {
    const controller = require("../controllers/venta.controller.js");
    let router = require("express").Router();
    
    router.post("/", checkUserMiddleware, controller.createSale);
    router.get("/", checkUserMiddleware, controller.getAllSales);
    router.get("/:id", checkUserMiddleware, controller.getSale);
    router.put("/:id", checkUserMiddleware, controller.updateSale);
    router.delete("/:id", checkUserMiddleware, controller.deleteSale);

    app.use('/api/ventas', router);
};
