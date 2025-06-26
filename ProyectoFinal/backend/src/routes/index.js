import { authenticateToken } from '../middlewares/auth.middleware.js';
import { AuthTokenRoutes } from './authToken.route.js';
import { MoveRoutes } from './move.route.js';
import { UserRoutes } from './user.route.js';
import { PokemonRoutes } from './pokemon.route.js';
import { Router } from 'express';
import { TypeRoutes } from './type.route.js';

export const routes = (app) => {
  const routerApi = Router();
  const routerAuth = Router();

  routerAuth.use(AuthTokenRoutes());
  routerApi.use('/users', UserRoutes());
  routerApi.use('/moves', MoveRoutes());
  routerApi.use('/pokemons', PokemonRoutes());
  routerApi.use('/types', TypeRoutes());

  app.use('/api', authenticateToken, routerApi);
  app.use('/auth', routerAuth);
};
