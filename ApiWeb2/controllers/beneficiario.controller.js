const db = require("../models");
const { checkRequiredFields } = require("../utils/request.utils");

// Crear un nuevo beneficiario
exports.createBeneficiary = async (req, res) => {
    const requiredFields = ["nombreReferencia", "nroCuenta", "usuarioId"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        return res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
    }

    const { nombreReferencia, nroCuenta, usuarioId } = req.body;

    try {
        const beneficiario = await db.beneficiarios.create({
            nombreReferencia, nroCuenta, usuarioId
        });
        res.send(beneficiario);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al crear el beneficiario."
        });
    }
};

// Obtener todos los beneficiarios de un usuario
exports.getUserBeneficiaries = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const beneficiarios = await db.beneficiarios.findAll({ where: { usuarioId } });
        res.send(beneficiarios);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al obtener los beneficiarios."
        });
    }
};

// Obtener un beneficiario específico
exports.getBeneficiary = async (req, res) => {
    const { id } = req.params;

    try {
        const beneficiario = await db.beneficiarios.findOne({ where: { id } });
        if (!beneficiario) {
            return res.status(404).send({ message: "Beneficiario no encontrado." });
        }
        res.send(beneficiario);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al obtener el beneficiario."
        });
    }
};

// Actualizar un beneficiario
exports.updateBeneficiary = async (req, res) => {
    const { id } = req.params;
    const { nombreReferencia, nroCuenta } = req.body;

    try {
        const beneficiario = await db.beneficiarios.findOne({ where: { id } });
        if (!beneficiario) {
            return res.status(404).send({ message: "Beneficiario no encontrado." });
        }

        beneficiario.nombreReferencia = nombreReferencia !== undefined ? nombreReferencia : beneficiario.nombreReferencia;
        beneficiario.nroCuenta = nroCuenta !== undefined ? nroCuenta : beneficiario.nroCuenta;
        await beneficiario.save();
        res.send(beneficiario);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al actualizar el beneficiario."
        });
    }
};

// Eliminar un beneficiario
exports.deleteBeneficiary = async (req, res) => {
    const { id } = req.params;

    try {
        const beneficiario = await db.beneficiarios.findOne({ where: { id } });
        if (!beneficiario) {
            return res.status(404).send({ message: "Beneficiario no encontrado." });
        }

        await beneficiario.destroy();
        res.send({ message: "Beneficiario eliminado correctamente." });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al eliminar el beneficiario."
        });
    }
};
