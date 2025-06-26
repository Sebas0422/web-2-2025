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
