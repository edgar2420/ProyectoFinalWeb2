import React, { useEffect, useState } from 'react';
import { Container, Alert, Card, Row, Col } from 'react-bootstrap';
import ApiService from '../../service/ApiService';

const ListaDirectores = () => {
    const [directores, setDirectores] = useState([]);
    const [error, setError] = useState('');

    // Obtener la lista de directores
    const obtenerDirectores = async () => {
        try {
            const response = await ApiService.obtenerDirectores();
            setDirectores(response);
        } catch (error) {
            console.error("Error al obtener los directores:", error);
            setError('Error al cargar la lista de directores. Intenta nuevamente.');
        }
    };

    useEffect(() => {
        obtenerDirectores();
    }, []);

    return (
        <Container className="my-5" style={{ maxWidth: '100%', minWidth: '2131px' }}>
            <h1>Lista de Directores</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                {directores.map(director => (
                    <Col key={director.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card>
                            <Card.Img 
                                variant="top" 
                                src={director.imagen_url} 
                                style={{ height: '200px', objectFit: 'cover' }}
                                alt={director.nombre}
                            />
                            <Card.Body>
                                <Card.Title>{director.nombre}</Card.Title>
                                <div>
                                    <h6>Películas:</h6>
                                    {director.peliculas.length > 0 ? (
                                        director.peliculas.map(pelicula => (
                                            <div key={pelicula.id}>{pelicula.titulo}</div>
                                        ))
                                    ) : (
                                        <div>No hay películas asociadas</div>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ListaDirectores;
