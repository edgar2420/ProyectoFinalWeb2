import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importa los iconos
import ApiService from '../../service/ApiService';

const EditarEliminarPelicula = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchPeliculas = async () => {
            try {
                const response = await ApiService.obtenerPeliculas();
                setPeliculas(response);
            } catch (error) {
                console.error("Error al obtener las películas:", error);
                setErrorMessage('Error al cargar las películas. Intenta nuevamente.');
            }
        };

        fetchPeliculas();
    }, []);

    const eliminarPelicula = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta película?")) {
            try {
                await ApiService.eliminarPelicula(id);
                setPeliculas(peliculas.filter(pelicula => pelicula.id !== id));
            } catch (error) {
                console.error("Error al eliminar la película:", error);
                setErrorMessage('Error al eliminar la película. Intenta nuevamente.');
            }
        }
    };

    return (
        <Container className="my-5" style={{ maxWidth: '5%', minWidth: '2131px' }}>
            <h1 className="text-center mb-4">Lista de Películas</h1>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Row>
                {peliculas.map(pelicula => (
                    <Col md={4} key={pelicula.id} className="mb-4">
                        <Card style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Card.Img variant="top" src={pelicula.imagen_url} alt={pelicula.titulo} />
                            <Card.Body>
                                <Card.Title>{pelicula.titulo}</Card.Title>
                                <Card.Text>
                                    <strong>Sinopsis:</strong> {pelicula.sinopsis}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Fecha de Lanzamiento:</strong> {new Date(pelicula.fecha_lanzamiento).toLocaleDateString()}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Calificación:</strong> {pelicula.calificacion_rotten_tomatoes}%
                                </Card.Text>
                                <div className="d-flex justify-content-between mt-3">
                                    <Link to={`/editar-pelicula/${pelicula.id}`}>
                                        <Button variant="outline-primary">
                                            <FaEdit /> Editar
                                        </Button>
                                    </Link>
                                    <Button variant="outline-danger" onClick={() => eliminarPelicula(pelicula.id)}>
                                        <FaTrash /> Eliminar
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default EditarEliminarPelicula;

