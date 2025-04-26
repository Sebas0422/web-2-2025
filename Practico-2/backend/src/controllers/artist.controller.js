import { Artist } from '../models/Artist.js';

const mapArtist = (artist) => ({
  id: artist.id,
  name: artist.name,
  image: artist.image,
});

export const createArtist = async (req, res) => {
  try {
    const { name, image } = req.body;
    const artist = await Artist.create({ name, image });
    res.status(201).json(mapArtist(artist));
  } catch (error) {
    res.status(500).json({ error: 'Error creating artist' });
  }
};

export const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists.map(mapArtist));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching artists' });
  }
};

export const getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByPk(id);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });
    res.json(mapArtist(artist));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching artist' });
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
    res.status(500).json({ error: 'Error updating artist' });
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
    res.status(500).json({ error: 'Error deleting artist' });
  }
};
