const db = require("../models");
const { sendError500 } = require("../utils/request.utils");


exports.getAllPeliculas = async (req, res) => {
    try {
        const peliculas = await db.peliculas.findAll();
        res.status(200).json(peliculas);
    } catch (error) {
        sendError500(error);
    }
};

exports.getPeliculaById = async (req, res) => {
    const { id } = req.params;
    try {
        const pelicula = await db.peliculas.findByPk(id);
        if (pelicula) {
            res.status(200).json(pelicula);
        } else {
            res.status(404).json({ message: 'Película no encontrada' });
        }
    } catch (error) {
        sendError500(error);
    }
};

exports.createPelicula = async (req, res) => {
    const { titulo, sinopsis, fechaLanzamiento, directorId } = req.body; // Ajusta los campos según tu modelo
    try {
        const nuevaPelicula = await db.peliculas.create({ titulo, sinopsis, fechaLanzamiento, directorId });
        res.status(201).json({ message: 'Película creada exitosamente', pelicula: nuevaPelicula });
    } catch (error) {
        sendError500(error);
    }
};

exports.updatePelicula = async (req, res) => {
    const { id } = req.params;
    const { titulo, sinopsis, fechaLanzamiento, directorId } = req.body;
    try {
        const pelicula = await db.peliculas.findByPk(id);
        if (pelicula) {
            pelicula.titulo = titulo;
            pelicula.sinopsis = sinopsis;
            pelicula.fechaLanzamiento = fechaLanzamiento;
            pelicula.directorId = directorId;
            await pelicula.save();
            res.status(200).json({ message: 'Película actualizada exitosamente', pelicula });
        } else {
            res.status(404).json({ message: 'Película no encontrada' });
        }
    } catch (error) {
        sendError500(error);
    }
};

exports.deletePelicula = async (req, res) => {
    const { id } = req.params;
    try {
        const pelicula = await db.peliculas.findByPk(id);
        if (pelicula) {
            await pelicula.destroy();
            res.status(200).json({ message: 'Película eliminada exitosamente' });
        } else {
            res.status(404).json({ message: 'Película no encontrada' });
        }
    } catch (error) {
        sendError500(error);
    }
};
