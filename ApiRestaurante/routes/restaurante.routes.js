module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/restaurante.controller.js");


    app.use('/restaurante', router);

};