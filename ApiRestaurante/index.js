const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fileUpload = require('express-fileupload');

// Middleware para analizar el cuerpo de las solicitudes (formulario POST)
app.use(bodyParser.urlencoded({ extended: false }));

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Configurar la carpeta de archivos estáticos
app.use(express.static('public'));

// Middleware de express-fileupload (si es necesario en el futuro)
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

// Conectar la base de datos y sincronizar los modelos
const db = require("./models");
db.sequelize.sync().then(() => {
    console.log("DB resync");
});

// Redirigir al formulario de inicio de sesión
app.get('/', function (req, res) {
    res.redirect('/usuario/iniciar-sesion'); // Redirigir a la ruta de iniciar sesión
});

// Cargar las rutas
require('./routes')(app);

// Iniciar el servidor
app.listen(3000, function () {
    console.log('Ingrese a http://localhost:3000');
});



