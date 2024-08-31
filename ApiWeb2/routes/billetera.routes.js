const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");

module.exports = app => {
    const controller = require("../controllers/billetera.controller.js");
    let router = require("express").Router();

    router.post("/", checkUserMiddleware, controller.createWallet);
    router.get("/user/:usuarioId", checkUserMiddleware, controller.getUserWallets);
    router.get("/:id", checkUserMiddleware, controller.getWallet);
    router.put("/:id", checkUserMiddleware, controller.updateWallet);
    router.delete("/:id", checkUserMiddleware, controller.deleteWallet);

    app.use('/api/billeteras', router);
};
