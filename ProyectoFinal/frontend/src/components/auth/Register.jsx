// src/components/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Register = ({ permissions }) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const handleClickIniciarSession = () => {
    navigate('/login');
  };
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    delete form.confirmPassword;
    form.permissions = permissions ? permissions : ['user'];

    console.log('Formulario enviado:', form);
    try {
      register(form);
      alert('Registro exitoso');
      navigate('/');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Registro</h2>

        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
        >
          Registrarse
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          <a
            onClick={handleClickIniciarSession}
            href="#"
            className="text-blue-600 hover:underline font-medium"
          >
            Iniciar Session
          </a>
        </p>
      </form>
    </div>
  );
};
