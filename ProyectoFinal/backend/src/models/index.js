import { sequelize } from '../config/db.config.js';
import defineUser from './User.js';
import defineAuthToken from './authToken.js';
import defineMove from './Move.js';
import definePokemon from './Pokemon.js';
import defineTeam from './Team.js';
import defineTeamPokemon from './TeamPokemon.js';
import defineTeamPokemonMove from './TeamPokemonMove.js';
import defineItem from './Item.js';
import defineNature from './Nature.js';
import defineAbility from './Ability.js';
import definePokemonMove from './PokemonMove.js';
import defineType from './Type.js';

const models = {
  User: defineUser(sequelize),
  AuthToken: defineAuthToken(sequelize),
  Move: defineMove(sequelize),
  Pokemon: definePokemon(sequelize),
  Team: defineTeam(sequelize),
  TeamPokemon: defineTeamPokemon(sequelize),
  TeamPokemonMove: defineTeamPokemonMove(sequelize),
  Item: defineItem(sequelize),
  Nature: defineNature(sequelize),
  Ability: defineAbility(sequelize),
  PokemonMove: definePokemonMove(sequelize),
  Type: defineType(sequelize),
};

models.AuthToken.belongsTo(models.User, {
  foreignKey: 'userId',
  as: 'users',
});

models.Team.belongsTo(models.User, {
  foreignKey: 'userId',
  as: 'users',
});

models.TeamPokemon.belongsTo(models.Team, {
  foreignKey: 'teamId',
  as: 'teams',
});

models.TeamPokemon.belongsTo(models.Pokemon, {
  foreignKey: 'pokemonId',
  as: 'pokemons',
});

models.TeamPokemon.belongsTo(models.Item, {
  foreignKey: 'itemId',
  as: 'items',
});

models.TeamPokemon.hasMany(models.TeamPokemonMove, {
  foreignKey: 'teamPokemonId',
  as: 'moves',
});

models.TeamPokemon.belongsTo(models.Nature, {
  foreignKey: 'natureId',
  as: 'natures',
});

models.TeamPokemon.belongsTo(models.Ability, {
  foreignKey: 'abilityId',
  as: 'abilities',
});

models.Pokemon.hasMany(models.TeamPokemon, {
  foreignKey: 'pokemonId',
  as: 'team_pokemons',
});

models.Pokemon.belongsTo(models.Type, {
  foreignKey: 'typeId',
  as: 'types',
});

models.Type.hasMany(models.Pokemon, {
  foreignKey: 'typeId',
  as: 'pokemons',
});

models.Move.hasMany(models.TeamPokemonMove, {
  foreignKey: 'moveId',
  as: 'team_pokemon_moves',
});

models.TeamPokemonMove.belongsTo(models.TeamPokemon, {
  foreignKey: 'teamPokemonId',
  as: 'team_pokemons',
});

models.TeamPokemonMove.belongsTo(models.Move, {
  foreignKey: 'moveId',
  as: 'moves',
});

models.Item.hasMany(models.TeamPokemon, {
  foreignKey: 'itemId',
  as: 'team_pokemons',
});

models.Nature.hasMany(models.TeamPokemon, {
  foreignKey: 'natureId',
  as: 'team_pokemons',
});

models.Ability.hasMany(models.TeamPokemon, {
  foreignKey: 'abilityId',
  as: 'team_pokemons',
});

models.User.hasMany(models.Team, {
  foreignKey: 'userId',
  as: 'teams',
});

models.PokemonMove.belongsTo(models.Pokemon, {
  foreignKey: 'pokemonId',
  as: 'pokemons',
});

models.PokemonMove.belongsTo(models.Move, {
  foreignKey: 'moveId',
  as: 'moves',
});

models.Pokemon.hasMany(models.PokemonMove, {
  foreignKey: 'pokemonId',
  as: 'pokemon_moves',
});

models.Move.hasMany(models.PokemonMove, {
  foreignKey: 'moveId',
  as: 'pokemon_moves',
});

export default models;
