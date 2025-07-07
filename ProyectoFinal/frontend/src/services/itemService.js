import { getAuthHeaders } from '../utilities/getAuthHeaders';

const API_URL_ITEMS = `${import.meta.env.VITE_API_URL}/api/items`;

export const getItems = async () => {
  const response = await fetch(API_URL_ITEMS, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Error al obtener los ítems');
  }
  return response.json();
};

export const createItem = async ({ item, imageFile }) => {
  const formData = new FormData();
  Object.entries(item).forEach(([key, value]) => {
    formData.append(key, value);
  });
  if (imageFile) {
    formData.append('imageFile', imageFile);
  }
  const response = await fetch(API_URL_ITEMS, {
    method: 'POST',
    headers: getAuthHeaders(false),
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Error al crear el ítem');
  }

  return response.json();
};

export const getItemById = async ({ id }) => {
  const response = await fetch(`${API_URL_ITEMS}/${id}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Error al obtener el ítem');
  }

  return response.json();
};

export const updateItem = async ({ id, item, imageFile }) => {
  const formData = new FormData();
  Object.entries(item).forEach(([key, value]) => {
    formData.append(key, value);
  });
  if (imageFile) {
    formData.append('imageFile', imageFile);
  }
  const response = await fetch(`${API_URL_ITEMS}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el ítem');
  }

  return response.json();
};

export const deleteItem = async ({ id }) => {
  const response = await fetch(`${API_URL_ITEMS}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el ítem');
  }

  return response.status === 204;
};
