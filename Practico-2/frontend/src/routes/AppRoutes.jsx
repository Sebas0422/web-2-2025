import { Route, Routes } from 'react-router-dom';
import Genre from '../pages/Genre/Genre';
import ListaPersonas from '../pages/ListaPersonas';
import { ListGenre } from '../pages/Genre/ListGenre';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ListGenre />} />
      <Route path="/gerns/:id" element={<Genre />} />
      <Route path="/personas/list" element={<ListaPersonas />} />
    </Routes>
  );
};

export default AppRoutes;
