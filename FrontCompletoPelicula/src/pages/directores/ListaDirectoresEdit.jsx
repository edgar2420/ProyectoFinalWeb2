import React, { useEffect, useState } from 'react';
import { Container, Alert, Card, Row, Col, Button } from 'react-bootstrap';
import ApiService from '../../service/ApiService';
import { useNavigate } from 'react-router-dom';

const ListaDirectoresEdit = () => {
    const [directores, setDirectores] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    // Función para eliminar un director
    const eliminarDirector = async (id) => {
        try {
            await ApiService.eliminarDirector(id);
            obtenerDirectores();
        } catch (error) {
            console.error('Error al eliminar director:', error);
            setError('Error al eliminar director. Intenta nuevamente.');
        }
    };

    const redirigirEdicion = (id) => {
        navigate(`/editar-director/${id}`);
    };
    useEffect(() => {
        obtenerDirectores();
    }, []);

    const manejarActualizacion = () => {
        obtenerDirectores();
    };

    return (
        <Container className="my-5" style={{ maxWidth: '100%', minWidth: '2131px' }}>
            <h1>Lista de Directores</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                {directores.map(director => (
                    <Col key={director.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={director.imagen_url} />
                            <Card.Body>
                                <Card.Title>{director.nombre}</Card.Title>
                                <div>
                                    <h6>Películas:</h6>
                                    {director.peliculas.map(pelicula => (
                                        <div key={pelicula.id}>{pelicula.titulo}</div>
                                    ))}
                                </div>
                                <div className="mt-3">
                                    <Button 
                                        variant="warning" 
                                        onClick={() => {
                                            redirigirEdicion(director.id);
                                            manejarActualizacion();
                                        }} 
                                        style={{ marginRight: '10px' }}
                                    >
                                        Editar
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        onClick={() => eliminarDirector(director.id)}
                                    >
                                        Eliminar
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

export default ListaDirectoresEdit;
