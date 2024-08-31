const { checkUserMiddleware } = require("../middlewares/check-user.middleware");
const { checkAdminMiddleware } = require("../middlewares/check-admin.middleware");

module.exports = app => {
    const usuarioController = require("../controllers/usuario.controller.js");
    let router = require("express").Router();

    router.post("/register", usuarioController.registerUser);
    router.post("/login", usuarioController.generateUserToken);
    router.get("/me", checkUserMiddleware, usuarioController.me);

    // Ruta para registrar administrador sin autenticación
    router.post("/register-admin", usuarioController.registerAdmin);

    // Rutas protegidas solo para administradores autenticados
    router.get("/usuarios", checkUserMiddleware, checkAdminMiddleware, usuarioController.getAllUsers);
    router.delete("/usuarios/:id", checkUserMiddleware, checkAdminMiddleware, usuarioController.deleteUser);

    app.use('/api/usuarios', router);
};
