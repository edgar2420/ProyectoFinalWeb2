// Función para generar un código aleatorio de 4 caracteres
exports.generarCodigo = () => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const longitudCodigo = 4;
    return Array.from({ length: longitudCodigo }, () => 
        caracteres.charAt(Math.floor(Math.random() * caracteres.length))
    ).join('');
};

// Función para generar un token de usuario aleatorio de 20 caracteres
exports.generarTokenUsuario = () => {
    const caracteres = "abcdefghijklmnopqrstuvwxyz0123456789";
    const longitudToken = 20;
    return Array.from({ length: longitudToken }, () => 
        caracteres.charAt(Math.floor(Math.random() * caracteres.length))
    ).join('');
};
