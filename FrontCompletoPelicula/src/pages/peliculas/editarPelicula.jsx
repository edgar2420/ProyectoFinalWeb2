import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import Select from 'react-select'; // Asegúrate de instalar react-select
import ApiService from '../../service/ApiService';

const EditarPelicula = () => {
    const { id } = useParams();
    const [pelicula, setPelicula] = useState({
        titulo: '',
        sinopsis: '',
        fecha_lanzamiento: '',
        imagen_url: '',
        calificacion_rotten_tomatoes: '',
        trailer_youtube_url: '',
        directorId: '',
        actores: []
    });
    const [actoresOptions, setActoresOptions] = useState([]);
    const [directoresOptions, setDirectoresOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPelicula = async () => {
            try {
                const response = await ApiService.obtenerPeliculaPorId(id);
                setPelicula(response);
            } catch (error) {
                console.error("Error al obtener la película:", error);
                setErrorMessage('Error al cargar la película. Intenta nuevamente.');
            }
        };

        const fetchActores = async () => {
            try {
                const response = await ApiService.obtenerActores(); // Asegúrate de tener este método
                const options = response.map(actor => ({
                    value: actor.id,
                    label: actor.nombre // Ajusta según la propiedad que contenga el nombre
                }));
                setActoresOptions(options);
            } catch (error) {
                console.error("Error al obtener actores:", error);
                setErrorMessage('Error al cargar actores. Intenta nuevamente.');
            }
        };

        const fetchDirectores = async () => {
            try {
                const response = await ApiService.obtenerDirectores(); // Asegúrate de tener este método
                const options = response.map(director => ({
                    value: director.id,
                    label: director.nombre // Ajusta según la propiedad que contenga el nombre
                }));
                setDirectoresOptions(options);
            } catch (error) {
                console.error("Error al obtener directores:", error);
                setErrorMessage('Error al cargar directores. Intenta nuevamente.');
            }
        };

        fetchPelicula();
        fetchActores();
        fetchDirectores();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPelicula((prev) => ({ ...prev, [name]: value }));
    };

    const handleActoresChange = (selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setPelicula((prev) => ({ ...prev, actores: selectedValues })); // Se guardan los IDs de los actores
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedPelicula = {
            ...pelicula,
            directorId: pelicula.directorId,
            actores: pelicula.actores
        };

        console.log("Datos de película que se envían:", updatedPelicula); // Verifica los datos

        try {
            await ApiService.updatePelicula(id, updatedPelicula); // Cambiado a updatePelicula
            navigate('/peliculas/editar'); // Redirige a la lista de películas
        } catch (error) {
            console.error("Error al editar la película:", error);
            setErrorMessage('Error al editar la película. Intenta nuevamente.');
        }
    };

    return (
        <div>
            <h1>Editar Película</h1>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="titulo">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        name="titulo"
                        value={pelicula.titulo}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="sinopsis">
                    <Form.Label>Sinopsis</Form.Label>
                    <Form.Control
                        type="text"
                        name="sinopsis"
                        value={pelicula.sinopsis}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="fecha_lanzamiento">
                    <Form.Label>Fecha de Lanzamiento</Form.Label>
                    <Form.Control
                        type="date"
                        name="fecha_lanzamiento"
                        value={pelicula.fecha_lanzamiento.split('T')[0]}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="imagen_url">
                    <Form.Label>URL de la Imagen</Form.Label>
                    <Form.Control
                        type="text"
                        name="imagen_url"
                        value={pelicula.imagen_url}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="calificacion_rotten_tomatoes">
                    <Form.Label>Calificación Rotten Tomatoes (%)</Form.Label>
                    <Form.Control
                        type="number"
                        name="calificacion_rotten_tomatoes"
                        value={pelicula.calificacion_rotten_tomatoes}
                        onChange={handleChange}
                        min="0"
                        max="100"
                    />
                </Form.Group>
                <Form.Group controlId="trailer_youtube_url">
                    <Form.Label>URL del Trailer de YouTube</Form.Label>
                    <Form.Control
                        type="text"
                        name="trailer_youtube_url"
                        value={pelicula.trailer_youtube_url}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="directorId">
                    <Form.Label>Director</Form.Label>
                    <Select
                        options={directoresOptions}
                        onChange={(option) => setPelicula({ ...pelicula, directorId: option.value })} // Se actualiza correctamente
                        value={directoresOptions.find(option => option.value === pelicula.directorId)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="actores">
                    <Form.Label>Actores</Form.Label>
                    <Select
                        isMulti
                        options={actoresOptions}
                        onChange={handleActoresChange}
                        value={actoresOptions.filter(option => pelicula.actores.includes(option.value))}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Guardar Cambios
                </Button>
            </Form>
        </div>
    );
};

export default EditarPelicula;
