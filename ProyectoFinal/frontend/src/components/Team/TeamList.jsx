import { useEffect, useState } from 'react';
import { getAllTeams, getPokemonsByTeamId } from '../../services/teamService';
import { useNavigate } from 'react-router-dom';

export const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchTeams = async () => {
    try {
      const data = await getAllTeams();
      const teamsWithPokemon = await Promise.all(
        data.map(async (team) => {
          const pokemons = await getPokemonsByTeamId({ id: team.id });
          return { ...team, pokemons };
        }),
      );
      setTeams(teamsWithPokemon);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar los equipos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleCreateTeam = () => {
    // redireccionar o abrir modal para crear equipo
    alert('Aquí podrías redirigir a /teams/create o abrir un modal');
  };

  const handleViewDetails = (team) => {
    console.log(team);
    navigate('/teams/details', {
      state: {
        teamPokemons: team.pokemons,
        teamName: team.name,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-600 text-lg font-semibold">
        Cargando equipos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 bg-red-100 p-4 rounded-lg max-w-md mx-auto mt-4">{error}</div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Mis Equipos</h1>
        <button
          onClick={handleCreateTeam}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Crear nuevo equipo
        </button>
      </div>

      {teams.length === 0 ? (
        <p className="text-center text-gray-600">No tienes equipos registrados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-semibold text-gray-800">{team.name}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Creado el: {new Date(team.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-4 flex gap-2 flex-wrap">
                {team.pokemons.map((p) => (
                  <img
                    key={p.id}
                    src={
                      p.pokemon?.image ||
                      'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
                    }
                    alt={p.pokemon?.name}
                    className="w-10 h-10 rounded-full border"
                    title={p.pokemon?.name}
                  />
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                  onClick={() => handleViewDetails(team)}
                >
                  Ver Detalles
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm">
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
