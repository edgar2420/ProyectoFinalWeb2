const db = require("../models");
const { sendError500 } = require("../utils/request.utils");
const { check, validationResult } = require('express-validator');

// Obtener todos los tipos
exports.listTipos = async (req, res) => {
    try {
        const tipos = await db.tipo.findAll();
        res.status(200).json(tipos);
    } catch (error) {
        sendError500(error, res);
    }
};

// Crear un nuevo tipo con validaciones
exports.createTipo = [
    check('nombre').not().isEmpty().withMessage('El nombre del tipo es obligatorio'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { nombre } = req.body;
            const nuevoTipo = await db.tipo.create({ nombre });
            res.status(201).json(nuevoTipo);
        } catch (error) {
            sendError500(error, res);
        }
    }
];

// Filtrar Pokémon por tipo
exports.getPokemonesByTipo = async (req, res) => {
    const { tipo } = req.params;
    try {
        const pokemones = await db.pokemon.findAll({
            include: [
                {
                    model: db.tipo,
                    as: 'tipos',
                    where: { nombre: tipo }
                }
            ]
        });
        res.status(200).json(pokemones);
    } catch (error) {
        sendError500(error, res);
    }
};
