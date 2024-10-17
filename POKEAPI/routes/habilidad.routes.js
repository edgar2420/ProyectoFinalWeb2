module.exports = app => {
    let router = require("express").Router();
    const habilidadController = require("../controllers/habilidad.controller.js");

    // Ruta para listar todas las habilidades
    router.get('/habilidades', habilidadController.listHabilidades);

    // Ruta para crear una nueva habilidad
    router.post('/habilidades', habilidadController.createHabilidad);

    app.use('/api', router);
};
