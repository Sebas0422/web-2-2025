import { Router } from 'express';
import { getUserById, createUser, updateUser, getAllUsers, deleteUser } from '../controllers/user.controller.js';

export const UserRoutes = () => {
  const router = Router();
  router.get('/', getAllUsers);
  router.get('/:id', getUserById);
  router.post('/', createUser);
  router.put('/:id', updateUser);
  router.delete('/:id', deleteUser);

  return router;
};
