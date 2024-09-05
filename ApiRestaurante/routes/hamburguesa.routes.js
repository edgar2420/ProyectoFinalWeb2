module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/hamburguesa.controller.js");


    app.use('/hamburguesa', router);

};