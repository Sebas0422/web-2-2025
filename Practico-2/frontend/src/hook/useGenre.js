import { useEffect, useState } from 'react';
import { getAllGenres, getGenreById, updateGenre} from '../services/genreService';

export const useGetAllGenres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchGenres();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchGenres();
  };

  return { genres, loading, error, refetch };
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

export const useUpdateGenre = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateGenreId = async ({id, name, imageFile}) => {
    setLoading(true);
    try {
      const data = await updateGenre({id, name, imageFile});
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateGenreId, loading, error };
}
