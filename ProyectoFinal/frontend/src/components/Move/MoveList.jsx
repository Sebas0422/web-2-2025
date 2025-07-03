import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokedexContext } from '../../hooks/usePokedexContext';
import { useAuth } from '../../hooks/useAuth';

export const MoveList = () => {
  const navigate = useNavigate();
  const { loading, loadMoves, moveList, eliminateMove } = usePokedexContext();
  const { loading: loadingAuth } = useAuth();

  useEffect(() => {
    if (loadingAuth) {
      console.log('Cargando autenticación...');
      return;
    }
    const fetchMoves = async () => {
      await loadMoves();
    };

    fetchMoves();
  }, [loadMoves, loadingAuth]);

  const handleEdit = (id) => {
    navigate(`/admin/moves/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm('¿Estás seguro de eliminar este movimiento?');
    if (!confirmed) return;

    try {
      await eliminateMove({ id });
    } catch (error) {
      console.error('Error al eliminar el movimiento:', error);
    }
  };

  const handleCreate = () => {
    navigate('/admin/moves/create');
  };

  if (loading) {
    return <p className="text-center mt-10">Cargando movimientos...</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Lista de Movimientos</h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-yellow-400 hover:text-black transition"
        >
          Crear Movimiento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moveList.map((move) => (
          <div
            key={move.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">{move.name}</h2>
              <p className="text-sm text-gray-600">
                Tipo: <span className="font-medium text-green-600">{move.type}</span>
              </p>
              <p className="text-sm text-gray-600">
                Categoría: <span className="font-medium text-blue-600">{move.category}</span>
              </p>
              <p className="text-sm text-gray-600">
                Poder: <span className="font-medium text-red-600">{move.power ?? 'N/A'}</span>
              </p>

              <div className="flex justify-between pt-3">
                <button
                  onClick={() => handleEdit(move.id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-yellow-400 hover:text-black"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(move.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
