import { Route, Routes } from 'react-router-dom';
import Genre from '../pages/Genre/Genre';
import { ListGenre } from '../pages/Genre/ListGenre';
import { GenreDetails } from '../pages/Genre/GenreDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ListGenre />} />
      <Route path="/gerns/:id" element={<GenreDetails />} />
    </Routes>
  );
};

export default AppRoutes;
