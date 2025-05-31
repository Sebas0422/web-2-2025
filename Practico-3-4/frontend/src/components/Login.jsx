export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Iniciar Sesión</h2>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-semibold transition"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          ¿No tienes una cuenta?{' '}
          <a href="#" className="text-blue-600 hover:underline font-medium">Regístrate</a>
        </p>
      </div>
    </div>
  );
}