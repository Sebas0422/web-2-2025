import { Router } from 'express';
import { createMove, getAllMoves } from '../controllers/move.controller.js';

export const MoveRoutes = () => {
  const router = Router();

  router.post('/', createMove);
  router.get('/', getAllMoves);

  return router;
};
