module.exports = app => {
    let router = require("express").Router();
    const pokemonController = require("../controllers/pokemon.controller.js");

    // Ruta para listar los Pokémon
    router.get('/pokemones', pokemonController.listPokemones);

    // Ruta para subir una imagen para un Pokémon
    router.post('/pokemones/:id/upload', pokemonController.uploadImagen);

    app.use('/api', router);
};
