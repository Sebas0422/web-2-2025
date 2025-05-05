import { createContext, useContext, useEffect, useState } from "react";
import { useUpdateGenre } from "../hook/useGenre";
import { getAllGenres } from "../services/genreService";

const GenreContext = createContext();

export const useGenreContext = () => {
  const context = useContext(GenreContext);
  if (!context) {
    throw new Error("useGenreContext must be used within a GenreProvider");
  }
  return context;
};

export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = getAllGenres();
        if (!response.ok) {
          throw new Error("Error fetching genres");
        }
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        setError(error.message);
        console.error("Error in GenreProvider:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  
  const {updateGenreId} = useUpdateGenre();
  const updateGenre = async (id, name, imageFile) => {
    try {
      setLoading(true);
      setError(null);
      const updatedGenre = await updateGenreId({ id, name, imageFile });
      setGenres((prevGenres) =>
        prevGenres.map((genre) => (genre.id === id ? updatedGenre : genre))
      );
    } catch (error) {
      setError(error.message);
      console.error("Error in updateGenre:", error);
    }
  };
  return (
    <GenreContext.Provider value={{ genres, loading, updateGenre, error }}>
      {children}
    </GenreContext.Provider>
  );
};