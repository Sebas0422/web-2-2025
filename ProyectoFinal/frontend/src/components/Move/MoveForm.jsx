import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePokedexContext } from '../../hooks/usePokedexContext';

export const MoveForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addMove, modifyMove, findMoveById } = usePokedexContext();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    category: '',
    power: '',
  });

  useEffect(() => {
    if (!isEditing) return;

    const fetchMove = async () => {
      try {
        const move = await findMoveById({ id });
        setFormData({
          name: move.name || '',
          type: move.type || '',
          category: move.category || '',
          power: move.power !== null ? String(move.power) : '',
        });
      } catch (error) {
        console.error('Error al cargar movimiento:', error);
      }
    };

    fetchMove();
  }, [id, isEditing, findMoveById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      power: formData.power === '' ? null : Number(formData.power),
    };

    try {
      if (isEditing) {
        await modifyMove({ id, move: dataToSend });
        alert('Movimiento actualizado correctamente');
      } else {
        await addMove({ move: dataToSend });
        alert('Movimiento creado correctamente');
      }

      navigate('/admin/moves');
    } catch (error) {
      console.error('Error al guardar movimiento:', error);
      alert('Ocurrió un error al guardar el movimiento');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mt-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        {isEditing ? 'Editar' : 'Crear'} Movimiento
      </h2>

      {['name', 'type', 'category', 'power'].map((field) => (
        <div key={field} className="mb-4">
          <label htmlFor={field} className="block font-semibold text-gray-700 mb-1 capitalize">
            {field === 'power' ? 'Poder' : field}
          </label>
          <input
            type={field === 'power' ? 'number' : 'text'}
            name={field}
            id={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition shadow-sm"
            min={field === 'power' ? 0 : undefined}
          />
        </div>
      ))}

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-lg transition"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
