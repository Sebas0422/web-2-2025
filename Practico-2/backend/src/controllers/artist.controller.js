import { Artist } from '../models/index.js';

const mapArtist = (artist) => ({
  id: artist.id,
  name: artist.name,
  image: artist.photoPath,
  genreId: artist.genreId,
});

export const createArtist = async (req, res) => {
  try {
    const { name, photoPath, genreId } = req.body;

    if (!name || !photoPath || !genreId) {
      return res.status(400).json({ error: 'Missing required fields: name, photoPath, genreId' });
    }

    const artist = await Artist.create({ name, photoPath, genreId });

    res.status(201).json(mapArtist(artist));
  } catch (error) {
    res.status(500).json({ error: 'Error creating artist', message: error.message });
  }
};

export const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists.map(mapArtist));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching artists', message: error.message });
  }
};

export const getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByPk(id);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });
    res.json(mapArtist(artist));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching artist', message: error.message });
  }
};

export const updateArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;
    const artist = await Artist.findByPk(id);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });

    await artist.update({ name, image });
    res.json(mapArtist(artist));
  } catch (error) {
    res.status(500).json({ error: 'Error updating artist', message: error.message });
  }
};

export const deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByPk(id);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });

    await artist.destroy();
    res.json({ message: 'Artist deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting artist', message: error.message });
  }
};
