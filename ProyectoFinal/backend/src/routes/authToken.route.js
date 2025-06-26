import { Router } from 'express';
import { login, register, logout } from '../controllers/auth.controller.js';

export const AuthTokenRoutes = () => {
  const router = Router();
  router.post('/login', login);
  router.post('/register', register);
  router.post('/logout/:userId', logout);

  return router;
};
