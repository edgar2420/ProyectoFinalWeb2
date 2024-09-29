import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; // Base URL actualizada

const PeliculaService = {
    // Obtener la lista de películas
    obtenerPeliculas: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/peliculas`); // Ajusta la ruta según tu API
            return response.data; // Asegúrate de que los datos estén en el formato correcto
        } catch (error) {
            console.error("Error al obtener las películas:", error);
            throw error; // Vuelve a lanzar el error para que se maneje en el componente
        }
    },

    // Obtener una película por ID
    obtenerPeliculaPorId: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/peliculas/${id}`); // Asegúrate de que la ruta sea correcta
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
            throw error; // Lanza el error para manejarlo en el componente
        }
    },

    // Actualizar una película existente
    updatePelicula: async (id, peliculaData) => {
        try {
            const response = await axios.put(`${BASE_URL}/peliculas/${id}`, peliculaData);
            return response.data; // Retorna la película actualizada
        } catch (error) {
            console.error('Error al actualizar la película:', error);
            return { error: error.message }; // Retorna el error como objeto
        }
    },

    // Eliminar una película
    eliminarPelicula: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/peliculas/${id}`);
            return response.data; // Retorna un mensaje de éxito o confirmación
        } catch (error) {
            console.error('Error al eliminar la película:', error);
            return { error: error.message };
        }
    },

    // Obtener todos los directores
    obtenerDirectores: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/directores`);
            return response.data; // Retorna la lista de directores
        } catch (error) {
            console.error('Error al obtener los directores:', error);
            throw error; // Lanza el error para manejarlo en el componente
        }
    },

    // Obtener todos los actores
    obtenerActores: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/actores`);
            return response.data; // Retorna la lista de actores
        } catch (error) {
            console.error('Error al obtener los actores:', error);
            throw error; // Lanza el error para manejarlo en el componente
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
            return response.data; // Retorna el director creado
        } catch (error) {
            console.error('Error al crear el director:', error);
            throw error; // Lanza el error para manejarlo en el componente
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
       updateDirector: async (id, directorData) => {
        try {
            const response = await axios.put(`${BASE_URL}/directores/${id}`, directorData);
            return response.data; 
        } catch (error) {
            console.error('Error al actualizar el director:', error);
            return { error: error.message }; 
        }
    },

    // Actualizar un actor existente
    updateActor: async (id, actorData) => {
        try {
            const response = await axios.put(`${BASE_URL}/actores/${id}`, actorData);
            return response.data; 
        } catch (error) {
            console.error('Error al actualizar el actor:', error);
            return { error: error.message }; 
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
};


export default PeliculaService;
