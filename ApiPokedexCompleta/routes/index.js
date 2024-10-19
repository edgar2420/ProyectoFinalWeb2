module.exports = app => {
    require("./pokemon.routes")(app);    // Rutas de Pokémon
    require("./tipo.routes")(app);       // Rutas de Tipos
    require("./habilidad.routes")(app);  // Rutas de Habilidades
    require("./evolucion.routes")(app);  // Rutas de Evoluciones
};
