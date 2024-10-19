import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
    const navigate = useNavigate();  // Obtiene el método navigate

    // Asegurarse de que `imagen_url` no es null o undefined antes de usar `startsWith`
    const imageUrl = pokemon.imagen_url && pokemon.imagen_url.startsWith('/uploads')
        ? `http://localhost:3000${pokemon.imagen_url}`
        : pokemon.imagen_url || '/default-image.png';  // Si no hay imagen_url, usa una imagen por defecto

    // Manejar el clic en el Pokémon para redirigir a la página de detalles
    const handleClick = () => {
        navigate(`/pokemones/${pokemon.id}`);  // Redirige a la página de detalles del Pokémon
    };

    return (
        <div className="pokemon-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <img src={imageUrl} alt={pokemon.nombre} className="pokemon-card-img" />
            <h3>{pokemon.nombre}</h3>
            <p>N.º {pokemon.nroPokedex}</p>
            <div className="pokemon-types">
                {pokemon.tipos && pokemon.tipos.length > 0 ? (
                    pokemon.tipos.map(tipo => (
                        <span key={tipo.nombre} className={`type-badge ${tipo.nombre.toLowerCase()}`}>
                            {tipo.nombre}
                        </span>
                    ))
                ) : (
                    <p>No hay tipos disponibles</p>
                )}
            </div>
        </div>
    );
};

// Validación de las props usando PropTypes
PokemonCard.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        imagen_url: PropTypes.string,
        nombre: PropTypes.string.isRequired,
        nroPokedex: PropTypes.number.isRequired,
        tipos: PropTypes.arrayOf(
            PropTypes.shape({
                nombre: PropTypes.string.isRequired
            })
        )
    }).isRequired
};

export default PokemonCard;
