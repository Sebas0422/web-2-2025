import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getPokemonTypes } from '../../services/typesSerice';
import { usePokedexContext } from '../../hooks/usePokedexContext';

export const PokemonForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading: loadingAuth } = useAuth();

  const [formData, setFormData] = useState(null);
  const [types, setTypes] = useState([]);
  const { loading, findPokemonById, error, modifyPokemon, addPokemon } = usePokedexContext();

  useEffect(() => {
    if (loadingAuth) return console.log('Cargando autenticación...');

    const fetchData = async () => {
      try {
        const pokemonData = id
          ? await findPokemonById({ id })
          : {
              name: '',
              baseHp: 0,
              baseAttack: 0,
              baseDefense: 0,
              baseSpAttack: 0,
              baseSpDefense: 0,
              baseSpeed: 0,
              typeId: '',
            };
        const typesData = await getPokemonTypes();

        setFormData(pokemonData);
        setTypes(typesData);
      } catch (err) {
        console.error('Error al cargar los datos del Pokémon:', err);
        setFormData(null);
        setTypes([]);
      }
    };

    fetchData();
  }, [id, loadingAuth, findPokemonById]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 text-lg font-semibold">
        Cargando Pokémon...
      </div>
    );
  if (error)
    return (
      <div className="p-6 text-center text-red-600 font-semibold bg-red-100 rounded-md max-w-md mx-auto mt-10">
        {error}
      </div>
    );
  if (!formData) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    if (id) {
      modifyPokemon({ id, pokemon: formData })
        .then(() => {
          console.log('Pokémon actualizado correctamente');
          navigate('/admin/pokemons');
        })
        .catch((err) => {
          console.error('Error al actualizar el Pokémon:', err);
          alert('Error al actualizar el Pokémon. Por favor, inténtalo de nuevo.');
        });
    } else {
      console.log('Crear nuevo Pokémon:', formData);
      addPokemon({ pokemon: formData })
        .then(() => {
          console.log('Pokémon creado correctamente');
          navigate('/admin/pokemons');
        })
        .catch((err) => {
          console.error('Error al crear el Pokémon:', err);
          alert('Error al crear el Pokémon. Por favor, inténtalo de nuevo.');
        });
    }
  };

  const handleClickViewMovements = () => {
    console.log('Ver movimientos del Pokémon:', formData);
    navigate(`/admin/pokemons/${id}/movements`, {
      state: { pokemon: formData },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-gray-200 mt-10"
    >
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
        {id ? 'Editar' : 'Crear'} Pokémon
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: 'name', type: 'text', label: 'Nombre' },
          { name: 'baseHp', type: 'number', label: 'HP Base' },
          { name: 'baseAttack', type: 'number', label: 'Ataque Base' },
          { name: 'baseDefense', type: 'number', label: 'Defensa Base' },
          { name: 'baseSpAttack', type: 'number', label: 'Ataque Especial Base' },
          { name: 'baseSpDefense', type: 'number', label: 'Defensa Especial Base' },
          { name: 'baseSpeed', type: 'number', label: 'Velocidad Base' },
        ].map(({ name, type, label }) => (
          <div key={name} className="flex flex-col">
            <label
              htmlFor={name}
              className="mb-2 font-semibold text-gray-700 hover:text-blue-600 transition"
            >
              {label}
            </label>
            <input
              id={name}
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition shadow-sm"
              min={type === 'number' ? 0 : undefined}
            />
          </div>
        ))}

        <div className="flex flex-col">
          <label
            htmlFor="typeId"
            className="mb-2 font-semibold text-gray-700 hover:text-blue-600 transition"
          >
            Tipo
          </label>
          <select
            id="typeId"
            name="typeId"
            value={formData.typeId}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 transition shadow-sm"
          >
            <option value="">Seleccione un tipo</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-shadow shadow-sm"
        >
          Cancelar
        </button>
        {id && (
          <button
            type="button"
            onClick={handleClickViewMovements}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow transition"
          >
            Ver movimientos
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-3 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 shadow-lg transition-shadow"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
