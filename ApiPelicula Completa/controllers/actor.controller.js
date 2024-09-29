const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

// Obtener todos los actores
exports.listActores = async (req, res) => {
    try {
        const actores = await db.actores.findAll();
        res.status(200).json(actores);
    } catch (error) {
        sendError500(error, res);
    }
};

// Obtener un actor por su ID
exports.getActorById = async (req, res) => {
    const { id } = req.params;
    try {
        const actor = await db.actores.findByPk(id, {
            include: [
                { model: db.peliculas, as: 'peliculas' }
            ]
        });

        if (!actor) {
            return res.status(404).json({ message: 'Actor no encontrado' });
        }

        res.status(200).json(actor);
    } catch (error) {
        sendError500(error, res);
    }
};


// Crear un nuevo actor
exports.createActor = async (req, res) => {
    const { nombre, imagen_url } = req.body;

    try {
        const nuevoActor = await db.actores.create({
            nombre,
            imagen_url
        });

        res.status(201).json({
            message: 'Actor creado exitosamente',
            actor: nuevoActor
        });
    } catch (error) {
        sendError500(error, res);
    }
};


// Actualizar un actor existente
exports.updateActor = async (req, res) => {
    const { id } = req.params;
    const { nombre, imagen_url } = req.body;

    try {
        const actor = await db.actores.findByPk(id);

        if (!actor) {
            return res.status(404).json({ message: 'Actor no encontrado' });
        }

        await actor.update({
            nombre,
            imagen_url
        });

        res.status(200).json({
            message: 'Actor actualizado exitosamente',
            actor
        });
    } catch (error) {
        sendError500(error, res);
    }
};


// Eliminar un actor
exports.deleteActor = async (req, res) => {
    const { id } = req.params;

    try {
        const actor = await db.actores.findByPk(id);

        if (!actor) {
            return res.status(404).json({ message: 'Actor no encontrado' });
        }

        await actor.destroy();

        res.status(200).json({
            message: 'Actor eliminado exitosamente'
        });
    } catch (error) {
        sendError500(error, res);
    }
};
