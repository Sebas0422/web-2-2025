import { Artist, Genre } from '../models/index.js';
import { mapGenre } from '../utilities/mapModels.js';
import { handleImageUpload } from '../utilities/handleImageUpload.js';

export const createGenre = async (req, res) => {
  try {
    const { name, imagePath } = req.body;

    if (!name || !imagePath) {
      return res.status(400).json({ error: 'Missing required fields: name or imagePath' });
    }
    const genre = await Genre.create({ name, imagePath });
    res.status(201).json(mapGenre(genre));
  } catch (error) {
    res.status(500).json({ error: 'Error creating genre', details: error.message });
  }
};

export const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.status(200).json(genres.map(mapGenre));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching genres', message: error.message });
  }
};

export const getGenreById = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id, {
      include: [
        {
          model: Artist,
          as: 'artists',
          attributes: ['id', 'name', 'photoPath'],
        },
      ],
    });
    if (!genre) return res.status(404).json({ error: 'Genre not found' });
    res.json(mapGenre(genre, true));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching genre', message: error.message });
  }
};

export const updateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { imageFile } = req.files;

    if (!imageFile) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const imagePath = await handleImageUpload(imageFile, id);

    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({ error: 'Genre not found' });
    }

    await genre.update({ name, imagePath });

    res.status(200).json(mapGenre(genre));
  } catch (error) {
    res.status(500).json({ error: 'Error updating genre', message: error.message });
  }
};

export const deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);
    if (!genre) return res.status(404).json({ error: 'Genre not found' });

    await genre.destroy();
    res.json({ message: 'Genre deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting genre', message: error.message });
  }
};
