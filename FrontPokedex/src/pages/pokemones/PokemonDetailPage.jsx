import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonById } from '../../service/pokemonService';  // Ruta corregida
import EvolucionPage from './EvolucionPage';                     // Esto está bien si EvolucionPage está en el mismo directorio

const PokemonDetailPage = () => {
    const { id } = useParams();  // Obtener el ID del Pokémon desde la URL
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const data = await getPokemonById(id);
                console.log("Datos del Pokémon:", data);  // Verificar los datos del Pokémon
                setPokemon(data);
            } catch (error) {
                console.error("Error al obtener Pokémon:", error);
            }
        };
        fetchPokemon();
    }, [id]);

    if (!pokemon) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            {/* Nombre del Pokémon y número en la Pokedex */}
            <h1>{pokemon.nombre} N.º {pokemon.nroPokedex}</h1>

            {/* Imagen del Pokémon */}
            <img src={pokemon.imagen_url ? `http://localhost:3000${pokemon.imagen_url}` : '/default-image.png'} alt={pokemon.nombre} />

            {/* Descripción del Pokémon */}
            <p>{pokemon.descripcion}</p>

            {/* Tipos del Pokémon */}
            <h3>Tipos:</h3>
            {pokemon.tipos?.length > 0 ? (
                pokemon.tipos.map(tipo => <span key={tipo.id} style={{ marginRight: '5px' }}>{tipo.nombre}</span>)
            ) : (
                <p>No hay tipos disponibles</p>
            )}

            {/* Habilidades del Pokémon */}
            <h3>Habilidades:</h3>
            {pokemon.habilidades?.length > 0 ? (
                pokemon.habilidades.map(habilidad => <span key={habilidad.id} style={{ marginRight: '5px' }}>{habilidad.nombre}</span>)
            ) : (
                <p>No hay habilidades disponibles</p>
            )}

            {/* Estadísticas base del Pokémon */}
            <h3>Estadísticas Base:</h3>
            <table>
                <tbody>
                    <tr>
                        <td><strong>HP:</strong></td>
                        <td>{pokemon.hp}</td>
                    </tr>
                    <tr>
                        <td><strong>Ataque:</strong></td>
                        <td>{pokemon.attack}</td>
                    </tr>
                    <tr>
                        <td><strong>Defensa:</strong></td>
                        <td>{pokemon.defense}</td>
                    </tr>
                    <tr>
                        <td><strong>Ataque Especial:</strong></td>
                        <td>{pokemon.spattack}</td>
                    </tr>
                    <tr>
                        <td><strong>Defensa Especial:</strong></td>
                        <td>{pokemon.spdefense}</td>
                    </tr>
                    <tr>
                        <td><strong>Velocidad:</strong></td>
                        <td>{pokemon.speed}</td>
                    </tr>
                    <tr>
                        <td><strong>Nivel de Evolución:</strong></td>
                        <td>{pokemon.nivelEvolucion}</td>
                    </tr>
                </tbody>
            </table>

            {/* Línea Evolutiva */}
            <h3>Línea Evolutiva:</h3>
            <EvolucionPage pokemonId={pokemon.id} />
        </div>
    );
};

export default PokemonDetailPage;
