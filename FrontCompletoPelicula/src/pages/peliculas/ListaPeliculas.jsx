import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link
import ApiService from '../../service/ApiService';

const ListaPeliculas = () => {
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

    return (
        <Container className="my-5" style={{ maxWidth: '5%', minWidth: '2131px' }}>
            <h1 className="text-center mb-4">Lista de Películas</h1>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Row>
                {peliculas.map(pelicula => (
                    <Col md={4} key={pelicula.id} className="mb-4">
                        <Card as={Link} to={`/peliculas/${pelicula.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                                <Card.Link href={pelicula.trailer_youtube_url} target="_blank">Ver Trailer</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ListaPeliculas;
