const db = require("../models");
const path = require('path');
const { validationResult } = require('express-validator');

// Mostrar formulario para agregar hamburguesa
exports.mostrarFormularioCrearHamburguesa = async (req, res) => {
    try {
        const restaurantes = await db.Restaurante.findAll();
        res.render('admin/agregar-hamburguesa', { restaurantes, errores: null });
    } catch (error) {
        req.flash('error', 'Error al cargar el formulario.');
        res.redirect('/hamburguesas/admin');
    }
};

// Crear una nueva hamburguesa
exports.crearHamburguesa = async (req, res) => {
    const { nombre, descripcion, precio, restauranteId } = req.body;

    // Validar campos vacíos
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        const restaurantes = await db.Restaurante.findAll();
        return res.render('admin/agregar-hamburguesa', {
            errores: errores.array(),
            restaurantes,
        });
    }

    // Validar que se haya subido una imagen
    if (!req.files || !req.files.foto) {
        const restaurantes = await db.Restaurante.findAll();
        return res.render('admin/agregar-hamburguesa', {
            errores: [{ msg: 'La foto es obligatoria.' }],
            restaurantes,
        });
    }

    // Subir la imagen
    const foto = req.files.foto;
    const uploadPath = path.join(__dirname, '..', 'public', 'uploads', foto.name);

    foto.mv(uploadPath, async (err) => {
        if (err) {
            req.flash('error', 'Error al subir la imagen.');
            return res.redirect('/hamburguesas/admin');
        }

        try {
            // Crear hamburguesa
            await db.Hamburguesa.create({
                nombre,
                descripcion,
                foto: `/uploads/${foto.name}`,
                precio,
                restauranteId,
            });
            req.flash('success', 'Hamburguesa agregada exitosamente.');
            res.redirect('/hamburguesas/admin');
        } catch (error) {
            req.flash('error', 'Error al crear la hamburguesa.');
            res.redirect('/hamburguesas/admin');
        }
    });
};

// Listar todas las hamburguesas
exports.obtenerHamburguesas = async (req, res) => {
    try {
        const hamburguesas = await db.Hamburguesa.findAll({
            include: [
                { model: db.Restaurante, as: 'restaurante' },
                { model: db.Review, as: 'reviews', include: ['usuario'] }
            ]
        });
        res.render('admin/listar-hamburguesas', { hamburguesas });
    } catch (error) {
        req.flash('error', 'Error al obtener las hamburguesas.');
        res.redirect('/hamburguesas/admin');
    }
};


// Obtener detalles de una hamburguesa por su ID
exports.obtenerHamburguesa = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar la hamburguesa por ID e incluir el restaurante y las reviews
        const hamburguesa = await db.Hamburguesa.findByPk(id, {
            include: [
                { model: db.Restaurante, as: 'restaurante' },
                { model: db.Review, as: 'reviews', include: ['usuario'] },
            ],
        });

        if (!hamburguesa) {
            req.flash('error', 'Hamburguesa no encontrada.');
            return res.redirect('/hamburguesas/admin');
        }

        // Pasar la hamburguesa y sus reviews a la vista
        res.render('catalogo/detalle-hamburguesa', { hamburguesa, reviews: hamburguesa.reviews });
    } catch (error) {
        req.flash('error', 'Error al obtener los detalles de la hamburguesa.');
        res.redirect('/hamburguesas/admin');
    }
};

// Mostrar formulario para editar hamburguesa
exports.mostrarFormularioEditarHamburguesa = async (req, res) => {
    const { id } = req.params;

    try {
        const hamburguesa = await db.Hamburguesa.findByPk(id);
        const restaurantes = await db.Restaurante.findAll();

        if (!hamburguesa) {
            req.flash('error', 'Hamburguesa no encontrada.');
            return res.redirect('/hamburguesas/admin');
        }

        res.render('admin/editar-hamburguesa', { hamburguesa, restaurantes, errores: null });
    } catch (error) {
        req.flash('error', 'Error al cargar el formulario de edición.');
        res.redirect('/hamburguesas/admin');
    }
};

// Editar una hamburguesa existente
exports.editarHamburguesa = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, restauranteId } = req.body;

    try {
        const hamburguesa = await db.Hamburguesa.findByPk(id);
        if (!hamburguesa) {
            req.flash('error', 'Hamburguesa no encontrada.');
            return res.redirect('/hamburguesas/admin');
        }

        // Si se sube una nueva imagen, reemplazar la imagen existente
        if (req.files && req.files.foto) {
            const foto = req.files.foto;
            const uploadPath = path.join(__dirname, '..', 'public', 'uploads', foto.name);

            foto.mv(uploadPath, async (err) => {
                if (err) {
                    req.flash('error', 'Error al subir la nueva imagen.');
                    return res.redirect('/hamburguesas/admin');
                }

                // Actualizar la hamburguesa con la nueva imagen
                hamburguesa.foto = `/uploads/${foto.name}`;
                hamburguesa.nombre = nombre;
                hamburguesa.descripcion = descripcion;
                hamburguesa.precio = precio;
                hamburguesa.restauranteId = restauranteId;

                await hamburguesa.save();
                req.flash('success', 'Hamburguesa editada exitosamente.');
                res.redirect('/hamburguesas/admin');
            });
        } else {
            // Si no se sube una nueva imagen, solo actualizar los demás campos
            hamburguesa.nombre = nombre;
            hamburguesa.descripcion = descripcion;
            hamburguesa.precio = precio;
            hamburguesa.restauranteId = restauranteId;

            await hamburguesa.save();
            req.flash('success', 'Hamburguesa editada exitosamente.');
            res.redirect('/hamburguesas/admin');
        }
    } catch (error) {
        req.flash('error', 'Error al editar la hamburguesa.');
        res.redirect('/hamburguesas/admin');
    }
};

// Eliminar una hamburguesa
exports.eliminarHamburguesa = async (req, res) => {
    const { id } = req.params;

    try {
        const hamburguesa = await db.Hamburguesa.findByPk(id);
        if (!hamburguesa) {
            req.flash('error', 'Hamburguesa no encontrada.');
            return res.redirect('/hamburguesas/admin');
        }

        await hamburguesa.destroy();
        req.flash('success', 'Hamburguesa eliminada exitosamente.');
        res.redirect('/hamburguesas/admin');
    } catch (error) {
        req.flash('error', 'Error al eliminar la hamburguesa.');
        res.redirect('/hamburguesas/admin');
    }
};
