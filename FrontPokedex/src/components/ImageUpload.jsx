import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ImageUpload = ({ onImageUpload }) => {
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        // Crear una URL de vista previa para la imagen seleccionada
        const fileUrl = URL.createObjectURL(file);
        setPreviewUrl(fileUrl);

        onImageUpload(file); // Enviar la imagen al componente padre
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            {previewUrl && <img src={previewUrl} alt="Vista previa" style={{ width: '150px', marginTop: '10px' }} />}
        </div>
    );
};

// Validación de las props con PropTypes
ImageUpload.propTypes = {
    onImageUpload: PropTypes.func.isRequired
};

export default ImageUpload;
