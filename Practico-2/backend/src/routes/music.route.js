import {
  createMusic,
  getAllMusics,
  getMusicById,
  updateMusic,
  deleteMusic,
} from '../controllers/Music.controller.js';

import { Router } from 'express';

export const MusicRoutes = () => {
  const router = Router();
  router.post('/', createMusic);
  router.get('/', getAllMusics);
  router.get('/:id', getMusicById);
  router.put('/:id', updateMusic);
  router.delete('/:id', deleteMusic);

  return router;
};
