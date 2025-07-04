const API_URL_TEAM = `${import.meta.env.VITE_API_URL}/api/teams`;
import { getAuthHeaders } from '../utilities/getAuthHeaders';

export const getAllTeams = async () => {
  try {
    const response = await fetch(API_URL_TEAM, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener los equipos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getAllTeams:', error);
    throw error;
  }
};

export const getPokemonsByTeamId = async ({ id }) => {
  try {
    const response = await fetch(`${API_URL_TEAM}/${id}/pokemons`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener los Pokemons del equipo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getPokemonsByTeamId:', error);
    throw error;
  }
};
