import { getAuthHeaders } from '../utilities/getAuthHeaders';

const API_URL_NATURE = `${import.meta.env.VITE_API_URL}/api/natures`;

export const getAllNatures = async () => {
  try {
    const response = await fetch(API_URL_NATURE, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error fetching natures');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching natures:', error);
    throw error;
  }
};
