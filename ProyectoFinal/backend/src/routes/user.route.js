import { Router } from 'express';
import { getUserById, createUser, updateUser, getAllUsers } from '../controllers/user.controller.js';

export const UserRoutes = () => {
  const router = Router();
  router.get('/', getAllUsers);
  router.get('/:id', getUserById);
  router.post('/', createUser);
  router.put('/:id', updateUser);

  return router;
};
