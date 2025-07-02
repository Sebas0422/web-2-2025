import { Navigate, Route, Routes } from 'react-router-dom';
import { RequirePermissions } from './components/auth/RequirePermissions';
import { AdminPage } from './components/Admin/AdminPage';
import { PokemonList } from './components/Pokemon/PokemonList';
import { PokemonForm } from './components/Pokemon/PokemonEdit';
import { Register } from './components/auth/Register';
import { UserPage } from './components/User/UserPage';
import Login from './components/auth/Login';
import { PokemonMove } from './components/Pokemon/PokemonMove';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin"
        element={
          <RequirePermissions permissions={['admin']} verifiedAllPermissions>
            <AdminPage />
          </RequirePermissions>
        }
      >
        <Route index element={<p>Selecciona una opción</p>} />
        <Route path="pokemons" element={<PokemonList />} />
        <Route path="pokemons/edit/:id" element={<PokemonForm />} />
        <Route path="pokemons/:id/movements" element={<PokemonMove />} />
        <Route path="pokemons/create" element={<PokemonForm />} />
        <Route path="users" element={<p>Gestión de Usuarios</p>} />
        <Route path="settings" element={<p>Configuración del sistema</p>} />
        <Route path="reports" element={<p>Reportes y estadísticas</p>} />
      </Route>
      <Route
        path="/"
        element={
          <RequirePermissions permissions={['user']}>
            <UserPage />
          </RequirePermissions>
        }
      />

      <Route path="/unauthorized" element={<h1>No autorizado</h1>} />

      {/* Ruta para 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
