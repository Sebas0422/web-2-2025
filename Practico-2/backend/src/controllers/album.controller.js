import { Album } from '../models/index.js';

const mapAlbum = (album) => ({
  id: album.id,
  title: album.title,
  coverImage: album.coverImage,
});

export const createAlbum = async (req, res) => {
  try {
    const { title, coverImage } = req.body;
    const album = await Album.create({ title, coverImage });
    res.status(201).json(mapAlbum(album));
  } catch (error) {
    res.status(500).json({ error: 'Error creating album', message: error.message });
  }
};

export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll();
    res.json(albums.map(mapAlbum));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching albums', message: error.message });
  }
};

export const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findByPk(id);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    res.json(mapAlbum(album));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching album', message: error.message });
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, coverImage } = req.body;
    const album = await Album.findByPk(id);
    if (!album) return res.status(404).json({ error: 'Album not found' });

    await album.update({ title, coverImage });
    res.json(mapAlbum(album));
  } catch (error) {
    res.status(500).json({ error: 'Error updating album', message: error.message });
  }
};

export const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findByPk(id);
    if (!album) return res.status(404).json({ error: 'Album not found' });

    await album.destroy();
    res.json({ message: 'Album deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting album', message: error.message });
  }
};
