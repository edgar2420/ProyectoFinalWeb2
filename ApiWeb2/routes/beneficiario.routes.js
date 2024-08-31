const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");
const controller = require("../controllers/beneficiario.controller.js");
const express = require("express");
const router = express.Router();

router.post("/", checkUserMiddleware, controller.createBeneficiary);
router.get("/user/:usuarioId", checkUserMiddleware, controller.getUserBeneficiaries);
router.get("/:id", checkUserMiddleware, controller.getBeneficiary);
router.put("/:id", checkUserMiddleware, controller.updateBeneficiary);
router.delete("/:id", checkUserMiddleware, controller.deleteBeneficiary);

module.exports = app => {
    app.use('/api/beneficiarios', router);
};
