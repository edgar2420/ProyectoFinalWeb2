const db = require("../models");
const { sendError500 } = require("../utils/request.utils");
const { check, validationResult } = require('express-validator');
const path = require('path');

// Obtener todos los Pokémon con paginación
exports.listPokemones = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    try {
        const pokemones = await db.pokemon.findAndCountAll({
            limit: limit,
            offset: offset,
            include: ['tipos', 'habilidades', 'evoluciones']
        });

        res.status(200).json({
            totalPokemones: pokemones.count,
            totalPages: Math.ceil(pokemones.count / limit),
            currentPage: page,
            data: pokemones.rows
        });
    } catch (error) {
        sendError500(error, res);
    }
};

// Crear un nuevo Pokémon con validaciones
exports.createPokemon = [
    check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
    check('nroPokedex').isNumeric().withMessage('El número de Pokedex debe ser un número'),
    check('hp').isNumeric().withMessage('El valor de HP debe ser numérico'),
    check('attack').isNumeric().withMessage('El valor de Attack debe ser numérico'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const pokemon = await db.pokemon.create(req.body);
            res.status(201).json(pokemon);
        } catch (error) {
            sendError500(error, res);
        }
    }
];

// Subir una imagen para un Pokémon
exports.uploadImagen = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se subió ninguna imagen.');
        }

        const file = req.files.imagen;
        const uploadPath = path.join(__dirname, '../uploads/', file.name);

        file.mv(uploadPath, async (err) => {
            if (err) return sendError500(err, res);

            const pokemon = await db.pokemon.findByPk(req.params.id);
            if (!pokemon) {
                return res.status(404).send('Pokémon no encontrado');
            }

            pokemon.imagen_url = `/uploads/${file.name}`;
            await pokemon.save();

            res.send('Imagen subida correctamente');
        });
    } catch (error) {
        sendError500(error, res);
    }
};

// Buscar Pokémon por nombre, número de Pokedex o tipo
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

// Obtener la línea evolutiva de un Pokémon
exports.getLineaEvolutiva = async (req, res) => {
    const idPokemonActual = req.params.id;
    try {
        const objPokemon = await db.pokemon.findByPk(idPokemonActual);

        if (!objPokemon) {
            return res.status(404).json({ message: "Pokémon no encontrado." });
        }

        // Caso 0: No tiene evolución
        if (!objPokemon.idEvolucionPrevia && !objPokemon.idEvolucionSiguiente) {
            return res.status(200).json([idPokemonActual]);
        }

        // Caso 1: Pokémon inicial es el actual
        if (!objPokemon.idEvolucionPrevia) {
            const respuesta = [];
            let currentPokemon = objPokemon;
            respuesta.push(currentPokemon.id);

            while (currentPokemon.idEvolucionSiguiente !== null) {
                currentPokemon = await db.pokemon.findByPk(currentPokemon.idEvolucionSiguiente);
                respuesta.push(currentPokemon.id);
            }
            return res.status(200).json(respuesta);
        }

        // Caso 2: Pokémon final es el actual
        if (!objPokemon.idEvolucionSiguiente) {
            const respuesta = [];
            let currentPokemon = objPokemon;

            while (currentPokemon.idEvolucionPrevia !== null) {
                respuesta.push(currentPokemon.idEvolucionPrevia);
                currentPokemon = await db.pokemon.findByPk(currentPokemon.idEvolucionPrevia);
            }
            respuesta.reverse();
            respuesta.push(idPokemonActual);
            return res.status(200).json(respuesta);
        }

        // Caso 3: Pokémon intermedio
        const respuesta = [];
        let currentPokemon = objPokemon;

        while (currentPokemon.idEvolucionPrevia !== null) {
            respuesta.push(currentPokemon.idEvolucionPrevia);
            currentPokemon = await db.pokemon.findByPk(currentPokemon.idEvolucionPrevia);
        }

        respuesta.reverse();
        respuesta.push(idPokemonActual);

        currentPokemon = objPokemon;
        while (currentPokemon.idEvolucionSiguiente !== null) {
            currentPokemon = await db.pokemon.findByPk(currentPokemon.idEvolucionSiguiente);
            respuesta.push(currentPokemon.id);
        }

        return res.status(200).json(respuesta);
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
