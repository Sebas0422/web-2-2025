import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, getUserById, updateUser } from '../../services/userService';

const AVAILABLE_PERMISSIONS = ['admin', 'user'];

export const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    permissions: [],
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      getUserById({ id }).then(setFormData).catch(console.error);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionToggle = (perm) => {
    setFormData((prev) => {
      const exists = prev.permissions.includes(perm);
      const newPermissions = exists
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm];
      return { ...prev, permissions: newPermissions };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.permissions.length === 0) {
      setError('Debe seleccionar al menos un permiso.');
      return;
    }

    try {
      if (id) {
        await updateUser({ id, user: formData });
      } else {
        await createUser({ user: formData });
      }
      navigate('/admin/users');
    } catch (err) {
      console.error(err);
      setError('Hubo un error al guardar el usuario: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">{id ? 'Editar Usuario' : 'Crear Usuario'}</h2>

      {error && <p className="text-red-600">{error}</p>}

      <label className="block mb-2">
        Nombre:
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </label>

      <label className="block mb-2">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </label>

      <label className="block mb-2">
        Contraseña:
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required={!id} // solo obligatoria si estás creando
        />
      </label>

      <fieldset className="mb-4">
        <legend className="font-semibold mb-1">Permisos</legend>
        {AVAILABLE_PERMISSIONS.map((perm) => (
          <label key={perm} className="block">
            <input
              type="checkbox"
              checked={formData.permissions.includes(perm)}
              onChange={() => handlePermissionToggle(perm)}
            />
            <span className="ml-2">{perm}</span>
          </label>
        ))}
      </fieldset>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => navigate('/admin/users')}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar
        </button>
      </div>
    </form>
  );
};
