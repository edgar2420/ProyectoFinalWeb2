import React, { useEffect, useState } from 'react';
import { Container, Table, Alert, Button } from 'react-bootstrap';
import ApiService from '../../service/ApiService'; // Asegúrate de que la ruta sea correcta

const ListaActores = () => {
    const [actores, setActores] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Función para obtener la lista de actores
    const obtenerActores = async () => {
        try {
            const response = await ApiService.obtenerActores();
            setActores(response); // Guarda la lista de actores en el estado
            setMensaje('Actores cargados exitosamente!');
            setError('');
        } catch (error) {
            console.error("Error al obtener actores:", error);
            setError('Error al cargar actores. Intenta nuevamente.');
            setMensaje('');
        }
    };

    // Efecto para cargar los actores al montar el componente
    useEffect(() => {
        obtenerActores();
    }, []);

    // Función para eliminar un actor
    const eliminarActor = async (id) => {
        try {
            await ApiService.eliminarActor(id); // Llama a la función para eliminar el actor
            setActores(actores.filter(actor => actor.id !== id)); // Filtra el actor eliminado
            setMensaje('Actor eliminado exitosamente!');
        } catch (error) {
            console.error("Error al eliminar el actor:", error);
            setError('Error al eliminar el actor. Intenta nuevamente.');
        }
    };

    return (
        <Container className="my-5" style={{ maxWidth: '5%', minWidth: '2131px' }}>
            <h1>Lista de Actores</h1>
            {mensaje && <Alert variant="success">{mensaje}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Imagen</th>
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
                                <Button variant="danger" onClick={() => eliminarActor(actor.id)}>
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

export default ListaActores;
