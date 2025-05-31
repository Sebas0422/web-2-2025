import {getUserById, createUser } from '../controller/user.controller.js';

export const UserRoutes = (router) => {
  router.get('/:id', getUserById);
  router.post('/', createUser);

  return router;
}