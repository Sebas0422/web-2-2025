import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { getPokemonsByTeamId } from '../../services/teamService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const TeamPokemonList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id;

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [teamPokemons, setTeamPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleEditPokemon = (teamPokemon) => {
    navigate('/teams/details/pokemons/edit', {
      state: { teamPokemon },
    });
  };

  const fetchTeamPokemons = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPokemonsByTeamId({ id });
      if (Array.isArray(data) && data.length > 0) {
        setTeamPokemons(data);
        console.log('Pokémon del equipo:', data);
      } else {
        setTeamPokemons([]);
      }
    } catch (error) {
      console.error('Error al obtener los Pokémon del equipo:', error);
      setTeamPokemons([]);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTeamPokemons();
  }, [fetchTeamPokemons]);

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      const res = await fetch(`http://localhost:3000/api/pokemons/search?name=${searchTerm}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error al buscar Pokémon:', error);
    }
  };

  const handleSelectPokemon = async (pokemon) => {
    await fetch(`http://localhost:3000/api/teams/details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        teamId: id,
        pokemonId: pokemon.id,
      }),
    });
    await fetchTeamPokemons();
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-600 text-lg font-semibold">
        Cargando Pokémon del equipo...
      </div>
    );
  }

  return (
    <div className="p-4 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">{}</h2>

      {teamPokemons.length < 6 && (
        <div className="mb-4 text-right">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Agregar Pokémon
          </button>
        </div>
      )}

      {teamPokemons.length === 0 ? (
        <p className="text-gray-600 text-center">Este equipo no tiene Pokémon asignados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {teamPokemons.map((tp) => (
            <div
              key={tp.id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition bg-gray-50"
            >
              <img
                src={
                  tp.pokemons.imagePatch
                    ? `${API_URL}${tp.pokemons.imagePatch}`
                    : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
                }
                alt={tp.pokemons.name}
                className="w-24 h-24 object-contain mx-auto mb-2"
              />
              <h3 className="text-lg font-semibold text-center capitalize">
                {tp.nickname || tp.pokemons.name}
              </h3>
              <p className="text-sm text-gray-500 text-center">Nombre real: {tp.pokemons.name}</p>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  onClick={() => handleEditPokemon(tp)}
                >
                  Editar
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg relative">
            <h3 className="text-xl font-bold mb-4">Buscar Pokémon</h3>

            <input
              type="text"
              placeholder="Nombre del Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-3 py-2 w-full mb-4 rounded"
            />

            <div className="flex justify-end mb-4">
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Buscar
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2">
              {searchResults.length > 0 ? (
                searchResults.map((poke) => (
                  <div
                    key={poke.id}
                    className="flex items-center justify-between border p-2 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          poke.imagePatch ||
                          'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
                        }
                        alt={poke.name}
                        className="w-10 h-10 object-contain"
                      />
                      <span className="capitalize">{poke.name}</span>
                    </div>
                    <button
                      className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => handleSelectPokemon(poke)}
                    >
                      Seleccionar
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No se encontraron resultados.</p>
              )}
            </div>

            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => {
                setShowModal(false);
                setSearchTerm('');
                setSearchResults([]);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
