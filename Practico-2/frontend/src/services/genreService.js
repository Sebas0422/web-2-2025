import Genre from '../models/Gerne';

const API_URL_GENRES = `${import.meta.env.VITE_API_URL}/api/genres`;

export const getAllGenres = async () => {  
  try {
    const response = await fetch(API_URL_GENRES);
    
    if (!response.ok) {
      throw new Error('Error fetching genres');
    }

    const data = await response.json();
    return data.map((genre) => new Genre({id: genre.id, name: genre.name, imagePath: genre.imagePath || '', artists: genre.artists}));
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
    return new Genre({id: data.id, name: data.name, imagePath: data.imagePath || '', artists: data.artists});
  } catch (error) {
    console.error('Error in getGenreById:', error);
    throw error;
  }
};

export const updateGenre = async ({id, name, imageFile}) => {
  try{
    const formData = new FormData();
    formData.append('name', name);
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }

    console.log('body', formData);
    const response = await fetch(`${API_URL_GENRES}/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error updating genre');
    }

    const data = await response.json();
    return new Genre({id: data.id, name: data.name, imagePath: data.imagePath || ''});
  }catch (error) {
    console.error('Error in updateGenre:', error);
    throw error;
  }
}