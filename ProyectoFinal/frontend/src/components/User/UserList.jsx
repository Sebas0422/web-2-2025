import { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await deleteUser({ id });
        setUsers(users.filter((u) => u.id !== id));
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Usuarios</h2>
        <button
          onClick={() => navigate('/admin/users/create')}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Nuevo Usuario
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Permisos</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.permissions.join(', ')}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => navigate(`/admin/users/edit/${u.id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
