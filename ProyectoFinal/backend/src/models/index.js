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
import { EntityTypes } from '../types/EntityTypes.js';

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
  as: EntityTypes.Users,
});

models.Team.belongsTo(models.User, {
  foreignKey: 'userId',
  as: EntityTypes.UsersS,
});

models.TeamPokemon.belongsTo(models.Team, {
  foreignKey: 'teamId',
  as: EntityTypes.Teams,
});

models.TeamPokemon.belongsTo(models.Pokemon, {
  foreignKey: 'pokemonId',
  as: EntityTypes.Pokemons,
});

models.TeamPokemon.belongsTo(models.Item, {
  foreignKey: 'itemId',
  as: EntityTypes.Items,
});

models.TeamPokemon.hasMany(models.TeamPokemonMove, {
  foreignKey: 'teamPokemonId',
  as: EntityTypes.TeamPokemonMoves,
});

models.TeamPokemon.belongsTo(models.Nature, {
  foreignKey: 'natureId',
  as: EntityTypes.Natures,
});

models.TeamPokemon.belongsTo(models.Ability, {
  foreignKey: 'abilityId',
  as: EntityTypes.Abilities,
});

models.Pokemon.hasMany(models.TeamPokemon, {
  foreignKey: 'pokemonId',
  as: EntityTypes.TeamPokemons,
});

models.Pokemon.belongsTo(models.Type, {
  foreignKey: 'typeId',
  as: EntityTypes.Types,
});

models.Type.hasMany(models.Pokemon, {
  foreignKey: 'typeId',
  as: EntityTypes.Pokemons,
});

models.Move.hasMany(models.TeamPokemonMove, {
  foreignKey: 'moveId',
  as: EntityTypes.TeamPokemonMoves,
});

models.TeamPokemonMove.belongsTo(models.TeamPokemon, {
  foreignKey: 'teamPokemonId',
  as: EntityTypes.TeamPokemons,
});

models.TeamPokemonMove.belongsTo(models.Move, {
  foreignKey: 'moveId',
  as: EntityTypes.Moves,
});

models.Item.hasMany(models.TeamPokemon, {
  foreignKey: 'itemId',
  as: EntityTypes.TeamPokemons,
});

models.Nature.hasMany(models.TeamPokemon, {
  foreignKey: 'natureId',
  as: EntityTypes.TeamPokemons,
});

models.Ability.hasMany(models.TeamPokemon, {
  foreignKey: 'abilityId',
  as: EntityTypes.TeamPokemons,
});

models.User.hasMany(models.Team, {
  foreignKey: 'userId',
  as: EntityTypes.Teams,
});

models.PokemonMove.belongsTo(models.Pokemon, {
  foreignKey: 'pokemonId',
  as: EntityTypes.Pokemons,
});

models.PokemonMove.belongsTo(models.Move, {
  foreignKey: 'moveId',
  as: EntityTypes.Moves,
});

models.Pokemon.hasMany(models.PokemonMove, {
  foreignKey: 'pokemonId',
  as: EntityTypes.PokemonMoves,
});

models.Move.hasMany(models.PokemonMove, {
  foreignKey: 'moveId',
  as: EntityTypes.Moves,
});

export default models;
