import { Genre } from '../models/index.js';

const mapGenre = (genre) => ({
  id: genre.id,
  name: genre.name,
  imagePath: genre.imagePath,
});

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
    res.json(genres.map(mapGenre));
    // eslint-disable-next-line no-unused-vars
  } catch (_error) {
    res.status(500).json({ error: 'Error fetching genres' });
  }
};

export const getGenreById = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);
    if (!genre) return res.status(404).json({ error: 'Genre not found' });
    res.json(mapGenre(genre));
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Error fetching genre' });
  }
};

export const updateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imagePath } = req.body;
    const genre = await Genre.findByPk(id);
    if (!genre) return res.status(404).json({ error: 'Genre not found' });

    await genre.update({ name, imagePath });
    res.json(mapGenre(genre));
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Error updating genre' });
  }
};

export const deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);
    if (!genre) return res.status(404).json({ error: 'Genre not found' });

    await genre.destroy();
    res.json({ message: 'Genre deleted' });
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Error deleting genre' });
  }
};
