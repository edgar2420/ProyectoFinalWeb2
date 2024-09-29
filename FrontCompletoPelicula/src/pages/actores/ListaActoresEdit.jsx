import React, { useEffect, useState } from 'react';
import { Container, Table, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; 

const ListaActoresEdit = () => {
    const [actores, setActores] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Función para obtener la lista de actores
    const obtenerActores = async () => {
        try {
            const response = await ApiService.obtenerActores();
            setActores(response); 
            setMensaje('Actores cargados exitosamente!');
            setError('');
        } catch (error) {
            console.error("Error al obtener actores:", error);
            setError('Error al cargar actores. Intenta nuevamente.');
            setMensaje('');
        }
    };

    // Función para eliminar un actor
    const eliminarActor = async (id) => {
        try {
            await ApiService.eliminarActor(id);
            setMensaje('Actor eliminado exitosamente!');
            setError('');
            // Actualizar la lista de actores después de eliminar
            obtenerActores();
        } catch (error) {
            console.error('Error al eliminar actor:', error);
            setError('Error al eliminar actor. Intenta nuevamente.');
            setMensaje('');
        }
    };

    // Efecto para cargar los actores al montar el componente
    useEffect(() => {
        obtenerActores();
    }, []);

    // Función para redirigir a la página de edición
    const redirigirEdicion = (id) => {
        navigate(`/editar-actores/${id}`);
    };

    return (
        <Container className="my-5" style={{ maxWidth: '100%', minWidth: '2131px' }}>
            <h1>Lista de Actores</h1>
            {mensaje && <Alert variant="success">{mensaje}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Películas</th> {/* Nueva columna para películas */}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {actores.map(actor => (
                        <tr key={actor.id}>
                            <td>{actor.id}</td>
                            <td>{actor.nombre}</td>
                            <td><img src={actor.imagen_url} alt={actor.nombre} style={{ width: '50px' }} /></td>
                            <td>
                                {actor.peliculas && actor.peliculas.length > 0 ? (
                                    <ul>
                                        {actor.peliculas.map(pelicula => (
                                            <li key={pelicula.id}>
                                                <img 
                                                    src={pelicula.imagen_url} 
                                                    alt={pelicula.titulo} 
                                                    style={{ width: '50px', marginRight: '10px' }} 
                                                />
                                                {pelicula.titulo} {/* Muestra el título de cada película */}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span>No hay películas asociadas</span> // Mensaje si no hay películas
                                )}
                            </td>
                            <td>
                                <Button 
                                    variant="warning" 
                                    onClick={() => redirigirEdicion(actor.id)} 
                                    style={{ marginRight: '10px' }}
                                >
                                    Editar
                                </Button>
                                <Button 
                                    variant="danger" 
                                    onClick={() => eliminarActor(actor.id)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ListaActoresEdit;
