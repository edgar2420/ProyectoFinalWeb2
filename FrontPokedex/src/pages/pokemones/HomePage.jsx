import React, { useState, useEffect } from 'react';
import { getPokemones } from '../../service/pokemonService';  // Asegúrate de que la ruta sea correcta
import PokemonCard from '../../components/PokemonCard';  // Asegúrate de que la ruta sea correcta
import Pagination from '../../components/Pagination';   // Asegúrate de que la ruta sea correcta
import SearchBar from '../../components/SearchBar';     // Asegúrate de que la ruta sea correcta

const HomePage = () => {
    const [pokemones, setPokemones] = useState([]);  // Estado para almacenar los Pokémon
    const [page, setPage] = useState(1);             // Estado para la paginación actual
    const [totalPages, setTotalPages] = useState(1); // Estado para el total de páginas
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

    // Efecto para obtener los Pokémon cuando cambia la página o el término de búsqueda
    useEffect(() => {
        const fetchPokemones = async () => {
            try {
                const data = await getPokemones(page, searchTerm);  // Llama a la función del servicio
                console.log("Datos de la API:", data);  // Verifica qué datos se reciben
                setPokemones(data.pokemones);           // Actualiza el estado de los Pokémon
                setTotalPages(data.totalPages);         // Actualiza el estado del total de páginas
            } catch (error) {
                console.error("Error al obtener los pokemones:", error);  // Muestra error si ocurre
            }
        };

        fetchPokemones();
    }, [page, searchTerm]);  // Vuelve a ejecutar cuando cambian `page` o `searchTerm`

    // Manejar búsqueda
    const handleSearch = (term) => {
        setSearchTerm(term);  // Actualiza el término de búsqueda
        setPage(1);           // Resetea a la página 1 en cada nueva búsqueda
    };

    return (
        <div>
            <h1>Listado de Pokémon</h1>
            {/* Barra de búsqueda */}
            <SearchBar onSearch={handleSearch} />
            
            {/* Lista de Pokémon */}
            <div className="pokemon-list">
                {pokemones.map(pokemon => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>

            {/* Paginación */}
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    );
};

export default HomePage;
