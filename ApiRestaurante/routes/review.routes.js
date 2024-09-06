module.exports = app => {
    let router = require("express").Router();
    const reviewController = require("../controllers/review.controller.js");

    // Ruta para crear una nueva review para una hamburguesa
    router.post('/hamburguesa/:hamburguesaId', reviewController.crearReview);

    // Ruta para obtener todas las reviews de una hamburguesa
    router.get('/hamburguesa/:hamburguesaId', reviewController.obtenerReviewsPorHamburguesa);

    // Montar las rutas con el prefijo /reviews
    app.use('/reviews', router);
};
