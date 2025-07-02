import { Router } from 'express';
import { createType, getTypes } from '../controllers/type.controller.js';

export const TypeRoutes = () => {
  const router = Router();

  // Define routes
  router.post('/', createType);
  router.get('/', getTypes);

  return router;
};
