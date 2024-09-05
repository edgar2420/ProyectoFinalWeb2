// Controlador de usuarios
const db = require("../models");

exports.mostrarFormularioRegistro = (req, res) => {
    res.render('auth/registro', { errores: null });
};

exports.register = async (req, res) => {
    const { email, password } = req.body;

    // Validar campos vacíos
    if (!email || !password) {
        return res.render('auth/registro', { errores: { mensaje: 'El correo y la contraseña son obligatorios' } });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await db.Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
        return res.render('auth/registro', { errores: { mensaje: 'El correo ya está registrado' } });
    }

    // Crear el nuevo usuario
    await db.Usuario.create({ email, password });
    return res.redirect('/usuario/iniciar-sesion');  // Redirigir al login después de registrarse
};

exports.mostrarFormularioLogin = (req, res) => {
    res.render('auth/iniciar-sesion', { errores: null });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validar campos vacíos
    if (!email || !password) {
        return res.render('auth/iniciar-sesion', { errores: { mensaje: 'El correo y la contraseña son obligatorios' } });
    }

    // Buscar al usuario en la base de datos
    const usuario = await db.Usuario.findOne({ where: { email } });
    if (!usuario) {
        return res.render('auth/iniciar-sesion', { errores: { mensaje: 'Usuario no encontrado' } });
    }

    // Verificar si la contraseña es correcta
    if (usuario.password !== password) {
        return res.render('auth/iniciar-sesion', { errores: { mensaje: 'Contraseña incorrecta' } });
    }

    // Autenticación exitosa, redirigir al dashboard
    res.redirect('/dashboard');
};
