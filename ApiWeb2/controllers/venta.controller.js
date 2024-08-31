const db = require("../models");
const { checkRequiredFields } = require("../utils/request.utils");

// Crear una nueva venta
exports.createSale = async (req, res) => {
    const requiredFields = ["moneda", "valorVenta", "montoEnMoneda", "billeteraOrigen"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        return res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
    }

    const { moneda, valorVenta, montoEnMoneda, billeteraOrigen, metodoPago } = req.body;

    try {
        const venta = await db.ventas.create({
            moneda, valorVenta, montoEnMoneda, billeteraOrigen, metodoPago, estado: 'Pend'
        });
        res.send(venta);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al crear la venta."
        });
    }
};

// Obtener todas las ventas
exports.getAllSales = async (req, res) => {
    try {
        const ventas = await db.ventas.findAll();
        res.send(ventas);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al obtener las ventas."
        });
    }
};

// Obtener una venta específica
exports.getSale = async (req, res) => {
    const { id } = req.params;

    try {
        const venta = await db.ventas.findOne({ where: { id } });
        if (!venta) {
            return res.status(404).send({ message: "Venta no encontrada." });
        }
        res.send(venta);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al obtener la venta."
        });
    }
};

// Actualizar una venta
exports.updateSale = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        const venta = await db.ventas.findOne({ where: { id } });
        if (!venta) {
            return res.status(404).send({ message: "Venta no encontrada." });
        }

        venta.estado = estado !== undefined ? estado : venta.estado;
        await venta.save();
        res.send(venta);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al actualizar la venta."
        });
    }
};

// Eliminar una venta
exports.deleteSale = async (req, res) => {
    const { id } = req.params;

    try {
        const venta = await db.ventas.findOne({ where: { id } });
        if (!venta) {
            return res.status(404).send({ message: "Venta no encontrada." });
        }

        await venta.destroy();
        res.send({ message: "Venta eliminada correctamente." });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrió un error al eliminar la venta."
        });
    }
};
