const db = require("../models");

exports.checkUserMiddleware = async (req, res, next) => {
    try {
        const tokenHeader = req.headers["authorization"];
        if (!tokenHeader) {
            return res.status(401).send({
                message: "Usuario no autenticado"
            });
        }

        if (!tokenHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                message: "Usuario no autenticado"
            });
        }

        const token = tokenHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                message: "Usuario no autenticado"
            });
        }

        const tokenDB = await db.usuarioauths.findOne({
            where: {
                token: token
            }
        });

        if (!tokenDB) {
            return res.status(401).send({
                message: "Usuario no autenticado"
            });
        }

        // Verificación de la expiración del token
        const tokenExpirationDays = process.env.DAYS_FOR_TOKEN_EXPIRATION || 30; // Definir un valor predeterminado
        const tokenExpirationDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * tokenExpirationDays);
        if (tokenDB.createdAt < tokenExpirationDate) {
            await db.usuarioauths.destroy({
                where: {
                    token: token
                }
            });
            return res.status(401).send({
                message: "Token expirado"
            });
        }

        const user = await db.usuarios.findOne({
            where: {
                id: tokenDB.usuario_id
            }
        });

        if (!user) {
            return res.status(401).send({
                message: "Usuario no autenticado"
            });
        }

        res.locals.user = user;

        next();
    } catch (error) {
        console.error("Error en checkUserMiddleware:", error);
        res.status(500).send({
            message: "Error interno del servidor"
        });
    }
};

exports.checkAdminMiddleware = async (req, res, next) => {
    if (!res.locals.user || !res.locals.user.esAdmin) {
        return res.status(403).send({
            message: "Acceso denegado"
        });
    }

    next();
};
