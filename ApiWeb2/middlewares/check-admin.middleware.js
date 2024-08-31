const db = require("../models");

exports.checkAdminMiddleware = async (req, res, next) => {
    if (!res.locals.user || !res.locals.user.esAdmin) {
        return res.status(403).send({
            message: "Acceso denegado"
        });
    }

    next();
};
