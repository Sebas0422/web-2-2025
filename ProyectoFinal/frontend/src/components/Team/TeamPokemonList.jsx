import { useLocation, useNavigate } from 'react-router-dom';

export const TeamPokemonList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const teamPokemons = location.state?.teamPokemons || [];
  const teamName = location.state?.teamName || 'Equipo sin nombre';
  const handleEditPokemon = (teamPokemon) => {
    navigate('/teams/details/pokemons/edit', {
      state: { teamPokemon },
    });
  };
  return (
    <div className="p-4 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">{teamName}</h2>

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
                  tp.pokemons.imagePatch ||
                  'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
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
    </div>
  );
};
