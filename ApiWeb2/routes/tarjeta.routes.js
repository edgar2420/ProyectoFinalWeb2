const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");

module.exports = app => {
    const controller = require("../controllers/tarjeta.controller.js");
    let router = require("express").Router();
    
    router.post("/", checkUserMiddleware, controller.createCard);
    router.get("/user/:usuarioId", checkUserMiddleware, controller.getUserCards);
    router.get("/:id", checkUserMiddleware, controller.getCard);
    router.put("/:id", checkUserMiddleware, controller.updateCard);
    router.delete("/:id", checkUserMiddleware, controller.deleteCard);

    app.use('/api/tarjetas', router);
};
