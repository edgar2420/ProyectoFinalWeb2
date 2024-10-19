import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getEvolucionByPokemonId = async (pokemonId) => {
    try {
        const response = await axios.get(`${API_URL}/evoluciones/pokemon/${pokemonId}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo la evolución del Pokémon con ID ${pokemonId}:`, error);
        throw error;
    }
};

export const createOrUpdateEvolucion = async (pokemonId, formData) => {
    try {
        const response = await axios.post(`${API_URL}/pokemones/${pokemonId}/evoluciones`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creando/actualizando la evolución:', error);
        throw error;
    }
};
