const API_URL_USER = `${import.meta.env.VITE_API_URL}/api/users`;
import { getAuthHeaders } from '../utilities/getAuthHeaders';

export const getAllUsers = async () => {
  try {
    const response = await fetch(API_URL_USER, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getAllUsers:', error);
    throw error;
  }
};

export const getUserById = async ({ id }) => {
  try {
    const response = await fetch(`${API_URL_USER}/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener el usuario');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getUserById:', error);
    throw error;
  }
};

export const createUser = async ({ user }) => {
  try {
    const response = await fetch(API_URL_USER, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error) {
        throw new Error(errorData.error);
      }

      throw new Error('Error al crear el usuario');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en createUser:', error);
    throw error;
  }
};

export const updateUser = async ({ id, user }) => {
  try {
    const response = await fetch(`${API_URL_USER}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error) {
        throw new Error(errorData.error);
      }
      throw new Error('Error al actualizar el usuario');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en updateUser:', error);
    throw error;
  }
};

export const deleteUser = async ({ id }) => {
  try {
    const response = await fetch(`${API_URL_USER}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el usuario');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en deleteUser:', error);
    throw error;
  }
};
