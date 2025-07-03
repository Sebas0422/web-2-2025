import { useEffect, useState } from 'react';
import { getAllMoves } from '../../services/moveService';
import { addMoveToPokemon } from '../../services/pokemonService';

export const AssignMoveToPokemonModal = ({ pokemonId, onClose, onSuccess }) => {
  const [moves, setMoves] = useState([]);
  const [selectedMove, setSelectedMove] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const data = await getAllMoves();
        setMoves(data);
      } catch (err) {
        console.error('Error al cargar movimientos:', err);
        setError('No se pudieron cargar los movimientos');
      }
    };

    fetchMoves();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMove) return;

    setLoading(true);
    try {
      await addMoveToPokemon({ id: pokemonId, moveId: selectedMove });
      await onSuccess();
      onClose();
    } catch (err) {
      console.error('Error al asignar movimiento:', err);
      setError('Error al asignar el movimiento: ' + (err.message || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg border border-gray-300">
        <h2 className="text-xl font-bold mb-4 text-center">Asignar Movimiento</h2>

        {error && (
          <div className="text-red-600 mb-4 bg-red-100 p-2 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={selectedMove}
            onChange={(e) => setSelectedMove(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
          >
            <option value="">Selecciona un movimiento</option>
            {moves.map((move) => (
              <option key={move.id} value={move.id}>
                {move.name} - {move.type} ({move.power || 'sin poder'})
              </option>
            ))}
          </select>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50"
            >
              {loading ? 'Asignando...' : 'Asignar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
