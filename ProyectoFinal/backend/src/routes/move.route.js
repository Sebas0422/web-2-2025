import { Router } from 'express';
import { createMove, getAllMoves, getMoveById, updateMove, deleteMove } from '../controllers/move.controller.js';

export const MoveRoutes = () => {
  const router = Router();

  router.post('/', createMove);
  router.get('/', getAllMoves);
  router.get('/:id', getMoveById);
  router.put('/:id', updateMove);
  router.delete('/:id', deleteMove);

  return router;
};
