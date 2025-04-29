import { useEffect, useState } from 'react';
import { getAllGenres, getGenreById} from '../services/genreService';

export const useGetAllGenres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getAllGenres();
        setGenres(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
};

export const useGetGenreById = ({id, enable = true} = {}) => {
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(enable);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enable) return;
    const fetchGenre = async () => {
      try {
        const data = await getGenreById(id);
        setGenre(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenre();
  }, [id, enable]);

  return { genre, loading, error };
};
