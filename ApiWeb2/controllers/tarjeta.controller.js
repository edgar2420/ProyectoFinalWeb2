const db = require("../models");
const { checkRequiredFields } = require("../utils/request.utils");

exports.createCard = async (req, res) => {
    const requiredFields = ["nombre", "numero", "cvv", "fechaVenc", "usuarioId"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        return res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
    }

    const { nombre, numero, cvv, fechaVenc, usuarioId } = req.body;

    try {
        const tarjeta = await db.tarjetas.create({
            nombre,
            numero,
            cvv,
            fechaVenc,
            usuarioId
        });
        res.send(tarjeta);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al crear la tarjeta."
        });
    }
};

exports.getUserCards = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const tarjetas = await db.tarjetas.findAll({ where: { usuarioId } });
        res.send(tarjetas);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al obtener las tarjetas."
        });
    }
};

exports.getCard = async (req, res) => {
    const { id } = req.params;

    try {
        const tarjeta = await db.tarjetas.findOne({ where: { id } });
        if (!tarjeta) {
            return res.status(404).send({ message: "Tarjeta no encontrada." });
        }
        res.send(tarjeta);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al obtener la tarjeta."
        });
    }
};

exports.updateCard = async (req, res) => {
    const { id } = req.params;
    const { nombre, numero, cvv, fechaVenc } = req.body;

    try {
        const tarjeta = await db.tarjetas.findOne({ where: { id } });
        if (!tarjeta) {
            return res.status(404).send({ message: "Tarjeta no encontrada." });
        }

        tarjeta.nombre = nombre !== undefined ? nombre : tarjeta.nombre;
        tarjeta.numero = numero !== undefined ? numero : tarjeta.numero;
        tarjeta.cvv = cvv !== undefined ? cvv : tarjeta.cvv;
        tarjeta.fechaVenc = fechaVenc !== undefined ? fechaVenc : tarjeta.fechaVenc;
        await tarjeta.save();
        res.send(tarjeta);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al actualizar la tarjeta."
        });
    }
};

exports.deleteCard = async (req, res) => {
    const { id } = req.params;

    try {
        const tarjeta = await db.tarjetas.findOne({ where: { id } });
        if (!tarjeta) {
            return res.status(404).send({ message: "Tarjeta no encontrada." });
        }

        await tarjeta.destroy();
        res.send({ message: "Tarjeta eliminada correctamente." });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al eliminar la tarjeta."
        });
    }
};
