const db = require("../models");
const { generarTokenUsuario } = require("../utils/code.utils");
const { stringToSha1 } = require("../utils/crypto.utils");
const { checkRequiredFields } = require("../utils/request.utils");

// Generar token para el usuario
exports.generateUserToken = async (req, res) => {
    const requiredFields = ["email", "password"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
        return;
    }

    const { email, password } = req.body;

    const usuario = await db.usuarios.findOne({
        where: {
            email,
            password: stringToSha1(password)
        }
    });

    if (!usuario) {
        res.status(401).send({ message: "Usuario o contraseña incorrectos" });
        return;
    }

    const token = generarTokenUsuario();
    console.log("Generated token: ", token);

    try {
        await db.usuarioauths.create({
            token,
            usuario_id: usuario.id
        });

        res.send({ token });
    } catch (error) {
        console.error('Error al guardar el token:', error);
        res.status(500).send({ message: "Error al guardar el token en la base de datos" });
    }
};

// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    const requiredFields = ["nombre", "email", "password"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
        return;
    }

    const { nombre, email, password } = req.body;

    const usuarioDB = await db.usuarios.findOne({
        where: {
            email
        }
    });
    if (usuarioDB) {
        res.status(400).send({
            message: "El email ya está registrado"
        });
        return;
    }

    const usuario = await db.usuarios.create({
        nombre,
        email,
        password: stringToSha1(password)
    });
    usuario.password = undefined;

    res.send(usuario);
};

// Registrar un administrador
exports.registerAdmin = async (req, res) => {
    const requiredFields = ["nombre", "email", "password"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
        return;
    }

    const { nombre, email, password } = req.body;

    const usuarioDB = await db.usuarios.findOne({
        where: {
            email
        }
    });
    if (usuarioDB) {
        res.status(400).send({
            message: "El email ya está registrado"
        });
        return;
    }

    const usuario = await db.usuarios.create({
        nombre,
        email,
        password: stringToSha1(password),
        esAdmin: true
    });
    usuario.password = undefined;

    res.send(usuario);
};

// Obtener la información del usuario actual
exports.me = async (req, res) => {
    const usuario = await db.usuarios.findOne({
        where: {
            id: res.locals.user.id
        },
        attributes: { exclude: ['password'] }
    });
    res.send(usuario);
};

// Obtener todos los usuarios con sus billeteras y movimientos
exports.getAllUsers = async (req, res) => {
    try {
        const usuarios = await db.usuarios.findAll({
            include: [
                { model: db.billeteras, as: 'billeteras' },
                { model: db.movimientos, as: 'movimientos' }
            ]
        });
        res.send(usuarios);
    } catch (error) {
        res.status(500).send({ message: error.message || "Ocurrió un error al obtener los usuarios." });
    }
};

// Obtener un usuario específico por ID
exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const usuario = await db.usuarios.findOne({ where: { id: userId } });
        if (!usuario) {
            res.status(404).send({ message: "Usuario no encontrado" });
            return;
        }
        res.send(usuario);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener el usuario" });
    }
};

// Eliminar un usuario (solo administradores)
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await db.usuarios.findOne({ where: { id } });
        if (!usuario) {
            res.status(404).send({ message: "Usuario no encontrado." });
            return;
        }
        await usuario.destroy();
        res.send({ message: "Usuario eliminado correctamente." });
    } catch (error) {
        res.status(500).send({ message: error.message || "Ocurrió un error al eliminar el usuario." });
    }
};
