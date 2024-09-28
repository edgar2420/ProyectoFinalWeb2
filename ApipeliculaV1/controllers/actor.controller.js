const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");

// Obtener todos los actores
exports.getAllActores = async (req, res) => {
    try {
        const actores = await Actor.findAll();
        res.status(200).json(actores);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los actores', error: error.message });
    }
};

// Obtener un actor por su ID
exports.getActorById = async (req, res) => {
    const { id } = req.params;
    try {
        const actor = await Actor.findByPk(id);
        if (actor) {
            res.status(200).json(actor);
        } else {
            res.status(404).json({ message: 'Actor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el actor', error: error.message });
    }
};

// Crear un nuevo actor
exports.createActor = async (req, res) => {
    const { nombre, fechaNacimiento, nacionalidad } = req.body;
    try {
        const nuevoActor = await Actor.create({ nombre, fechaNacimiento, nacionalidad });
        res.status(201).json({ message: 'Actor creado exitosamente', actor: nuevoActor });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el actor', error: error.message });
    }
};

// Actualizar un actor existente
exports.updateActor = async (req, res) => {
    const { id } = req.params;
    const { nombre, fechaNacimiento, nacionalidad } = req.body;
    try {
        const actor = await Actor.findByPk(id);
        if (actor) {
            actor.nombre = nombre;
            actor.fechaNacimiento = fechaNacimiento;
            actor.nacionalidad = nacionalidad;
            await actor.save();
            res.status(200).json({ message: 'Actor actualizado exitosamente', actor });
        } else {
            res.status(404).json({ message: 'Actor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el actor', error: error.message });
    }
};

// Eliminar un actor
exports.deleteActor = async (req, res) => {
    const { id } = req.params;
    try {
        const actor = await Actor.findByPk(id);
        if (actor) {
            await actor.destroy();
            res.status(200).json({ message: 'Actor eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Actor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el actor', error: error.message });
    }
};