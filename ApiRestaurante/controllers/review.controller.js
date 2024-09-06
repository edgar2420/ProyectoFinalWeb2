const db = require("../models");

// Crear una nueva review para una hamburguesa
exports.crearReview = async (req, res) => {
    const { comentario, puntuacion, hamburguesaId, usuarioId } = req.body;

    if (!comentario || !puntuacion || !hamburguesaId || !usuarioId) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
        const nuevaReview = await db.Review.create({
            comentario,
            puntuacion,
            hamburguesaId,
            usuarioId
        });
        res.status(201).json(nuevaReview);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la review', error });
    }
};

// Obtener todas las reviews de una hamburguesa específica
exports.obtenerReviewsPorHamburguesa = async (req, res) => {
    const { hamburguesaId } = req.params;

    try {
        const reviews = await db.Review.findAll({
            where: { hamburguesaId },
            include: ['usuario', 'hamburguesa']  // Relación con el usuario y hamburguesa
        });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las reviews', error });
    }
};
