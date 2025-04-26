import {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
} from '../controllers/Artist.controller.js';

import { Router } from 'express';

export const ArtistRoutes = () => {
  const router = Router();
  router.post('/', createArtist);
  router.get('/', getAllArtists);
  router.get('/:id', getArtistById);
  router.put('/:id', updateArtist);
  router.delete('/:id', deleteArtist);

  return router;
};
