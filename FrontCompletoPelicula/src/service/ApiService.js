import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

const PeliculaService = {
    // Obtener la lista de películas
    obtenerPeliculas: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/peliculas`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener las películas:", error);
            throw error;
        }
    },

    // Obtener una película por ID
    obtenerPeliculaPorId: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/peliculas/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener la película por ID:", error);
            throw error;
        }
    },

    // Crear una nueva película
    crearPelicula: async (peliculaData) => {
        try {
            const response = await axios.post(`${BASE_URL}/peliculas`, peliculaData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data; // Retorna la nueva película creada
        } catch (error) {
            console.error('Error al crear la película:', error);
            throw error;
        }
    },

    // Actualizar una película existente
    updatePelicula: async (id, peliculaData) => {
        try {
            const response = await axios.put(`${BASE_URL}/peliculas/${id}`, peliculaData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar la película:', error);
            return { error: error.message };
        }
    },

    // Eliminar una película
    eliminarPelicula: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/peliculas/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar la película:', error);
            return { error: error.message };
        }
    },

    // Obtener todos los directores
    obtenerDirectores: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/directores`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los directores:', error);
            throw error;
        }
    },

    // Obtener todos los actores
    obtenerActores: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/actores`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los actores:', error);
            throw error;
        }
    },
    // Crear un nuevo director
    crearDirector: async (directorData) => {
        try {
            const response = await axios.post(`${BASE_URL}/directores`, directorData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear el director:', error);
            throw error;
        }
    },

        // Crear un nuevo actor
        crearActor: async (actorData) => {
            try {
                const response = await axios.post(`${BASE_URL}/actores`, actorData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                return response.data;
            } catch (error) {
                console.error('Error al crear el actor:', error);
                throw error;
            }
        },
       // Actualizar un director existente
    actualizarDirector: async (id, directorData) => {
        try {
            const response = await axios.put(`${BASE_URL}/directores/${id}`, directorData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el director:', error);
            return { error: error.message };
        }
    },
    obtenerDirectorPorId: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/directores/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener el director:", error);
            throw error;
        }
    },

    // Actualizar un actor existente
    actualizarActor: async (id, actorData) => {
        try {
            const response = await axios.put(`${BASE_URL}/actores/${id}`, actorData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el actor:', error);
            throw error;
        }
},

    // Eliminar un director
    eliminarDirector: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/directores/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar el director:', error);
            return { error: error.message };
        }
    },

    // Eliminar un actor
    eliminarActor: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/actores/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar el actor:', error);
            return { error: error.message };
        }
    },

    obtenerActorPorId: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/actores/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener el actor:", error);
            throw error;
        }
},

};


export default PeliculaService;
