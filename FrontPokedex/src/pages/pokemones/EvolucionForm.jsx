import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createOrUpdateEvolucion } from '../../service/evolucionService';
import { getPokemones } from '../../service/pokemonService';

const EvolucionForm = () => {
  const { pokemonId } = useParams();  // Obtener el ID del Pokémon actual desde la URL
  const [idEvPrevia, setIdEvPrevia] = useState('');
  const [idEvSiguiente, setIdEvSiguiente] = useState('');
  const [nivelEvolucion, setNivelEvolucion] = useState(1);
  const [imagen, setImagen] = useState(null);
  const [pokemones, setPokemones] = useState([]);

  // Obtener la lista de Pokémon para poder seleccionar evoluciones
  useEffect(() => {
    const fetchPokemones = async () => {
      try {
        const response = await getPokemones();
        setPokemones(response.pokemones);
      } catch (error) {
        console.error('Error obteniendo los Pokémon:', error);
      }
    };
    fetchPokemones();
  }, []);

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("pokemonId en handleSubmit:", pokemonId);  // Verifica que el pokemonId se esté recibiendo correctamente

    const formData = new FormData();
    formData.append('idEvPrevia', idEvPrevia || null);
    formData.append('idEvSiguiente', idEvSiguiente || null);
    formData.append('nivelEvolucion', nivelEvolucion);
    
    if (imagen) {
        formData.append('imagen', imagen);  // Subir imagen si existe
    }

    try {
        await createOrUpdateEvolucion(pokemonId, formData);  // Pasamos pokemonId aquí
        alert('Evolución creada/actualizada correctamente');
    } catch (error) {
        console.error('Error creando/actualizando la evolución:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear o Actualizar Evolución</h2>
      
      <div>
        <label>Pokémon Previo (Opcional):</label>
        <select value={idEvPrevia} onChange={(e) => setIdEvPrevia(e.target.value)}>
          <option value="">Ninguno</option>
          {pokemones.map((pokemon) => (
            <option key={pokemon.id} value={pokemon.id}>
              {pokemon.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Pokémon Siguiente (Opcional):</label>
        <select value={idEvSiguiente} onChange={(e) => setIdEvSiguiente(e.target.value)}>
          <option value="">Ninguno</option>
          {pokemones.map((pokemon) => (
            <option key={pokemon.id} value={pokemon.id}>
              {pokemon.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Nivel de Evolución:</label>
        <input
          type="number"
          value={nivelEvolucion}
          onChange={(e) => setNivelEvolucion(e.target.value)}
          min="1"
        />
      </div>

      <div>
        <label>Imagen de la Evolución:</label>
        <input type="file" onChange={handleFileChange} />
      </div>

      <button type="submit">Guardar Evolución</button>
    </form>
  );
};

export default EvolucionForm;
