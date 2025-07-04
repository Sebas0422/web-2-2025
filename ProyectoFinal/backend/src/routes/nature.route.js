import { getAllNatures, getNatureById, createNature, deleteAllNatures } from '../controllers/nature.controller.js';
import { Router } from 'express';

export const NatureRoutes = () => {
  const router = Router();

  router.get('/', getAllNatures);
  router.get('/:id', getNatureById);
  router.post('/', createNature);
  router.delete('/', deleteAllNatures);
  return router;
};
