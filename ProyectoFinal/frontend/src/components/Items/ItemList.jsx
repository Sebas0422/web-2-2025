import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokedexContext } from '../../hooks/usePokedexContext';
import { useAuth } from '../../hooks/useAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const ItemList = () => {
  const { itemList, loadItems, loading: loadingContext, eliminateItem } = usePokedexContext();
  const { loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return console.log('Cargando ítems...');
    const fetchItems = async () => {
      try {
        await loadItems();
      } catch (error) {
        console.error('Error al cargar los ítems:', error);
      }
    };

    fetchItems();
  }, [loadItems, loading]);

  const handleEdit = (id) => {
    navigate(`/admin/items/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm('¿Estás seguro de eliminar este ítem?');
    if (!confirmed) return;

    try {
      await eliminateItem(id);
    } catch (error) {
      console.error('Error al eliminar el ítem:', error);
    }
  };

  const handleCreate = () => {
    navigate('/admin/items/create');
  };

  if (loading || loadingContext) {
    return <p className="text-center mt-10">Cargando ítems...</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Lista de Ítems</h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-yellow-400 hover:text-black transition"
        >
          Crear Ítem
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {itemList.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <img
              src={
                item.imagePath
                  ? `${API_URL}${item.imagePath}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
              }
              alt={item.name}
              className="w-full h-40 object-contain bg-gray-100 rounded-t-xl"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{item.description || 'Sin descripción'}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-yellow-400 hover:text-black"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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
