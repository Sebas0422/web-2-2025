import models from '../models/index.js';
const { Type } = models;
export const createType = async (req, res) => {
  const { name, color } = req.body;

  if (!name || !color) {
    return res.status(400).json({ error: 'Nombre y color son requeridos' });
  }

  try {
    const type = await Type.create({ name, color });
    res.status(201).json(type);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};
