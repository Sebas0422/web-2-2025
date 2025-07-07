import { getAuthHeaders } from '../utilities/getAuthHeaders';

const API_URL_POKEMON = `${import.meta.env.VITE_API_URL}/api/pokemons`;
export const createPokemon = async ({ pokemon, imageFile }) => {
  const formData = new FormData();

  Object.entries(pokemon).forEach(([key, value]) => {
    formData.append(key, value);
  });

  if (imageFile) {
    formData.append('imageFile', imageFile);
  }

  const response = await fetch(API_URL_POKEMON, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(false),
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Error al crear el Pokemon');
  }

  return await response.json();
};

export const getPokemons = async () => {
  try {
    const response = await fetch(API_URL_POKEMON, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener los Pokemons');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener los Pokemons:', error);
    throw error;
  }
};

export const getPokemonById = async ({ id }) => {
  try {
    const response = await fetch(`${API_URL_POKEMON}/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener el Pokemon');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener el Pokemon:', error);
    throw error;
  }
};

export const updatePokemon = async ({ id, pokemon, imageFile }) => {
  const formData = new FormData();

  Object.entries(pokemon).forEach(([key, value]) => {
    formData.append(key, value);
  });

  if (imageFile) {
    formData.append('imageFile', imageFile);
  }

  const response = await fetch(`${API_URL_POKEMON}/${id}`, {
    method: 'PUT',
    headers: {
      ...getAuthHeaders(false),
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el Pokemon');
  }

  return await response.json();
};

export const deletePokemon = async ({ id }) => {
  try {
    const response = await fetch(`${API_URL_POKEMON}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error) {
        throw new Error(errorData.error);
      } else {
        throw new Error('Error al eliminar el Pokemon');
      }
    }

    return { message: 'Pokemon eliminado correctamente' };
  } catch (error) {
    console.error('Error al eliminar el Pokemon:', error);
    throw error;
  }
};

export const getMovesByPokemonId = async ({ id }) => {
  try {
    const response = await fetch(`${API_URL_POKEMON}/${id}/moves`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener los movimientos del Pokemon');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener los movimientos del Pokemon:', error);
    throw error;
  }
};

export const addMoveToPokemon = async ({ id, moveId }) => {
  try {
    const response = await fetch(`${API_URL_POKEMON}/${id}/moves`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ moveId }),
    });

    if (!response.ok) {
      return await response.json().then((error) => {
        if (error.error) {
          throw new Error(error.error);
        } else {
          throw new Error('Error al asignar el movimiento al Pokemon');
        }
      });
    }

    return await response.json();
  } catch (error) {
    console.log('Error al asignar el movimiento al Pokemon:', error);
    throw error;
  }
};
