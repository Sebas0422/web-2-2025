import { useCallback, useState } from 'react';
import {
  createPokemon,
  deletePokemon,
  getPokemons,
  getPokemonById,
  updatePokemon,
} from '../../services/pokemonService';
import { PokedexContext } from './PokedexContext';
import {
  getItems,
  getItemById,
  deleteItem,
  updateItem,
  createItem,
} from '../../services/itemService';
import {
  getAllMoves,
  getMoveById,
  createMove,
  updateMove,
  deleteMove,
} from '../../services/moveService';

export const PokedexContextProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [moveList, setMoveList] = useState([]);
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

  const addPokemon = useCallback(async ({ pokemon, imageFile }) => {
    const newPokemon = await createPokemon({ pokemon, imageFile });
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

  const modifyPokemon = useCallback(async ({ id, pokemon, imageFile }) => {
    try {
      const updatedPokemon = await updatePokemon({ id, pokemon, imageFile });
      console.log('Pokémon actualizado:', updatedPokemon);
      setPokemonList((prevList) => prevList.map((p) => (p.id === id ? updatedPokemon : p)));
    } catch (error) {
      console.error('Error al actualizar el Pokémon:', error);
      setError(error.message);
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

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getItems();
      setItemList(data);
    } catch (error) {
      console.error('Error al cargar los Pokémon:', error);
      setError('Error al cargar los Pokémon');
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(async ({ item }) => {
    setLoading(true);
    try {
      const newItem = await createItem({ item });
      setItemList((prevList) => [...prevList, newItem]);
    } catch (error) {
      console.error('Error al agregar el ítem:', error);
      setError('Error al agregar el ítem');
    } finally {
      setLoading(false);
    }
  }, []);

  const eliminateItem = useCallback(async (id) => {
    setLoading(true);
    try {
      await deleteItem({ id });
      setItemList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error al eliminar el ítem:', error);
      setError('Error al eliminar el ítem');
    } finally {
      setLoading(false);
    }
  }, []);

  const modifyItem = useCallback(async ({ id, item }) => {
    setLoading(true);
    try {
      const updatedItem = await updateItem({ id, item });
      setItemList((prevList) => prevList.map((i) => (i.id === id ? updatedItem : i)));
    } catch (error) {
      console.error('Error al actualizar el ítem:', error);
      setError('Error al actualizar el ítem');
    } finally {
      setLoading(false);
    }
  }, []);

  const findItemById = useCallback(async ({ id }) => {
    setLoading(true);
    try {
      const item = await getItemById({ id });
      return item;
    } catch (error) {
      console.error('Error al obtener el ítem por ID:', error);
      setError('Error al obtener el ítem por ID');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMoves = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllMoves();
      setMoveList(data);
    } catch (error) {
      console.error('Error al cargar los movimientos:', error);
      setError('Error al cargar los movimientos');
    } finally {
      setLoading(false);
    }
  }, []);

  const addMove = useCallback(async ({ move }) => {
    setLoading(true);
    try {
      const newMove = await createMove({ move });
      setMoveList((prevList) => [...prevList, newMove]);
    } catch (error) {
      console.error('Error al agregar el movimiento:', error);
      setError('Error al agregar el movimiento');
    } finally {
      setLoading(false);
    }
  }, []);

  const eliminateMove = useCallback(async ({ id }) => {
    setLoading(true);
    try {
      await deleteMove({ id });
      setMoveList((prevList) => prevList.filter((move) => move.id !== id));
    } catch (error) {
      console.error('Error al eliminar el movimiento:', error);
      setError('Error al eliminar el movimiento');
    } finally {
      setLoading(false);
    }
  }, []);

  const modifyMove = useCallback(async ({ id, move }) => {
    setLoading(true);
    try {
      const updatedMove = await updateMove({ id, move });
      setMoveList((prevList) => prevList.map((m) => (m.id === id ? updatedMove : m)));
    } catch (error) {
      console.error('Error al actualizar el movimiento:', error);
      setError('Error al actualizar el movimiento');
    } finally {
      setLoading(false);
    }
  }, []);

  const findMoveById = useCallback(
    async ({ id }) => {
      setLoading(true);
      try {
        const move = await getMoveById({ id });
        return move;
      } catch (error) {
        console.error('Error al obtener el movimiento por ID:', error);
        setError('Error al obtener el movimiento por ID');
        return null;
      } finally {
        setLoading(false);
      }
    },

    [],
  );

  const value = {
    pokemonList,
    loadPokemon,
    addPokemon,
    eliminatePokemon,
    modifyPokemon,
    findPokemonById,
    itemList,
    loadItems,
    addItem,
    eliminateItem,
    modifyItem,
    findItemById,
    moveList,
    loadMoves,
    addMove,
    eliminateMove,
    modifyMove,
    findMoveById,
    error,
    loading,
  };

  return <PokedexContext.Provider value={value}>{children}</PokedexContext.Provider>;
};
