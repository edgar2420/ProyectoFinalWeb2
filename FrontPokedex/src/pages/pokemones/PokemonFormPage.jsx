import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPokemon, getPokemonById, updatePokemon } from '../../service/pokemonService';
import { getTipos } from '../../service/tipoService';
import { getHabilidades } from '../../service/habilidadService';

const PokemonFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [pokemon, setPokemon] = useState({
        nombre: '',
        nroPokedex: '',
        descripcion: '',
        hp: '',
        attack: '',
        defense: '',
        spattack: '',
        spdefense: '',
        speed: '',
        nivelEvolucion: '',
        idEvPrevia: '',
        idEvSiguiente: '',
        idTipo1: '',
        idTipo2: '',
        idHabilidad1: '',
        idHabilidad2: '',
        idHabilidad3: ''
    });

    const [imagen, setImagen] = useState(null); // Estado para la imagen
    const [tipos, setTipos] = useState([]);
    const [habilidades, setHabilidades] = useState([]);
    const [error, setError] = useState(null);  // Para manejar los errores

    useEffect(() => {
        // Obtener los tipos y habilidades
        const fetchData = async () => {
            try {
                const tiposData = await getTipos();
                const habilidadesData = await getHabilidades();
                setTipos(tiposData);
                setHabilidades(habilidadesData);
            // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError('Error cargando tipos o habilidades');
            }
        };

        fetchData();

        if (id) {
            // Si existe un ID, estamos en modo edición
            const fetchPokemon = async () => {
                try {
                    const data = await getPokemonById(id);
                    setPokemon(data);
                // eslint-disable-next-line no-unused-vars
                } catch (err) {
                    setError('Error cargando el Pokémon');
                }
            };
            fetchPokemon();
        }
    }, [id]);

    const handleChange = (e) => {
        setPokemon({
            ...pokemon,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setImagen(e.target.files[0]); // Guardar el archivo de imagen en el estado
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones simples antes de enviar el formulario
        if (!pokemon.nombre || !pokemon.nroPokedex || !pokemon.hp || !pokemon.attack || !pokemon.defense) {
            setError("Todos los campos obligatorios deben ser completados.");
            return;
        }

        if (pokemon.hp < 0 || pokemon.attack < 0 || pokemon.defense < 0 || pokemon.spattack < 0 || pokemon.spdefense < 0 || pokemon.speed < 0) {
            setError("Las estadísticas no pueden ser valores negativos.");
            return;
        }

        try {
            const formData = new FormData(); // Crear el objeto FormData
            formData.append('data', JSON.stringify(pokemon)); // Añadir los datos del Pokémon
            if (imagen) {
                formData.append('imagen', imagen); // Añadir la imagen si existe
            }

            if (id) {
                await updatePokemon(id, formData); // Actualizar Pokémon con imagen
            } else {
                await createPokemon(formData); // Crear Pokémon con imagen
            }

            navigate('/pokemones');  // Navega a la lista de Pokémon
        } catch (error) {
            setError('Error al guardar el Pokémon');
            console.error('Error al guardar el Pokémon:', error);
        }
    };

    return (
        <div>
            <h1>{id ? 'Editar Pokémon' : 'Crear Pokémon'}</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                {/* Nombre */}
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={pokemon.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Número de Pokedex */}
                <div>
                    <label>Número de Pokedex</label>
                    <input
                        type="number"
                        name="nroPokedex"
                        value={pokemon.nroPokedex}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Descripción */}
                <div>
                    <label>Descripción</label>
                    <textarea
                        name="descripcion"
                        value={pokemon.descripcion}
                        onChange={handleChange}
                    />
                </div>

                {/* Estadísticas */}
                <div>
                    <label>HP</label>
                    <input
                        type="number"
                        name="hp"
                        value={pokemon.hp}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Ataque</label>
                    <input
                        type="number"
                        name="attack"
                        value={pokemon.attack}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Defensa</label>
                    <input
                        type="number"
                        name="defense"
                        value={pokemon.defense}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Ataque Especial</label>
                    <input
                        type="number"
                        name="spattack"
                        value={pokemon.spattack}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Defensa Especial</label>
                    <input
                        type="number"
                        name="spdefense"
                        value={pokemon.spdefense}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Velocidad</label>
                    <input
                        type="number"
                        name="speed"
                        value={pokemon.speed}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Evoluciones */}
                <div>
                    <label>Nivel de Evolución</label>
                    <input
                        type="number"
                        name="nivelEvolucion"
                        value={pokemon.nivelEvolucion}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Pokémon Previo (ID)</label>
                    <input
                        type="number"
                        name="idEvPrevia"
                        value={pokemon.idEvPrevia}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Pokémon Siguiente (ID)</label>
                    <input
                        type="number"
                        name="idEvSiguiente"
                        value={pokemon.idEvSiguiente}
                        onChange={handleChange}
                    />
                </div>

                {/* Tipos */}
                <div>
                    <label>Tipo 1</label>
                    <select name="idTipo1" value={pokemon.idTipo1} onChange={handleChange} required>
                        <option value="">Seleccione un tipo</option>
                        {tipos.map(tipo => (
                            <option key={tipo.id} value={tipo.id}>
                                {tipo.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Tipo 2</label>
                    <select name="idTipo2" value={pokemon.idTipo2} onChange={handleChange}>
                        <option value="">Seleccione un tipo</option>
                        {tipos.map(tipo => (
                            <option key={tipo.id} value={tipo.id}>
                                {tipo.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Habilidades */}
                <div>
                    <label>Habilidad 1</label>
                    <select name="idHabilidad1" value={pokemon.idHabilidad1} onChange={handleChange} required>
                        <option value="">Seleccione una habilidad</option>
                        {habilidades.map(habilidad => (
                            <option key={habilidad.id} value={habilidad.id}>
                                {habilidad.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Habilidad 2</label>
                    <select name="idHabilidad2" value={pokemon.idHabilidad2} onChange={handleChange}>
                        <option value="">Seleccione una habilidad</option>
                        {habilidades.map(habilidad => (
                            <option key={habilidad.id} value={habilidad.id}>
                                {habilidad.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Habilidad 3</label>
                    <select name="idHabilidad3" value={pokemon.idHabilidad3} onChange={handleChange}>
                        <option value="">Seleccione una habilidad</option>
                        {habilidades.map(habilidad => (
                            <option key={habilidad.id} value={habilidad.id}>
                                {habilidad.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Imagen */}
                <div>
                    <label>Imagen</label>
                    <input
                        type="file"
                        name="imagen"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Botón para enviar */}
                <button type="submit">{id ? 'Actualizar' : 'Crear'} Pokémon</button>
            </form>
        </div>
    );
};

export default PokemonFormPage;
