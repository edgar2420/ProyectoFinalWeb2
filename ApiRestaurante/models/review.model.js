module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
        comentario: {
            type: Sequelize.STRING
        },
        puntuacion: {
            type: Sequelize.INTEGER
        },
        fecha: {
            type: Sequelize.DATE
        }
    });
    return Review;
}
