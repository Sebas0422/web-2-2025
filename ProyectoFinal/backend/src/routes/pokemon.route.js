import { Router } from 'express';
import {
  getAllPokemons,
  getPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon,
  addMoveToPokemon,
  getMovesByPokemonId,
} from '../controllers/pokemon.controller.js';

export const PokemonRoutes = () => {
  const router = Router();
  router.get('/', getAllPokemons);
  router.get('/:id', getPokemonById);
  router.post('/', createPokemon);
  router.put('/:id', updatePokemon);
  router.delete('/:id', deletePokemon);
  router.post('/:id/moves', addMoveToPokemon);
  router.get('/:id/moves', getMovesByPokemonId);
  return router;
};
