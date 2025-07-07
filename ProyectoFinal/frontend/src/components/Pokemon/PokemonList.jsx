import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { usePokedexContext } from '../../hooks/usePokedexContext';

const API_URL = import.meta.env.VITE_API_URL;
export const PokemonList = () => {
  const { loading } = useAuth();
  const {
    loading: loadingContext,
    loadPokemon,
    pokemonList,
    eliminatePokemon,
  } = usePokedexContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;

    const fetchData = async () => {
      console.log('PokemonList: Cargando Pokémon desde el contexto');
      await loadPokemon();
    };

    fetchData();
  }, [loading, loadPokemon]);

  const handleEdit = (pokemon) => {
    navigate(`/admin/pokemons/edit/${pokemon.id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este Pokémon?')) {
      console.log(`PokemonList: Eliminando Pokémon con ID ${id}`);
      eliminatePokemon(id);
    }
  };

  if (loading || loadingContext) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 text-lg font-semibold">
        Cargando Pokémons...
      </div>
    );
  }
  console.log('PokemonList: pokemonList', pokemonList);

  return (
    <>
      <button
        className="text-xs bg-green-600 hover:bg-yellow-400 hover:text-black text-white font-medium py-3 px-15 rounded-xl transition"
        onClick={() => navigate('/admin/pokemons/create')}
      >
        Crear Pokemons
      </button>

      <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <img
              src={
                pokemon.imagePatch
                  ? `${API_URL}${pokemon.imagePatch}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
              }
              alt={pokemon.name}
              className="w-full h-48 object-contain bg-gray-100"
            />

            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold text-gray-800 capitalize">{pokemon.name}</h2>

              <p className="text-sm text-gray-600">
                Tipo:{' '}
                <span
                  className="inline-block font-medium px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: pokemon.types?.color || '#94a3b8' }}
                >
                  {pokemon.types?.name || 'Desconocido'}
                </span>
              </p>

              <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                <p>❤️ HP: {pokemon.baseHp}</p>
                <p>⚔️ Atq: {pokemon.baseAttack}</p>
                <p>🛡️ Def: {pokemon.baseDefense}</p>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => handleEdit(pokemon)}
                  className="text-xs bg-blue-600 hover:bg-yellow-400 hover:text-black text-white font-medium py-1 px-3 rounded-xl transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(pokemon.id)}
                  className="text-xs bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-xl transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
