import models from '../models/index.js';

const { Nature } = models;

export const getAllNatures = async (req, res) => {
  try {
    const natures = await Nature.findAll();
    res.status(200).json(natures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const getNatureById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'ID es requerido' });
  }
  try {
    const nature = await Nature.findByPk(id);
    if (!nature) {
      return res.status(404).json({ error: 'Naturaleza no encontrada' });
    }
    res.status(200).json(nature);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const createNature = async (req, res) => {
  const { name, increasedStat, decreasedStat } = req.body;
  if (!name || !increasedStat || !decreasedStat) {
    return res.status(400).json({ error: 'Nombre y descripción son requeridos' });
  }
  try {
    const newNature = await Nature.create({ name, increasedStat, decreasedStat });
    res.status(201).json(newNature);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const deleteAllNatures = async (req, res) => {
  try {
    await Nature.destroy({ where: {}, truncate: true });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};
