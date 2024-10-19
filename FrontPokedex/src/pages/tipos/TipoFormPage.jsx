import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createTipo, getTipoById, updateTipo } from '../../service/tipoService';

const TipoFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tipo, setTipo] = useState({
        nombre: ''
    });

    useEffect(() => {
        if (id) {
            const fetchTipo = async () => {
                const data = await getTipoById(id);
                setTipo(data);
            };
            fetchTipo();
        }
    }, [id]);

    const handleChange = (e) => {
        setTipo({
            ...tipo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateTipo(id, tipo);
            } else {
                await createTipo(tipo);
            }
            navigate('/tipos');
        } catch (error) {
            console.error('Error al guardar el tipo:', error);
        }
    };

    return (
        <div>
            <h1>{id ? 'Editar Tipo' : 'Crear Tipo'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Tipo</label>
                    <input
                        type="text"
                        name="nombre"
                        value={tipo.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{id ? 'Actualizar' : 'Crear'} Tipo</button>
            </form>
        </div>
    );
};

export default TipoFormPage;
