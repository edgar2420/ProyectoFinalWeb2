import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; // Asegúrate de que la ruta sea correcta
import { Container, Form, Button, Alert, ListGroup, Row, Col } from 'react-bootstrap';

const EditDirectores = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [imagenUrl, setImagenUrl] = useState('');
    const [peliculas, setPeliculas] = useState([]);
    const [todasLasPeliculas, setTodasLasPeliculas] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Función para obtener los datos del director
    const obtenerDatosDirector = async () => {
        try {
            const response = await ApiService.obtenerDirectorPorId(id);
            setNombre(response.nombre);
            setImagenUrl(response.imagen_url);
            setPeliculas(response.peliculas || []);
        } catch (error) {
            console.error("Error al obtener los datos del director:", error);
            setError('No se pudo cargar el director.');
        }
    };

    // Función para obtener todas las películas
    const obtenerTodasLasPeliculas = async () => {
        try {
            const response = await ApiService.obtenerPeliculas();
            setTodasLasPeliculas(response);
        } catch (error) {
            console.error("Error al obtener todas las películas:", error);
            setError('No se pudieron cargar las películas.');
        }
    };

    useEffect(() => {
        obtenerDatosDirector();
        obtenerTodasLasPeliculas();
    }, [id]);

    // Función para manejar el envío del formulario
    const manejarEnvio = async (e) => {
        e.preventDefault();
        const directorActualizado = {
            nombre,
            imagen_url: imagenUrl,
            peliculas
        };

        try {
            await ApiService.actualizarDirector(id, directorActualizado);
            navigate('/directores');
        } catch (error) {
            console.error('Error al actualizar el director:', error);
            setError('Error al actualizar el director.');
        }
    };

    // Función para manejar el cambio en los títulos de las películas
    const manejarCambioTitulo = (index, nuevoTitulo) => {
        const peliculasActualizadas = [...peliculas];
        peliculasActualizadas[index].titulo = nuevoTitulo;
        setPeliculas(peliculasActualizadas);
    };


    const manejarSeleccionPelicula = (pelicula) => {
        const yaSeleccionada = peliculas.find(p => p.id === pelicula.id);
        if (yaSeleccionada) {
            setPeliculas(peliculas.filter(p => p.id !== pelicula.id));
        } else {
            setPeliculas([...peliculas, pelicula]);
        }
    };

    return (
        <Container className="my-5" style={{ maxWidth: '5%', minWidth: '2131px' }}>
            <h1>Editar Director</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={manejarEnvio}>
                <Form.Group controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formImagenUrl">
                    <Form.Label>Imagen URL</Form.Label>
                    <Form.Control
                        type="text"
                        value={imagenUrl}
                        onChange={(e) => setImagenUrl(e.target.value)}
                        required
                    />
                </Form.Group>

                <h5 className="mt-4">Películas del Director</h5>
                <ListGroup className="mb-3">
                    {peliculas.length > 0 ? (
                        peliculas.map((pelicula, index) => (
                            <ListGroup.Item key={pelicula.id}>
                                <Form.Control
                                    type="text"
                                    value={pelicula.titulo}
                                    onChange={(e) => manejarCambioTitulo(index, e.target.value)}
                                    required
                                />
                            </ListGroup.Item>
                        ))
                    ) : (
                        <p>No hay películas asociadas a este director.</p>
                    )}
                </ListGroup>

                <h5 className="mt-4">Seleccionar Películas Disponibles</h5>
                <Row>
                    {todasLasPeliculas.map((pelicula) => (
                        <Col key={pelicula.id} xs={6} md={4} lg={3}>
                            <Form.Check
                                type="checkbox"
                                label={pelicula.titulo}
                                checked={peliculas.some(p => p.id === pelicula.id)}
                                onChange={() => manejarSeleccionPelicula(pelicula)}
                            />
                        </Col>
                    ))}
                </Row>

                <Button variant="primary" type="submit" className="mt-3">
                    Guardar Cambios
                </Button>
            </Form>
        </Container>
    );
};

export default EditDirectores;
