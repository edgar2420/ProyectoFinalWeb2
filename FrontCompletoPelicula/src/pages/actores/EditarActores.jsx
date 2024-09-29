import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; // Asegúrate de que la ruta sea correcta

const EditarActor = () => {
    const { id } = useParams(); // Obtiene el ID del actor desde la URL
    const [nombre, setNombre] = useState(''); // Estado para el nombre
    const [imagenUrl, setImagenUrl] = useState(''); // Estado para la imagen
    const [nombreOriginal, setNombreOriginal] = useState(''); // Estado para el nombre original
    const [imagenUrlOriginal, setImagenUrlOriginal] = useState(''); // Estado para la imagen original
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Función para obtener los datos del actor
    const obtenerDatosActor = async () => {
        try {
            const response = await ApiService.obtenerActorPorId(id); // Llama a la función correcta
            setNombre(response.nombre); // Asigna el nombre
            setImagenUrl(response.imagen_url); // Asigna la imagen
            setNombreOriginal(response.nombre); // Guarda el nombre original
            setImagenUrlOriginal(response.imagen_url); // Guarda la imagen original
        } catch (error) {
            console.error("Error al obtener los datos del actor:", error);
            setError('No se pudo cargar el actor.');
        }
    };

    // Efecto para cargar los datos al montar el componente
    useEffect(() => {
        obtenerDatosActor();
    }, [id]);

    // Función para manejar el envío del formulario
    const manejarEnvio = async (e) => {
        e.preventDefault();

        // Solo actualiza los campos cambiados
        const actorActualizado = {};

        // Si el nombre cambió, se agrega
        if (nombre && nombre !== nombreOriginal) {
            actorActualizado.nombre = nombre;
        }

        // Si la imagen cambió, se agrega
        if (imagenUrl && imagenUrl !== imagenUrlOriginal) {
            actorActualizado.imagen_url = imagenUrl;
        }

        try {
            if (Object.keys(actorActualizado).length > 0) {
                await ApiService.actualizarActor(id, actorActualizado);
            }
            navigate('/actores');
        } catch (error) {
            console.error('Error al actualizar el actor:', error);
            setError('Error al actualizar el actor.');
        }
    };

    return (
        <div>
            <h1>Editar Actor</h1>
            {error && <p>{error}</p>}
            <form onSubmit={manejarEnvio}>
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div>
                    <label>Imagen URL</label>
                    <input
                        type="text"
                        value={imagenUrl}
                        onChange={(e) => setImagenUrl(e.target.value)}
                    />
                </div>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditarActor;
