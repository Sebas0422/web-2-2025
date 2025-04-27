import { Music } from '../models/index.js';

const mapMusic = (music) => ({
  id: music.id,
  title: music.title,
  mp3FilePath: music.mp3FilePath,
});

export const createMusic = async (req, res) => {
  try {
    const { title, mp3FilePath } = req.body;
    const music = await Music.create({ title, mp3FilePath });
    res.status(201).json(mapMusic(music));
  } catch (error) {
    res.status(500).json({ error: 'Error creating music', message: error.message });
  }
};

export const getAllMusics = async (req, res) => {
  try {
    const musics = await Music.findAll();
    res.json(musics.map(mapMusic));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching musics', message: error.message });
  }
};

export const getMusicById = async (req, res) => {
  try {
    const { id } = req.params;
    const music = await Music.findByPk(id);
    if (!music) return res.status(404).json({ error: 'Music not found' });
    res.json(mapMusic(music));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching music', message: error.message });
  }
};

export const updateMusic = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, mp3FilePath } = req.body;
    const music = await Music.findByPk(id);
    if (!music) return res.status(404).json({ error: 'Music not found' });

    await music.update({ title, mp3FilePath });
    res.json(mapMusic(music));
  } catch (error) {
    res.status(500).json({ error: 'Error updating music', message: error.message });
  }
};

export const deleteMusic = async (req, res) => {
  try {
    const { id } = req.params;
    const music = await Music.findByPk(id);
    if (!music) return res.status(404).json({ error: 'Music not found' });

    await music.destroy();
    res.json({ message: 'Music deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting music', message: error.message });
  }
};
