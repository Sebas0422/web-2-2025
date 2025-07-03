import { Navigate, Route, Routes } from 'react-router-dom';
import { RequirePermissions } from './components/auth/RequirePermissions';
import { AdminPage } from './components/Admin/AdminPage';
import { PokemonList } from './components/Pokemon/PokemonList';
import { PokemonForm } from './components/Pokemon/PokemonForm';
import { Register } from './components/auth/Register';
import { UserPage } from './components/User/UserPage';
import Login from './components/auth/Login';
import { PokemonMove } from './components/Pokemon/PokemonMove';
import { ItemForm } from './components/Items/ItemForm';
import { ItemList } from './components/Items/ItemList';
import { MoveList } from './components/Move/MoveList';
import { MoveForm } from './components/Move/MoveForm';
import { UserList } from './components/User/UserList';
import { UserForm } from './components/User/UserForm';
import { TeamList } from './components/Team/TeamList';

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
        <Route path="users" element={<UserList />} />
        <Route path="users/edit/:id" element={<UserForm />} />
        <Route path="users/create" element={<UserForm />} />
        <Route path="items" element={<ItemList />} />
        <Route path="items/edit/:id" element={<ItemForm />} />
        <Route path="items/create" element={<ItemForm />} />
        <Route path="moves" element={<MoveList />} />
        <Route path="moves/edit/:id" element={<MoveForm />} />
        <Route path="moves/create" element={<MoveForm />} />
      </Route>
      <Route
        path="/"
        element={
          <RequirePermissions permissions={['user']}>
            <UserPage />
          </RequirePermissions>
        }
      >
        <Route path="/teams" element={<TeamList />} />
      </Route>

      <Route path="/unauthorized" element={<h1>No autorizado</h1>} />

      {/* Ruta para 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
