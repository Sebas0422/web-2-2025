import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getMovesByPokemonId } from '../../services/pokemonService';
import { AssignMoveToPokemonModal } from './AssignMoveToPokemonModal';

export const PokemonMove = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const pokemon = location.state?.pokemon || null;
  const { loading: loadingAuth } = useAuth();

  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPokemonAndMovements = useCallback(async () => {
    try {
      const movementData = await getMovesByPokemonId({ id });

      setMovements(movementData);
    } catch (err) {
      console.error('Error al cargar datos:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (loadingAuth) return console.log('Cargando autenticación...');

    fetchPokemonAndMovements();
  }, [id, loadingAuth, fetchPokemonAndMovements]);

  const handleDeleteMovement = async (movementId) => {
    if (!confirm('¿Eliminar este movimiento del Pokémon?')) return;

    try {
      const token = localStorage.getItem('token');

      await fetch(`${import.meta.env.VITE_API_URL}/api/pokemon-movements/${movementId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      setMovements((prev) => prev.filter((m) => m.id !== movementId));
    } catch (err) {
      console.error('Error al eliminar movimiento:', err);
    }
  };

  if (loading || !pokemon) return <div className="p-6">Cargando...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white ">
      <button
        className="mb-4 px-4 py-2 bg-blue-600 hover:bg-yellow-400 text-white hover:text-black font-medium rounded-xl transition"
        onClick={() => navigate(-1)}
      >
        Volver al pokemon
      </button>
      {showModal && (
        <AssignMoveToPokemonModal
          pokemonId={id}
          onClose={() => setShowModal(false)}
          onSuccess={fetchPokemonAndMovements}
        />
      )}
      <div className="flex items-center space-x-6 mb-6">
        <img
          src={
            pokemon.imagePatch ||
            'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
          }
          alt={pokemon.name}
          className="w-32 h-32 object-contain bg-gray-100 rounded-xl"
        />
        <div>
          <h2 className="text-3xl font-bold capitalize text-gray-800">{pokemon.name}</h2>
          <p className="mt-1 text-gray-600">
            Tipo:{' '}
            <span
              className="inline-block px-3 py-1 rounded-full text-white text-sm"
              style={{ backgroundColor: pokemon.types?.color || '#94a3b8' }}
            >
              {pokemon.types?.name || 'Desconocido'}
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-700">Movimientos asignados</h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-600 hover:bg-yellow-400 text-white hover:text-black font-medium rounded-xl transition"
        >
          Asignar movimiento
        </button>
      </div>

      <ul className="divide-y divide-gray-200">
        {movements.length === 0 ? (
          <li className="text-gray-500 py-4">No hay movimientos asignados.</li>
        ) : (
          movements.map((m) => (
            <li key={m.id} className="py-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{m.moves.name}</p>
                <p className="text-sm text-gray-500">
                  Tipo: {m.moves.type} | Categoría: {m.moves.category} | Poder: {m.moves.power}
                </p>
              </div>
              <button
                onClick={() => handleDeleteMovement(m.id)}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
