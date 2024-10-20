const db = require("../models");
const { sendError500 } = require("../utils/request.utils");
const path = require('path');

// Obtener todas las evoluciones
exports.listEvoluciones = async (req, res) => {
    try {
        const evoluciones = await db.evolucion.findAll();
        res.status(200).json(evoluciones);
    } catch (error) {
        console.error("Error al listar las evoluciones:", error);
        sendError500(error, res);
    }
};

// Crear o actualizar una evolución
exports.createEvolucion = async (req, res) => {
    try {
        const { idEvPrevia, idEvSiguiente, nivelEvolucion } = req.body;
        const { pokemonId } = req.params;  // Obtiene el ID del Pokémon desde la URL

        console.log("ID del Pokémon:", pokemonId);
        console.log("Archivos recibidos:", req.files);

        let imagen_url = null;

        // Maneja la subida de imagen como la creacion de pokemon
        if (req.files && req.files.imagen) {
            const imagen = req.files.imagen;
            const uploadPath = path.join(__dirname, '../uploads/', imagen.name);
            console.log("Ruta de subida de imagen:", uploadPath);

            await imagen.mv(uploadPath);
            imagen_url = `/uploads/${imagen.name}`;
        }

        const evolucionData = {
            pokemonId,
            idEvPrevia: idEvPrevia || null,
            idEvSiguiente: idEvSiguiente || null,
            nivelEvolucion,
            imagen_url
        };

        const nuevaEvolucion = await db.evolucion.create(evolucionData);

        res.status(200).json({ message: 'Evolución creada con éxito', nuevaEvolucion });
    } catch (error) {
        console.error('Error creando la evolución:', error);
        res.status(500).json({ message: 'Error al crear la evolución', error });
    }
};



// Subir una imagen para una evolución
exports.uploadImagenEvolucion = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se subió ninguna imagen.');
        }

        const file = req.files.imagen;

        if (!file.name) {
            return res.status(400).send('El archivo no tiene nombre.');
        }

        const uploadPath = path.join(__dirname, '../uploads/', file.name);

        file.mv(uploadPath, async (err) => {
            if (err) {
                return sendError500(err, res);
            }

            const evolucion = await db.evolucion.findByPk(req.params.id);
            if (!evolucion) {
                return res.status(404).send('Evolución no encontrada.');
            }

            evolucion.imagen_url = `/uploads/${file.name}`;
            await evolucion.save();

            res.send('Imagen subida correctamente.');
        });
    } catch (error) {
        console.error("Error al subir la imagen de la evolución:", error);
        sendError500(error, res);
    }
};

// Obtener evoluciones previas y siguientes de un Pokémon por su ID
exports.getEvolucionByPokemonId = async (req, res) => {
    try {
        const pokemonId = req.params.pokemonId;

        // Busca las evoluciones relacionadas con el Pokémon
        const evoluciones = await db.evolucion.findAll({
            where: { pokemonId: pokemonId }
        });

        if (!evoluciones || evoluciones.length === 0) {
            return res.status(404).json({ message: "Evoluciones no encontradas para este Pokémon." });
        }

        res.status(200).json(evoluciones);
    } catch (error) {
        console.error("Error al obtener la evolución del Pokémon:", error);
        sendError500(error, res);
    }
};
