import {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
} from '../controllers/album.controller.js';

import { Router } from 'express';

export const AlbumRoutes = () => {
  const router = Router();
  router.post('/', createAlbum);
  router.get('/', getAllAlbums);
  router.get('/:id', getAlbumById);
  router.put('/:id', updateAlbum);
  router.delete('/:id', deleteAlbum);

  return router;
};
