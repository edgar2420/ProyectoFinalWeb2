module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.INTEGER
        }
    });
    return Usuario;
}
