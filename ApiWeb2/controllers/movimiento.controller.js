const db = require("../models");
const { checkRequiredFields } = require("../utils/request.utils");

exports.createMovement = async (req, res) => {
    const requiredFields = ["descripcion", "montoMoneda", "tipo", "billeteraOrigenId"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        return res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
    }

    const { descripcion, montoMoneda, tipo, billeteraOrigenId, movReferencia } = req.body;

    try {
        const movimiento = await db.movimientos.create({
            descripcion,
            montoMoneda,
            tipo,
            billeteraOrigenId,
            movReferencia: movReferencia || null
        });
        res.send(movimiento);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al crear el movimiento."
        });
    }
};

exports.getWalletMovements = async (req, res) => {
    const { billeteraId } = req.params;

    try {
        const movimientos = await db.movimientos.findAll({
            where: { billeteraOrigenId: billeteraId }
        });
        res.send(movimientos);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al obtener los movimientos."
        });
    }
};

exports.getMovement = async (req, res) => {
    const { id } = req.params;

    try {
        const movimiento = await db.movimientos.findOne({ where: { id } });
        if (!movimiento) {
            return res.status(404).send({ message: "Movimiento no encontrado." });
        }
        res.send(movimiento);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al obtener el movimiento."
        });
    }
};

exports.updateMovement = async (req, res) => {
    const { id } = req.params;
    const { descripcion, montoMoneda, tipo } = req.body;

    try {
        const movimiento = await db.movimientos.findOne({ where: { id } });
        if (!movimiento) {
            return res.status(404).send({ message: "Movimiento no encontrado." });
        }

        movimiento.descripcion = descripcion !== undefined ? descripcion : movimiento.descripcion;
        movimiento.montoMoneda = montoMoneda !== undefined ? montoMoneda : movimiento.montoMoneda;
        movimiento.tipo = tipo !== undefined ? tipo : movimiento.tipo;
        await movimiento.save();
        res.send(movimiento);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al actualizar el movimiento."
        });
    }
};

exports.deleteMovement = async (req, res) => {
    const { id } = req.params;

    try {
        const movimiento = await db.movimientos.findOne({ where: { id } });
        if (!movimiento) {
            return res.status(404).send({ message: "Movimiento no encontrado." });
        }

        await movimiento.destroy();
        res.send({ message: "Movimiento eliminado correctamente." });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al eliminar el movimiento."
        });
    }
};
