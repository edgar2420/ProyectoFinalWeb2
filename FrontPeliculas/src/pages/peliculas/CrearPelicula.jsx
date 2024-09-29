import React, { useState, useEffect } from 'react';
import { Container, Alert, Form, Button, Row, Col } from 'react-bootstrap';
import ApiService from '../../service/ApiService';

const CrearPelicula = () => {
    const [titulo, setTitulo] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [fechaLanzamiento, setFechaLanzamiento] = useState('');
    const [imagenUrl, setImagenUrl] = useState('');
    const [calificacion, setCalificacion] = useState('');
    const [trailerUrl, setTrailerUrl] = useState('');
    const [directores, setDirectores] = useState([]);
    const [actores, setActores] = useState([]);
    const [selectedDirector, setSelectedDirector] = useState('');
    const [selectedActores, setSelectedActores] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const directorsResponse = await ApiService.obtenerDirectores();
                const actorsResponse = await ApiService.obtenerActores();
                setDirectores(directorsResponse);
                setActores(actorsResponse);
            } catch (error) {
                console.error("Error al obtener directores o actores:", error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ApiService.crearPelicula({
                titulo,
                sinopsis,
                fecha_lanzamiento: fechaLanzamiento,
                imagen_url: imagenUrl,
                calificacion_rotten_tomatoes: calificacion,
                trailer_youtube_url: trailerUrl,
                directorId: selectedDirector,
                actores: selectedActores,
            });
            setSuccessMessage('¡Película creada exitosamente!');
            setTitulo('');
            setSinopsis('');
            setFechaLanzamiento('');
            setImagenUrl('');
            setCalificacion('');
            setTrailerUrl('');
            setSelectedDirector('');
            setSelectedActores([]);
            setErrorMessage('');
        } catch (error) {
            console.error("Error al crear la película:", error);
            setErrorMessage('Error al crear la película. Intenta nuevamente.');
            setSuccessMessage('');
        }
    };

    return (
        <Container className="my-5" style={{ maxWidth: '5%', minWidth: '2131px' }}>
            <h1 className="text-center mb-4">Crear Película</h1>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formTitulo" className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Título"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formFechaLanzamiento" className="mb-3">
                            <Form.Label>Fecha de Lanzamiento</Form.Label>
                            <Form.Control
                                type="date"
                                value={fechaLanzamiento}
                                onChange={(e) => setFechaLanzamiento(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="formSinopsis" className="mb-3">
                    <Form.Label>Sinopsis</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Sinopsis"
                        value={sinopsis}
                        onChange={(e) => setSinopsis(e.target.value)}
                    />
                </Form.Group>

                <Row>
                    <Col md={4}>
                        <Form.Group controlId="formImagenUrl" className="mb-3">
                            <Form.Label>URL de la Imagen</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Imagen URL"
                                value={imagenUrl}
                                onChange={(e) => setImagenUrl(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formCalificacion" className="mb-3">
                            <Form.Label>Calificación (Rotten Tomatoes)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Calificación"
                                value={calificacion}
                                onChange={(e) => setCalificacion(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formTrailerUrl" className="mb-3">
                            <Form.Label>Trailer (YouTube)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Trailer URL"
                                value={trailerUrl}
                                onChange={(e) => setTrailerUrl(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="formDirectores" className="mb-3">
                    <Form.Label>Seleccionar Director</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedDirector}
                        onChange={(e) => setSelectedDirector(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un director</option>
                        {directores.map(director => (
                            <option key={director.id} value={director.id}>
                                {director.nombre}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formActores" className="mb-3">
                    <Form.Label>Seleccionar Actores</Form.Label>
                    <Form.Control
                        as="select"
                        multiple
                        value={selectedActores}
                        onChange={(e) => {
                            const options = e.target.options;
                            const selectedValues = [];
                            for (let i = 0; i < options.length; i++) {
                                if (options[i].selected) {
                                    selectedValues.push(options[i].value);
                                }
                            }
                            setSelectedActores(selectedValues);
                        }}
                    >
                        {actores.map(actor => (
                            <option key={actor.id} value={actor.id}>
                                {actor.nombre}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Crear Película
                </Button>
            </Form>
        </Container>
    );
};

export default CrearPelicula;
