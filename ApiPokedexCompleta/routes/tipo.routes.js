module.exports = app => {
    let router = require("express").Router();
    const tipoController = require("../controllers/tipo.controller.js");

    // Ruta para listar todos los tipos
    router.get('/tipos', tipoController.listTipos);

    // Ruta para crear un nuevo tipo
    router.post('/tipos', tipoController.createTipo);

    // Ruta para filtrar Pokémon por tipo
    router.get('/tipos/:tipo/pokemones', tipoController.getPokemonesByTipo);

    app.use('/api', router);
};
