import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHabilidades, deleteHabilidad } from '../../service/habilidadService';  // Asegúrate de que deleteHabilidad esté importado

const ListHabilidadPage = () => {
    const [habilidades, setHabilidades] = useState([]);

    useEffect(() => {
        const fetchHabilidades = async () => {
            const data = await getHabilidades();
            setHabilidades(data);
        };

        fetchHabilidades();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteHabilidad(id);
            setHabilidades(habilidades.filter(habilidad => habilidad.id !== id));
        } catch (error) {
            console.error('Error al eliminar la habilidad:', error);
        }
    };

    return (
        <div>
            <h1>Listado de Habilidades</h1>
            <Link to="/habilidades/crear">Crear Nueva Habilidad</Link>
            <ul>
                {habilidades.map(habilidad => (
                    <li key={habilidad.id}>
                        {habilidad.nombre}
                        <Link to={`/habilidades/editar/${habilidad.id}`}>Editar</Link>
                        <button onClick={() => handleDelete(habilidad.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListHabilidadPage;
