const db = require("../models");
const { sendError500 } = require("../utils/request.utils");
const path = require('path');

// Obtener todas las evoluciones
exports.listEvoluciones = async (req, res) => {
    try {
        const evoluciones = await db.evolucion.findAll();
        res.status(200).json(evoluciones);
    } catch (error) {
        sendError500(error, res);
    }
};

// Crear una nueva evolución
exports.createEvolucion = async (req, res) => {
    try {
        const { idEvPrevia, idEvSiguiente, nivelEvolucion, pokemonId } = req.body;
        const nuevaEvolucion = await db.evolucion.create({ idEvPrevia, idEvSiguiente, nivelEvolucion, pokemonId });
        res.status(201).json(nuevaEvolucion);
    } catch (error) {
        sendError500(error, res);
    }
};

// Subir una imagen para una evolución
exports.uploadImagenEvolucion = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se subió ninguna imagen.');
        }

        let archivoImagen = req.files.imagen;

        // Validar que el archivo sea una imagen
        if (!archivoImagen.mimetype.startsWith('image/')) {
            return res.status(400).send('Solo se permiten archivos de imagen.');
        }

        const uploadPath = path.join(__dirname, '../uploads/', archivoImagen.name);

        archivoImagen.mv(uploadPath, async function(err) {
            if (err) return res.status(500).send(err);

            const evolucion = await db.evolucion.findByPk(req.params.id);
            if (!evolucion) {
                return res.status(404).send('Evolución no encontrada');
            }

            evolucion.imagen_url = `/uploads/${archivoImagen.name}`;
            await evolucion.save();

            res.send('Imagen de evolución subida correctamente');
        });
    } catch (error) {
        sendError500(error, res);
    }
};

// Obtener evoluciones previas y siguientes de un Pokémon
exports.getEvolucionByPokemonId = async (req, res) => {
    try {
        const pokemon = await db.pokemon.findByPk(req.params.id, {
            include: ['evoluciones']
        });

        if (!pokemon) {
            return res.status(404).json({ message: "Pokémon no encontrado." });
        }

        const evolucion = {
            evolucionPrevia: await db.evolucion.findOne({ where: { idEvSiguiente: pokemon.id } }),
            evolucionSiguiente: await db.evolucion.findOne({ where: { idEvPrevia: pokemon.id } })
        };

        res.status(200).json(evolucion);
    } catch (error) {
        sendError500(error, res);
    }
};
