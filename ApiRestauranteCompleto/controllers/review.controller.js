const db = require("../models");

// Agregar un review a una hamburguesa
exports.agregarReview = async (req, res) => {
    try {
        const usuarioId = req.session.usuarioId;
        const { comentario, puntuacion } = req.body;
        const hamburguesaId = req.params.hamburguesaId;

        if (!usuarioId) {
            return res.status(401).send('Debes iniciar sesión para dejar una reseña.');
        }

        if (!hamburguesaId || !comentario || !puntuacion) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        // Verificar si el usuario ya ha dejado una reseña para esta hamburguesa
        const reviewExistente = await db.Review.findOne({
            where: {
                usuarioId: usuarioId,
                hamburguesaId: hamburguesaId
            }
        });

        if (reviewExistente) {
            return res.status(400).send('Ya has dejado una reseña para esta hamburguesa.');
        }

        // Crear la nueva reseña ya que no existe una previa
        const nuevaReview = await db.Review.create({
            usuarioId,
            hamburguesaId,
            comentario,
            puntuacion,
            fecha: new Date()
        });

        res.redirect(`/hamburguesas/detalle/${hamburguesaId}`);
    } catch (error) {
        console.error('Error al agregar la reseña:', error);
        res.status(500).send('Error al agregar la reseña.');
    }
};


// Mostrar todos los reviews de una hamburguesa
exports.obtenerReviews = async (req, res) => {
    const { hamburguesaId } = req.params;

    try {
        const reviews = await db.Review.findAll({
            where: { hamburguesaId },
            include: ['usuario']
        });

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los reviews.' });
    }
};

// Editar un review existente
exports.editarReview = async (req, res) => {
    const { id } = req.params;
    const { comentario, puntuacion } = req.body;

    try {
        const review = await db.Review.findByPk(id);

        if (!review) {
            return res.status(404).json({ mensaje: 'Review no encontrado' });
        }

        review.comentario = comentario;
        review.puntuacion = puntuacion;

        await review.save();
        res.redirect(`/hamburguesas/detalle/${review.hamburguesaId}`);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al editar el review.' });
    }
};

// Eliminar un review
exports.eliminarReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await db.Review.findByPk(id);

        if (!review) {
            return res.status(404).json({ mensaje: 'Review no encontrado' });
        }

        await review.destroy();
        res.redirect(`/hamburguesas/detalle/${review.hamburguesaId}`);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el review.' });
    }
};
