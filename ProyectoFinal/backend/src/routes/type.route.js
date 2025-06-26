import { Router } from 'express';
import { createType } from '../controllers/type.controller.js';

export const TypeRoutes = () => {
  const router = Router();

  // Define routes
  router.post('/', createType);

  return router;
};
