import models from '../models/index.js';

const { Move } = models;

export const createMove = async (req, res) => {
  const { name, type, category, power } = req.body;

  if (!name || !type || !category || power === undefined) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const move = await Move.create({
      name,
      category,
      type,
      power,
    });
    res.status(201).json(move);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const getAllMoves = async (req, res) => {
  try {
    const moves = await Move.findAll();
    res.status(200).json(moves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const getMoveById = async (req, res) => {
  const { id } = req.params;

  try {
    const move = await Move.findByPk(id);
    if (!move) {
      return res.status(404).json({ error: 'Move no encontrado' });
    }
    res.status(200).json(move);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const updateMove = async (req, res) => {
  const { id } = req.params;
  const { name, type, category, power } = req.body;

  try {
    const move = await Move.findByPk(id);
    if (!move) {
      return res.status(404).json({ error: 'Move no encontrado' });
    }

    move.name = name || move.name;
    move.type = type || move.type;
    move.category = category || move.category;
    move.power = power !== undefined ? power : move.power;

    await move.save();
    res.status(200).json(move);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const deleteMove = async (req, res) => {
  const { id } = req.params;

  try {
    const move = await Move.findByPk(id);
    if (!move) {
      return res.status(404).json({ error: 'Move no encontrado' });
    }

    await move.destroy();
    res.status(200).json({ message: 'Move eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};
