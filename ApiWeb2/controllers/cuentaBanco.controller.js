const db = require("../models");
const { checkRequiredFields } = require("../utils/request.utils");

// Crear una nueva cuenta bancaria
exports.createBankAccount = async (req, res) => {
    const requiredFields = ["nroCuenta", "nombre", "documento", "banco", "moneda", "usuarioId"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        return res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
    }

    const { nroCuenta, nombre, documento, banco, moneda, usuarioId } = req.body;

    try {
        const cuentaBanco = await db.cuentasBanco.create({
            nroCuenta, nombre, documento, banco, moneda, usuarioId
        });
        res.send(cuentaBanco);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al crear la cuenta bancaria."
        });
    }
};

// Obtener todas las cuentas bancarias de un usuario
exports.getUserBankAccounts = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const cuentasBanco = await db.cuentasBanco.findAll({ where: { usuarioId } });
        res.send(cuentasBanco);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al obtener las cuentas bancarias."
        });
    }
};

// Obtener una cuenta bancaria específica
exports.getBankAccount = async (req, res) => {
    const { id } = req.params;

    try {
        const cuentaBanco = await db.cuentasBanco.findOne({ where: { id } });
        if (!cuentaBanco) {
            return res.status(404).send({ message: "Cuenta bancaria no encontrada." });
        }
        res.send(cuentaBanco);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al obtener la cuenta bancaria."
        });
    }
};

// Actualizar una cuenta bancaria
exports.updateBankAccount = async (req, res) => {
    const { id } = req.params;
    const { nroCuenta, nombre, documento, banco, moneda } = req.body;

    try {
        const cuentaBanco = await db.cuentasBanco.findOne({ where: { id } });
        if (!cuentaBanco) {
            return res.status(404).send({ message: "Cuenta bancaria no encontrada." });
        }

        cuentaBanco.nroCuenta = nroCuenta !== undefined ? nroCuenta : cuentaBanco.nroCuenta;
        cuentaBanco.nombre = nombre !== undefined ? nombre : cuentaBanco.nombre;
        cuentaBanco.documento = documento !== undefined ? documento : cuentaBanco.documento;
        cuentaBanco.banco = banco !== undefined ? banco : cuentaBanco.banco;
        cuentaBanco.moneda = moneda !== undefined ? moneda : cuentaBanco.moneda;
        await cuentaBanco.save();
        res.send(cuentaBanco);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al actualizar la cuenta bancaria."
        });
    }
};

// Eliminar una cuenta bancaria
exports.deleteBankAccount = async (req, res) => {
    const { id } = req.params;

    try {
        const cuentaBanco = await db.cuentasBanco.findOne({ where: { id } });
        if (!cuentaBanco) {
            return res.status(404).send({ message: "Cuenta bancaria no encontrada." });
        }

        await cuentaBanco.destroy();
        res.send({ message: "Cuenta bancaria eliminada correctamente." });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al eliminar la cuenta bancaria."
        });
    }
};
