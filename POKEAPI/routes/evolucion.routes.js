module.exports = app => {
    let router = require("express").Router();
    const evolucionController = require("../controllers/evolucion.controller.js");

    // Ruta para listar todas las evoluciones
    router.get('/evoluciones', evolucionController.listEvoluciones);

    // Ruta para crear una nueva evolución
    router.post('/evoluciones', evolucionController.createEvolucion);

    app.use('/api', router);
};
