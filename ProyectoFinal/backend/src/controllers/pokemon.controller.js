import models from '../models/index.js';
const { Pokemon, Type, PokemonMove, Move } = models;

export const createPokemon = async (req, res) => {
  const { name, baseHp, baseAttack, baseDefense, baseSpAttack, baseSpDefense, baseSpeed, typeId } = req.body;

  let errors = [];
  if (!name) {
    errors.push('El nombre es requerido');
  }
  if (!baseHp) {
    errors.push('El HP base es requerido');
  }
  if (!baseAttack) {
    errors.push('El ataque base es requerido');
  }
  if (!baseDefense) {
    errors.push('La defensa base es requerida');
  }
  if (!baseSpAttack) {
    errors.push('El ataque especial base es requerido');
  }
  if (!baseSpDefense) {
    errors.push('La defensa especial base es requerida');
  }
  if (!baseSpeed) {
    errors.push('La velocidad base es requerida');
  }
  if (!typeId) {
    errors.push('El tipo es requerido');
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const pokemon = await Pokemon.create({
      name,
      baseHp,
      baseAttack,
      baseDefense,
      baseSpAttack,
      baseSpDefense,
      baseSpeed,
      typeId,
    });

    res.status(201).json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll({
      include: {
        model: Type,
        as: 'types',
      },
    });
    res.status(200).json(pokemons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const getPokemonById = async (req, res) => {
  const { id } = req.params;

  try {
    const pokemon = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        as: 'types',
      },
    });

    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon no encontrado' });
    }

    res.status(200).json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const updatePokemon = async (req, res) => {
  const { id } = req.params;
  const { name, baseHp, baseAttack, baseDefense, baseSpAttack, baseSpDefense, baseSpeed, typeId } = req.body;

  try {
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon no encontrado' });
    }

    await pokemon.update({
      name,
      baseHp,
      baseAttack,
      baseDefense,
      baseSpAttack,
      baseSpDefense,
      baseSpeed,
      typeId,
    });

    res.status(200).json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const deletePokemon = async (req, res) => {
  const { id } = req.params;

  try {
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon no encontrado' });
    }

    await pokemon.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const addMoveToPokemon = async (req, res) => {
  const { pokemonId, moveId } = req.body;

  if (!pokemonId || !moveId) {
    return res.status(400).json({ error: 'Pokemon ID y Move ID son requeridos' });
  }

  try {
    const pokemon = await Pokemon.findByPk(pokemonId);
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon no encontrado' });
    }

    const move = await Move.findByPk(moveId);
    if (!move) {
      return res.status(404).json({ error: 'Move no encontrado' });
    }

    const existingPokemonMove = await PokemonMove.findOne({
      where: {
        pokemonId,
        moveId,
      },
    });

    if (existingPokemonMove) {
      return res.status(409).json({ error: 'El movimiento ya está asociado a este pokemon' });
    }

    const numberPokemonMoves = await PokemonMove.count({
      where: { pokemonId },
    });

    if (numberPokemonMoves >= 4) {
      return res.status(400).json({ error: 'Un pokemon no puede tener más de 4 movimientos' });
    }

    const newPokemonMove = await PokemonMove.create({
      pokemonId,
      moveId,
    });

    res.status(201).json(newPokemonMove);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};
