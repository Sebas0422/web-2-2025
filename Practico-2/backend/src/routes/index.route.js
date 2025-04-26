import { GenreRoutes } from './genre.route.js';
import { Router } from 'express';

export default (app) => {
  const router = Router();
  router.use('/genres', GenreRoutes(app));
  app.use('/api', router);
};
