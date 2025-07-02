import { getAuthHeaders } from '../components/Utilities/getAuthHeaders';

const API_URL_MOVE = `${import.meta.env.VITE_API_URL}/api/moves`;

export const getAllMoves = async () => {
  try {
    const response = await fetch(API_URL_MOVE, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener los movimientos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener los movimientos:', error);
    throw error;
  }
};
