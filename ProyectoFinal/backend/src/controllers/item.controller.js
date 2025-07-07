import models from '../models/index.js';
import { handleImageUpload } from '../utilities/handleImageUpload.js';

const { Item } = models;

export const createItem = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const imageFile = req?.files?.imageFile;
  if (!imageFile) {
    return res.status(400).json({ error: 'Archivo de imagen es requerido' });
  }

  try {
    const item = await Item.create({
      name,
      description,
    });
    if (!item) {
      return res.status(400).json({ error: 'Error al crear el item' });
    }
    const imagePath = await handleImageUpload(imageFile, 'items', item.id);
    if (imagePath) {
      await item.update({ imagePatch: imagePath });
    }

    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item no encontrado' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item no encontrado' });
    }
    const imageFile = req?.files?.imageFile;
    if (imageFile) {
      const imagePath = await handleImageUpload(imageFile, 'items', item.id);
      if (imagePath) {
        item.imagePatch = imagePath;
      }
    }

    item.name = name || item.name;
    item.description = description || item.description;
    await item.save();

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item no encontrado' });
    }

    await item.destroy();
    res.status(200).json({ message: 'Item eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', message: error });
  }
};
