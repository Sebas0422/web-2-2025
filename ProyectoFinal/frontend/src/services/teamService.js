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

export const updateTeamPokemon = async ({ id, teamPokemon }) => {
  try {
    const response = await fetch(`${API_URL_TEAM}/details/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(teamPokemon),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el Pokémon del equipo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en updateTeamPokemon:', error);
    throw error;
  }
};

export const createTeam = async ({ name }) => {
  try {
    const response = await fetch(API_URL_TEAM, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error('Error al crear el equipo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en createTeam:', error);
    throw error;
  }
};

export const assingMoveToTeamPokemon = async ({ teamId, moveId }) => {
  try {
    const response = await fetch(`${API_URL_TEAM}/details/${teamId}/move`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ moveId }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en assingMoveToTeamPokemon:', error);
    throw error;
  }
};

export const getMovesByTeamPokemonId = async ({ id }) => {
  try {
    const response = await fetch(`${API_URL_TEAM}/details/${id}/moves`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener los movimientos del Pokémon del equipo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getMovesByTeamPokemonId:', error);
    throw error;
  }
};
