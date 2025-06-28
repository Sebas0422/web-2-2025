import { Router } from 'express';
import { login, register, logout, getUserProfileByToken } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

export const AuthTokenRoutes = () => {
  const router = Router();
  router.post('/login', login);
  router.post('/register', register);
  router.post('/logout/:userId', logout);
  router.get('/profile', authenticateToken, getUserProfileByToken);

  return router;
};
