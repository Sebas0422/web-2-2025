import Genre from '../models/Gerne';

const API_URL_GENRES = `${import.meta.env.VITE_API_URL}/api/genres`;

export const getAllGenres = async () => {
  console.log('Fetching genres from:', API_URL_GENRES);
  
  try {
    const response = await fetch(API_URL_GENRES);
    
    if (!response.ok) {
      throw new Error('Error fetching genres');
    }

    const data = await response.json();
    return data.map((genre) => new Genre(genre.id, genre.name, genre.imagePath || ''));
  } catch (error) {
    console.error('Error in getAllGenres:', error);
    throw error;
  }
};

export const getGenreById = async (id) => {
  try {
    const response = await fetch(`${API_URL_GENRES}/${id}`);
    
    if (!response.ok) {
      throw new Error('Error fetching genre by ID');
    }

    const data = await response.json();
    return new Genre(data.id, data.name, data.imagePath || '');
  } catch (error) {
    console.error('Error in getGenreById:', error);
    throw error;
  }
};

