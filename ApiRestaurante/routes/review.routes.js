module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/review.controller.js");


    app.use('/review', router);

};