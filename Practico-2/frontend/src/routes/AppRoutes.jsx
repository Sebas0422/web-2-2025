import { Route, Routes } from 'react-router-dom';
import { ListGenre } from '../pages/Genre/ListGenre';
import { GenreDetails } from '../pages/Genre/GenreDetails';
import { GenreEdit } from '../pages/Genre/GenreEdit';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ListGenre />} />
      <Route path="/gerns/:id" element={<GenreDetails />} />
      <Route path="/gerns/:id/edit" element={<GenreEdit />} />
    </Routes>
  );
};

export default AppRoutes;
