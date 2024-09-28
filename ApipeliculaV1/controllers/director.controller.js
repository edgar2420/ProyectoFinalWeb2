const db = require("../models");
const { sendError500 } = require("../utils/request.utils");

exports.getAllDirectores = async (req, res) => {
    try {
        const directores = await db.directores.findAll();
        res.status(200).json(directores);
    } catch (error) {
        sendError500(error);
    }
};

exports.getDirectorById = async (req, res) => {
    const { id } = req.params;
    try {
        const director = await db.directores.findByPk(id);
        if (director) {
            res.status(200).json(director);
        } else {
            res.status(404).json({ message: 'Director no encontrado' });
        }
    } catch (error) {
        sendError500(error);
    }
};

exports.createDirector = async (req, res) => {
    const { nombre, nacionalidad } = req.body; // Ajusta los campos según tu modelo
    try {
        const nuevoDirector = await db.directores.create({ nombre, nacionalidad });
        res.status(201).json({ message: 'Director creado exitosamente', director: nuevoDirector });
    } catch (error) {
        sendError500(error);
    }
};

exports.updateDirector = async (req, res) => {
    const { id } = req.params;
    const { nombre, nacionalidad } = req.body;
    try {
        const director = await db.directores.findByPk(id);
        if (director) {
            director.nombre = nombre;
            director.nacionalidad = nacionalidad;
            await director.save();
            res.status(200).json({ message: 'Director actualizado exitosamente', director });
        } else {
            res.status(404).json({ message: 'Director no encontrado' });
        }
    } catch (error) {
        sendError500(error);
    }
};

exports.deleteDirector = async (req, res) => {
    const { id } = req.params;
    try {
        const director = await db.directores.findByPk(id);
        if (director) {
            await director.destroy();
            res.status(200).json({ message: 'Director eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Director no encontrado' });
        }
    } catch (error) {
        sendError500(error);
    }
};
