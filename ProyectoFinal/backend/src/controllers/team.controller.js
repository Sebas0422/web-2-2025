import models from '../models/index.js';
import { EntityTypes } from '../types/EntityTypes.js';
import { getUserProfile } from '../utilities/getUserProfile.js';

const { Team, TeamPokemon, PokemonMove, TeamPokemonMove } = models;

export const createTeam = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  const user = await getUserProfile({ token });

  try {
    const team = await Team.create({
      name,
      userId: user.id,
    });
    if (!team) {
      return res.status(400).json({ error: 'Error al crear el equipo' });
    }
    res.status(201).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const getTeams = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  const user = await getUserProfile({ token });

  try {
    const teams = await Team.findAll({
      where: { userId: user.id },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const getPokemonsByTeamId = async (req, res) => {
  const { id: teamId } = req.params;
  if (!teamId) {
    return res.status(400).json({ error: 'teamId es requerido' });
  }
  try {
    const teamPokemons = await TeamPokemon.findAll({
      where: { teamId },
      include: [
        {
          model: models.Pokemon,
          as: EntityTypes.Pokemons,
        },
        {
          model: models.Item,
          as: EntityTypes.Items,
        },
        {
          model: models.Ability,
          as: EntityTypes.Abilities,
        },
        {
          model: models.Nature,
          as: EntityTypes.Natures,
        },
      ],
    });
    res.status(200).json(teamPokemons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const insertDetailsTeam = async (req, res) => {
  const { teamId, pokemonId } = req.body;

  if (!teamId || !pokemonId) {
    return res.status(400).json({ error: 'teamId y pokemonId son requeridos' });
  }

  try {
    const team = await Team.findByPk(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }
    const numberTeamPokemons = await TeamPokemon.count({
      where: { teamId },
    });
    if (numberTeamPokemons >= 6) {
      return res.status(400).json({ error: 'Un equipo no puede tener más de 6 Pokémon' });
    }
    const teamPokemon = await TeamPokemon.create({
      teamId,
      pokemonId,
    });
    res.status(201).json(teamPokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const updateTemDetails = async (req, res) => {
  const { id } = req.params;
  const {
    nickname,
    itemId,
    abilityId,
    natureId,
    hpEV,
    atkEV,
    defEV,
    spAtkEV,
    spDefEV,
    speedEV,
    hpIV,
    atkIV,
    defIV,
    spAtkIV,
    spDefIV,
    speedIV,
  } = req.body;

  try {
    const teamPokemon = await TeamPokemon.findByPk(id);

    if (!teamPokemon) {
      return res.status(404).json({ error: 'Team Pokemon no encontrado' });
    }

    await teamPokemon.update({
      nickname,
      itemId,
      abilityId,
      natureId,
      hpEV,
      atkEV,
      defEV,
      spAtkEV,
      spDefEV,
      speedEV,
      hpIV,
      atkIV,
      defIV,
      spAtkIV,
      spDefIV,
      speedIV,
    });

    res.status(200).json(teamPokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error.message });
  }
};

export const addMoveToTeamPokemon = async (req, res) => {
  const { id: teamPokemonId } = req.params;
  const { moveId } = req.body;

  if (!teamPokemonId || !moveId) {
    return res.status(400).json({ error: 'teamPokemonId y moveId son requeridos' });
  }

  try {
    const teamPokemon = await TeamPokemon.findByPk(teamPokemonId);
    if (!teamPokemon) {
      return res.status(404).json({ error: 'Team Pokemon no encontrado' });
    }

    const existingMove = await TeamPokemonMove.findOne({
      where: { teamPokemonId, moveId },
    });

    if (existingMove) {
      return res.status(409).json({ error: 'El movimiento ya está asociado a este Pokémon del equipo' });
    }

    const existingMoveInPokemon = await PokemonMove.findOne({
      where: { pokemonId: teamPokemon.pokemonId, moveId },
    });

    if (!existingMoveInPokemon) {
      return res.status(404).json({ error: 'El movimiento no existe para el Pokémon' });
    }

    const numberTeamPokemonMoves = await TeamPokemonMove.count({
      where: { teamPokemonId },
    });

    if (numberTeamPokemonMoves >= 4) {
      return res.status(400).json({ error: 'Un Pokémon del equipo no puede tener más de 4 movimientos' });
    }

    const teamPokemonMove = await TeamPokemonMove.create({
      teamPokemonId,
      moveId,
    });
    res.status(201).json(teamPokemonMove);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const deleteMoveToTeamPokemon = async (req, res) => {
  const { id: teamPokemonMoveId } = req.params;

  if (!teamPokemonMoveId) {
    return res.status(400).json({ error: 'teamPokemonMoveId es requerido' });
  }

  try {
    const teamPokemonMove = await TeamPokemonMove.findByPk(teamPokemonMoveId);
    if (!teamPokemonMove) {
      return res.status(404).json({ error: 'Movimiento del Pokémon del equipo no encontrado' });
    }

    await teamPokemonMove.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};
