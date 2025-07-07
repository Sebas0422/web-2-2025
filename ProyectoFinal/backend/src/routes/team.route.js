import { Router } from 'express';
import {
  createTeam,
  getTeams,
  insertDetailsTeam,
  updateTemDetails,
  addMoveToTeamPokemon,
  getPokemonsByTeamId,
  getMovesByTeamPokemonId,
} from '../controllers/team.controller.js';

export const TeamRoutes = () => {
  const router = Router();

  router.post('/', createTeam);
  router.get('/', getTeams);
  router.post('/details', insertDetailsTeam);
  router.put('/details/:id', updateTemDetails);
  router.post('/details/:id/move', addMoveToTeamPokemon);
  router.get('/:id/pokemons', getPokemonsByTeamId);
  router.get('/details/:id/moves', getMovesByTeamPokemonId);

  return router;
};
