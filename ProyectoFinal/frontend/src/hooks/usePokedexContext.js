import { useContext } from 'react';
import { PokedexContext } from '../components/context/PokedexContext';

export const usePokedexContext = () => useContext(PokedexContext);
