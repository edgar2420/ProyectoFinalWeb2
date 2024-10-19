import axios from 'axios';

const API_URL = 'http://localhost:3000/api/pokemones';

export const getPokemonById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo el Pokémon con ID ${id}:`, error);
        throw error;
    }
};

export const createPokemon = async (pokemonData) => {
    try {
        const response = await axios.post(API_URL, pokemonData);
        return response.data;
    } catch (error) {
        console.error("Error creando el Pokémon:", error);
        throw error;
    }
};

export const updatePokemon = async (id, pokemonData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, pokemonData);
        return response.data;
    } catch (error) {
        console.error("Error actualizando el Pokémon:", error);
        throw error;
    }
};

// Función para obtener la lista de Pokémon
export const getPokemones = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo los pokemones:', error);
        throw error;
    }
};

