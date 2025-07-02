import { useCallback, useState } from 'react';
import {
  createPokemon,
  deletePokemon,
  getPokemons,
  getPokemonById,
  updatePokemon,
} from '../../services/pokemonService';
import { PokedexContext } from './PokedexContext';

export const PokedexContextProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPokemon = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPokemons();
      setPokemonList(data);
    } catch (error) {
      console.error('Error al cargar los Pokémon:', error);
      setError('Error al cargar los Pokémon');
    } finally {
      setLoading(false);
    }
  }, []);

  const addPokemon = useCallback(async ({ pokemon }) => {
    const newPokemon = await createPokemon({ pokemon });
    setPokemonList((prevList) => [...prevList, newPokemon]);
  }, []);

  const eliminatePokemon = useCallback(async (id) => {
    try {
      await deletePokemon({ id });
      setPokemonList((prevList) => prevList.filter((pokemon) => pokemon.id !== id));
    } catch (error) {
      console.error('Error al eliminar el Pokémon:', error);
      setError('Error al eliminar el Pokémon');
    }
  }, []);

  const modifyPokemon = useCallback(async ({ id, pokemon }) => {
    try {
      const updatedPokemon = await updatePokemon({ id, pokemon });
      console.log('Pokémon actualizado:', updatedPokemon);
      setPokemonList((prevList) => prevList.map((p) => (p.id === id ? updatedPokemon : p)));
    } catch (error) {
      console.error('Error al actualizar el Pokémon:', error);
      setError('Error al actualizar el Pokémon');
    }
  }, []);

  const findPokemonById = useCallback(async ({ id }) => {
    try {
      const pokemon = await getPokemonById({ id });
      return pokemon;
    } catch (error) {
      console.error('Error al obtener el Pokémon por ID:', error);
      setError('Error al obtener el Pokémon por ID');
      return null;
    }
  }, []);

  const value = {
    pokemonList,
    loading,
    loadPokemon,
    addPokemon,
    eliminatePokemon,
    modifyPokemon,
    findPokemonById,
    error,
  };

  return <PokedexContext.Provider value={value}>{children}</PokedexContext.Provider>;
};
