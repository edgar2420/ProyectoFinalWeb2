const db = require("../models");
const { checkRequiredFields } = require("../utils/request.utils");

// Crear una nueva moneda
exports.createCurrency = async (req, res) => {
    const requiredFields = ["nombre", "valorUsd"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        return res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
    }

    const { nombre, valorUsd } = req.body;

    try {
        const moneda = await db.monedas.create({ nombre, valorUsd });
        res.send(moneda);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al crear la moneda."
        });
    }
};

// Obtener todas las monedas
exports.getAllCurrencies = async (req, res) => {
    try {
        const monedas = await db.monedas.findAll();
        res.send(monedas);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al obtener las monedas."
        });
    }
};

// Obtener una moneda específica
exports.getCurrency = async (req, res) => {
    const { id } = req.params;

    try {
        const moneda = await db.monedas.findOne({ where: { id } });
        if (!moneda) {
            return res.status(404).send({ message: "Moneda no encontrada." });
        }
        res.send(moneda);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al obtener la moneda."
        });
    }
};

// Actualizar una moneda
exports.updateCurrency = async (req, res) => {
    const { id } = req.params;
    const { valorUsd } = req.body;

    try {
        const moneda = await db.monedas.findOne({ where: { id } });
        if (!moneda) {
            return res.status(404).send({ message: "Moneda no encontrada." });
        }

        moneda.valorUsd = valorUsd !== undefined ? valorUsd : moneda.valorUsd;
        await moneda.save();
        res.send(moneda);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al actualizar la moneda."
        });
    }
};

// Eliminar una moneda
exports.deleteCurrency = async (req, res) => {
    const { id } = req.params;

    try {
        const moneda = await db.monedas.findOne({ where: { id } });
        if (!moneda) {
            return res.status(404).send({ message: "Moneda no encontrada." });
        }

        await moneda.destroy();
        res.send({ message: "Moneda eliminada correctamente." });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al eliminar la moneda."
        });
    }
};
