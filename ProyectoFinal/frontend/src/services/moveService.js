import { getAuthHeaders } from '../utilities/getAuthHeaders';

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

export const createMove = async ({ move }) => {
  try {
    const response = await fetch(API_URL_MOVE, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(move),
    });

    if (!response.ok) {
      throw new Error('Error al crear el movimiento');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al crear el movimiento:', error);
    throw error;
  }
};

export const getMoveById = async ({ id }) => {
  try {
    const response = await fetch(`${API_URL_MOVE}/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener el movimiento por ID');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener el movimiento por ID:', error);
    throw error;
  }
};

export const updateMove = async ({ id, move }) => {
  try {
    const response = await fetch(`${API_URL_MOVE}/${id}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(move),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el movimiento');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al actualizar el movimiento:', error);
    throw error;
  }
};

export const deleteMove = async ({ id }) => {
  try {
    const response = await fetch(`${API_URL_MOVE}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el movimiento');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al eliminar el movimiento:', error);
    throw error;
  }
};
