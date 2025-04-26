import {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
} from '../controllers/genre.controller.js';
import { Router } from 'express';

export const GenreRoutes = () => {
  const router = Router();
  router.post('/', createGenre);
  router.get('/', getAllGenres);
  router.get('/:id', getGenreById);
  router.put('/:id', updateGenre);
  router.delete('/:id', deleteGenre);

  return router;
};
