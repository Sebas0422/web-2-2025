import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePokedexContext } from '../../hooks/usePokedexContext';

export const ItemForm = () => {
  const navigate = useNavigate();
  const { loading: loadingAuth } = useAuth();
  const { findItemById, modifyItem, addItem, loading } = usePokedexContext();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imagePath: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (loadingAuth) return console.log('Cargando autenticación...');

    const fetchItem = async () => {
      try {
        const item = await findItemById({ id });
        setFormData({
          name: item.name || '',
          description: item.description || '',
          imagePath: item.imagePath || '',
        });
      } catch (err) {
        setError('No se pudo cargar el ítem');
        console.error(err);
      }
    };
    if (id) {
      fetchItem();
    }
  }, [id, loadingAuth, findItemById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await modifyItem({ id, item: formData });
        alert('Ítem actualizado correctamente');
      } else {
        await addItem({ item: formData });
        alert('Ítem creado correctamente');
      }
      navigate('/admin/items');
    } catch (err) {
      console.error(err);
      alert('Error al guardar el ítem');
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando ítem...</p>;
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-gray-200 mt-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        {id ? 'Editar' : 'Crear'} Ítem
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Nombre</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl"
            isDisabled={loading}
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">URL de imagen</label>
          <input
            type="text"
            name="imagePath"
            value={formData.imagePath}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>

        {formData.imagePath && (
          <img
            src={formData.imagePath}
            alt="Vista previa"
            className="max-h-40 mt-4 rounded-xl border"
          />
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-xl"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
