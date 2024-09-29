import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { Card, Container, Row, Col, Alert } from 'react-bootstrap';

const DetallePelicula = () => {
    const { id } = useParams();
    const [pelicula, setPelicula] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

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

        fetchPelicula();
    }, [id]);

    if (errorMessage) {
        return <Alert variant="danger">{errorMessage}</Alert>;
    }

    if (!pelicula) {
        return <h2>Cargando...</h2>;
    }

    return (
        <Container className="my-5" style={{ maxWidth: '5%', minWidth: '2110px' }}>
            <Card>
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
                    <Card.Link href={pelicula.trailer_youtube_url} target="_blank" rel="noopener noreferrer">
                        Ver Trailer
                    </Card.Link>
                </Card.Body>
            </Card>

            <h3 className="mt-4">Director</h3>
            <Row>
                {pelicula.director && (
                    <Col md={4}>
                        <Card>
                            <Card.Img variant="top" src={pelicula.director.imagen_url} alt={pelicula.director.nombre} />
                            <Card.Body>
                                <Card.Title>{pelicula.director.nombre}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>

            <h3 className="mt-4">Actores</h3>
<Row>
    {pelicula.actores && pelicula.actores.length > 0 ? (
        pelicula.actores.map(actor => (
            <Col md={3} key={actor.id} className="mb-4">
                <Card>
                    <Card.Img variant="top" src={actor.imagen_url} alt={actor.nombre} />
                    <Card.Body>
                        <Card.Title>{actor.nombre}</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        ))
    ) : (
        <Col>
            <p>No se encontraron actores para esta película.</p>
        </Col>
    )}
</Row>

        </Container>
    );
};

export default DetallePelicula;
