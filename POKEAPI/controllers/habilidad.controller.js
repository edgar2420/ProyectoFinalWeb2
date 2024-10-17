const db = require("../models");
const { sendError500 } = require("../utils/request.utils");
const { check, validationResult } = require('express-validator');

// Obtener todas las habilidades
exports.listHabilidades = async (req, res) => {
    try {
        const habilidades = await db.habilidad.findAll();
        res.status(200).json(habilidades);
    } catch (error) {
        sendError500(error, res);
    }
};

// Crear una nueva habilidad con validaciones
exports.createHabilidad = [
    check('nombre').not().isEmpty().withMessage('El nombre de la habilidad es obligatorio'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { nombre } = req.body;
            const nuevaHabilidad = await db.habilidad.create({ nombre });
            res.status(201).json(nuevaHabilidad);
        } catch (error) {
            sendError500(error, res);
        }
    }
];

// Filtrar Pokémon por habilidad
exports.getPokemonesByHabilidad = async (req, res) => {
    const { habilidad } = req.params;
    try {
        const pokemones = await db.pokemon.findAll({
            include: [
                {
                    model: db.habilidad,
                    as: 'habilidades',
                    where: { nombre: habilidad }
                }
            ]
        });
        res.status(200).json(pokemones);
    } catch (error) {
        sendError500(error, res);
    }
};
