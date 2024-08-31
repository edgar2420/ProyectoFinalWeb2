const db = require("../models");
const { checkRequiredFields } = require("../utils/request.utils");

exports.createWallet = async (req, res) => {
    const requiredFields = ["usuarioId", "monedaId"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        return res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
    }

    const { usuarioId, monedaId, saldo } = req.body;

    try {
        const billetera = await db.billeteras.create({
            usuarioId, monedaId, saldo: saldo || 0
        });
        res.send(billetera);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al crear la billetera."
        });
    }
};

exports.getUserWallets = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const billeteras = await db.billeteras.findAll({ where: { usuarioId } });
        res.send(billeteras);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al obtener las billeteras."
        });
    }
};

exports.getWallet = async (req, res) => {
    const { id } = req.params;

    try {
        const billetera = await db.billeteras.findOne({ where: { id } });
        if (!billetera) {
            return res.status(404).send({ message: "Billetera no encontrada." });
        }
        res.send(billetera);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al obtener la billetera."
        });
    }
};

exports.updateWallet = async (req, res) => {
    const { id } = req.params;
    const { saldo } = req.body;

    try {
        const billetera = await db.billeteras.findOne({ where: { id } });
        if (!billetera) {
            return res.status(404).send({ message: "Billetera no encontrada." });
        }

        billetera.saldo = saldo !== undefined ? saldo : billetera.saldo;
        await billetera.save();
        res.send(billetera);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al actualizar la billetera."
        });
    }
};

exports.deleteWallet = async (req, res) => {
    const { id } = req.params;

    try {
        const billetera = await db.billeteras.findOne({ where: { id } });
        if (!billetera) {
            return res.status(404).send({ message: "Billetera no encontrada." });
        }

        await billetera.destroy();
        res.send({ message: "Billetera eliminada correctamente." });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al eliminar la billetera."
        });
    }
};
