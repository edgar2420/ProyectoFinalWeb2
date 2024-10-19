const db = require("../models");
const { sendError500 } = require("../utils/request.utils");
const { validationResult } = require('express-validator');
const path = require('path');

// Obtener todos los Pokémon con paginación y búsqueda
exports.listPokemones = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const searchTerm = req.query.search || '';

    try {
        const pokemones = await db.pokemon.findAndCountAll({
            where: {
                nombre: {
                    [db.Sequelize.Op.like]: `%${searchTerm}%`
                }
            },
            limit: limit,
            offset: offset,
            include: ['tipos'] // Incluir tipos
        });

        res.status(200).json({
            pokemones: pokemones.rows,
            totalPages: Math.ceil(pokemones.count / limit)
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Error al obtener los Pokémon'
        });
    }
};

// Crear o actualizar un Pokémon con tipos, habilidades y subida de imagen
exports.createOrUpdatePokemon = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { tipos, habilidades, ...pokemonData } = JSON.parse(req.body.data);
        let pokemon;

        // Manejar subida de imagen si se proporciona
        if (req.files && req.files.imagen) {
            const imagen = req.files.imagen;
            const imagePath = `/uploads/${imagen.name}`;
            const uploadPath = path.join(__dirname, '../uploads/', imagen.name);
            await imagen.mv(uploadPath);
            pokemonData.imagen_url = imagePath; // Asignar la URL de la imagen al Pokémon
        }

        if (req.params.id) {
            // Actualizar Pokémon
            pokemon = await db.pokemon.findByPk(req.params.id);
            if (!pokemon) {
                return res.status(404).json({ message: "Pokémon no encontrado." });
            }
            await pokemon.update(pokemonData);
        } else {
            // Crear Pokémon
            pokemon = await db.pokemon.create(pokemonData);
        }

        // Manejar asociaciones con tipos y habilidades
        if (tipos && tipos.length > 0) {
            const tipoInstances = await db.tipo.findAll({ where: { id: tipos } });
            await pokemon.setTipos(tipoInstances); // Asociar los tipos al Pokémon
        }

        if (habilidades && habilidades.length > 0) {
            const habilidadInstances = await db.habilidad.findAll({ where: { id: habilidades } });
            await pokemon.setHabilidades(habilidadInstances); // Asociar las habilidades al Pokémon
        }

        res.status(200).json({ message: req.params.id ? 'Pokémon actualizado correctamente' : 'Pokémon creado correctamente', pokemon });
    } catch (error) {
        console.error(error);
        sendError500(error, res);
    }
};

// Subir una imagen para un Pokémon ya existente
exports.uploadImagen = async (req, res) => {
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

            const pokemon = await db.pokemon.findByPk(req.params.id);
            if (!pokemon) {
                return res.status(404).send('Pokémon no encontrado.');
            }

            pokemon.imagen_url = `/uploads/${file.name}`;
            await pokemon.save();

            res.send('Imagen subida correctamente.');
        });
    } catch (error) {
        sendError500(error, res);
    }
};

// Obtener un Pokémon por su ID
exports.getPokemonById = async (req, res) => {
    try {
        const pokemon = await db.pokemon.findByPk(req.params.id, {
            include: ['tipos', 'habilidades', 'evoluciones']
        });
        if (!pokemon) {
            return res.status(404).json({ message: "Pokémon no encontrado." });
        }
        res.status(200).json(pokemon);
    } catch (error) {
        sendError500(error, res);
    }
};

// Eliminar un Pokémon por su ID
exports.deletePokemon = async (req, res) => {
    try {
        const id = req.params.id;
        const pokemon = await db.pokemon.destroy({ where: { id: id } });

        if (pokemon === 1) {
            res.send({ message: "Pokémon eliminado correctamente." });
        } else {
            res.send({ message: `No se pudo eliminar el Pokémon con id=${id}. Tal vez no se encontró.` });
        }
    } catch (error) {
        res.status(500).send({ message: "No se pudo eliminar el Pokémon con id=" + id });
    }
};

// Obtener la línea evolutiva de un Pokémon
exports.getLineaEvolutiva = async (req, res) => {
    const idPokemonActual = req.params.id;
    try {
        const objPokemon = await db.pokemon.findByPk(idPokemonActual, {
            include: [{ model: db.evolucion, as: 'evoluciones' }]
        });

        if (!objPokemon) {
            return res.status(404).json({ message: "Pokémon no encontrado." });
        }

        res.status(200).json(objPokemon.evoluciones);
    } catch (error) {
        sendError500(error, res);
    }
};

// Obtener los stats base de un Pokémon a nivel 100
exports.getStatsBase = async (req, res) => {
    try {
        const pokemon = await db.pokemon.findByPk(req.params.id);
        if (!pokemon) {
            return res.status(404).json({ message: "Pokémon no encontrado." });
        }

        const statsBase = {
            hpMax: pokemon.hp + 50,
            hpMin: pokemon.hp - 10,
            attackMax: pokemon.attack + 50,
            attackMin: pokemon.attack - 10,
            defenseMax: pokemon.defense + 50,
            defenseMin: pokemon.defense - 10,
            spattackMax: pokemon.spattack + 50,
            spattackMin: pokemon.spattack - 10,
            spdefenseMax: pokemon.spdefense + 50,
            spdefenseMin: pokemon.spdefense - 10,
            speedMax: pokemon.speed + 50,
            speedMin: pokemon.speed - 10
        };

        res.status(200).json(statsBase);
    } catch (error) {
        sendError500(error, res);
    }
};

// Buscar Pokémon por nombre, número de Pokédex o tipo (search)
exports.searchPokemones = async (req, res) => {
    const { nombre, nroPokedex, tipo } = req.query;
    try {
        const whereClause = {};
        if (nombre) whereClause.nombre = { [db.Sequelize.Op.like]: `%${nombre}%` };
        if (nroPokedex) whereClause.nroPokedex = nroPokedex;

        const pokemones = await db.pokemon.findAll({
            where: whereClause,
            include: tipo ? [{ model: db.tipo, as: 'tipos', where: { nombre: tipo } }] : []
        });
        res.status(200).json(pokemones);
    } catch (error) {
        sendError500(error, res);
    }
};
