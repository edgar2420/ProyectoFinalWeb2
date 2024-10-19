import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTipos, deleteTipo } from '../../service/tipoService';

const ListTipoPage = () => {
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        const fetchTipos = async () => {
            const data = await getTipos();
            setTipos(data);
        };

        fetchTipos();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteTipo(id);
            setTipos(tipos.filter(tipo => tipo.id !== id));
        } catch (error) {
            console.error('Error al eliminar el tipo:', error);
        }
    };

    return (
        <div>
            <h1>Listado de Tipos</h1>
            <Link to="/tipos/crear">Crear Nuevo Tipo</Link>
            <ul>
                {tipos.map(tipo => (
                    <li key={tipo.id}>
                        {tipo.nombre}
                        <Link to={`/tipos/edit/${tipo.id}`}>Editar</Link>
                        <button onClick={() => handleDelete(tipo.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListTipoPage;
