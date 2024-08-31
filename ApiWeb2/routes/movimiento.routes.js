const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");

module.exports = app => {
    const controller = require("../controllers/movimiento.controller.js");
    let router = require("express").Router();
    
    router.post("/", checkUserMiddleware, controller.createMovement);
    router.get("/wallet/:billeteraId", checkUserMiddleware, controller.getWalletMovements);
    router.get("/:id", checkUserMiddleware, controller.getMovement);
    router.put("/:id", checkUserMiddleware, controller.updateMovement);
    router.delete("/:id", checkUserMiddleware, controller.deleteMovement);

    app.use('/api/movimientos', router);
};
