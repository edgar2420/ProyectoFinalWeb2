const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");
const controller = require("../controllers/cuentaBanco.controller.js"); // Asegúrate de que el nombre del archivo sea correcto
const express = require("express");
const router = express.Router();

router.post("/", checkUserMiddleware, controller.createBankAccount);
router.get("/user/:usuarioId", checkUserMiddleware, controller.getUserBankAccounts);
router.get("/:id", checkUserMiddleware, controller.getBankAccount);
router.put("/:id", checkUserMiddleware, controller.updateBankAccount);
router.delete("/:id", checkUserMiddleware, controller.deleteBankAccount);

module.exports = app => {
    app.use('/api/cuentasbanco', router);
};
