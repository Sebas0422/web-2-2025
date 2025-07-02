import { Router } from 'express';
import {
  createTeam,
  getTeams,
  insertDetailsTeam,
  updateTemDetails,
  addMoveToTeamPokemon,
} from '../controllers/team.controller.js';

export const TeamRoutes = () => {
  const router = Router();

  router.post('/', createTeam);
  router.get('/', getTeams);
  router.post('/details', insertDetailsTeam);
  router.put('/details/:id', updateTemDetails);
  router.post('/details/:id/move', addMoveToTeamPokemon);

  return router;
};
