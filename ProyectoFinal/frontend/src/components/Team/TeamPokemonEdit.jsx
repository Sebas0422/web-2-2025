import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const STAT_KEYS = ['hp', 'atk', 'def', 'spAtk', 'spDef', 'speed'];

const calculateStat = (base, ev, iv, modifier = 1.0) => {
  return Math.floor((((2 * base + iv + Math.floor(ev / 4)) * 100) / 100 + 5) * modifier);
};

const calculateHp = (base, ev, iv) => {
  return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * 100) / 100) + 100 + 10;
};

export const TeamPokemonEdit = () => {
  const location = useLocation();
  const teamPokemon = location.state?.teamPokemon;
  const navigate = useNavigate();

  const [evs, setEvs] = useState({
    hpEV: teamPokemon.hpEV,
    atkEV: teamPokemon.atkEV,
    defEV: teamPokemon.defEV,
    spAtkEV: teamPokemon.spAtkEV,
    spDefEV: teamPokemon.spDefEV,
    speedEV: teamPokemon.speedEV,
  });

  const [ivs, setIvs] = useState({
    hpIV: teamPokemon.hpIV,
    atkIV: teamPokemon.atkIV,
    defIV: teamPokemon.defIV,
    spAtkIV: teamPokemon.spAtkIV,
    spDefIV: teamPokemon.spDefIV,
    speedIV: teamPokemon.speedIV,
  });

  const [natures, setNatures] = useState([]);
  const [selectedNatureId, setSelectedNatureId] = useState(teamPokemon.natureId || '');
  useEffect(() => {
    const fetchNatures = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/natures', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setNatures(data);
      } catch (error) {
        console.error('Error al obtener naturalezas:', error);
      }
    };
    fetchNatures();
  }, []);
  if (!teamPokemon) {
    return <div className="text-red-500">No se encontró el Pokémon.</div>;
  }

  const { pokemons: baseData } = teamPokemon;

  const handleEVChange = (key, value) => {
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 252) {
      setEvs((prev) => ({ ...prev, [key]: parsed }));
    }
  };

  const handleIVChange = (key, value) => {
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 31) {
      setIvs((prev) => ({ ...prev, [key]: parsed }));
    }
  };
  const selectedNature = natures.find((n) => n.id === selectedNatureId);

  const getBaseStat = (key) => {
    switch (key) {
      case 'hp':
        return baseData.baseHp;
      case 'atk':
        return baseData.baseAttack;
      case 'def':
        return baseData.baseDefense;
      case 'spAtk':
        return baseData.baseSpAttack;
      case 'spDef':
        return baseData.baseSpDefense;
      case 'speed':
        return baseData.baseSpeed;
      default:
        return 0;
    }
  };

  const getModifier = (statKey) => {
    if (!selectedNature) return 1.0;
    if (selectedNature.increasedStat === statKey) return 1.1;
    if (selectedNature.decreasedStat === statKey) return 0.9;
    return 1.0;
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Editar Pokémon del Equipo
      </h2>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={
            baseData.imagePatch ||
            'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
          }
          alt={baseData.name}
          className="w-24 h-24 object-contain"
        />
        <div>
          <h3 className="text-xl font-semibold capitalize">{baseData.name}</h3>
          <p className="text-sm text-gray-500">Nickname: {teamPokemon.nickname || 'Sin apodo'}</p>
        </div>
      </div>

      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Stat</th>
            <th className="border px-2 py-1">Base</th>
            <th className="border px-2 py-1">IV</th>
            <th className="border px-2 py-1">EV</th>
            <th className="border px-2 py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {STAT_KEYS.map((key) => {
            const base = getBaseStat(key);
            const iv = ivs[`${key}IV`];
            const ev = evs[`${key}EV`];
            const modifier = getModifier(key);
            const total =
              key === 'hp' ? calculateHp(base, ev, iv) : calculateStat(base, ev, iv, modifier);

            return (
              <tr key={key}>
                <td className="border px-2 py-1 capitalize">{key}</td>
                <td className="border px-2 py-1 text-center">{base}</td>
                <td className="border px-2 py-1 text-center">
                  <input
                    type="number"
                    value={iv}
                    min={0}
                    max={31}
                    onChange={(e) => handleIVChange(`${key}IV`, e.target.value)}
                    className="w-16 text-center border rounded"
                  />
                </td>
                <td className="border px-2 py-1 text-center">
                  <input
                    type="number"
                    value={ev}
                    min={0}
                    max={252}
                    onChange={(e) => handleEVChange(`${key}EV`, e.target.value)}
                    className="w-16 text-center border rounded"
                  />
                </td>
                <td className="border px-2 py-1 text-center">{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="my-6">
        <label className="block mb-2 font-semibold">Naturaleza:</label>
        <select
          value={selectedNatureId || ''}
          onChange={(e) => setSelectedNatureId(Number(e.target.value))}
          className="border rounded px-3 py-2 w-full max-w-md"
        >
          <option value="">-- Seleccionar naturaleza --</option>
          {natures.map((nature) => (
            <option key={nature.id} value={nature.id}>
              {nature.name} ({nature.increasedStat} ↑ / {nature.decreasedStat} ↓)
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between mt-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-shadow shadow-sm"
        >
          Cancelar
        </button>
        <button
          onClick={() => alert('Guardar funcionalidad próximamente')}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};
