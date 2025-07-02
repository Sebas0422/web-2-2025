import { getAuthHeaders } from '../components/Utilities/getAuthHeaders';

const API_URL_TYPES = import.meta.env.VITE_API_URL + '/api';

export const getPokemonTypes = async () => {
  try {
    const response = await fetch(`${API_URL_TYPES}/types`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener los tipos de Pokemon');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los tipos de Pokemon:', error);
    throw error;
  }
};
