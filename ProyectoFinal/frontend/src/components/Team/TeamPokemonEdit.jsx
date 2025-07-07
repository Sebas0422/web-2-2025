import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovesByPokemonId } from '../../services/pokemonService';
import { getItems } from '../../services/itemService';
import { getAllNatures } from '../../services/natureService';
import {
  assingMoveToTeamPokemon,
  updateTeamPokemon,
  getMovesByTeamPokemonId,
} from '../../services/teamService';

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

  const [evs, setEvs] = useState({});
  const [ivs, setIvs] = useState({});
  const [natures, setNatures] = useState([]);
  const [items, setItems] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [moves, setMoves] = useState([]);
  const [nickname, setNickname] = useState(teamPokemon?.nickname || '');

  const [selectedNatureId, setSelectedNatureId] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedAbilityId, setSelectedAbilityId] = useState('');
  const [selectedMoveIds, setSelectedMoveIds] = useState(['', '', '', '']);

  useEffect(() => {
    if (!teamPokemon) return;

    setEvs({
      hpEV: teamPokemon.hpEV,
      atkEV: teamPokemon.atkEV,
      defEV: teamPokemon.defEV,
      spAtkEV: teamPokemon.spAtkEV,
      spDefEV: teamPokemon.spDefEV,
      speedEV: teamPokemon.speedEV,
    });

    setIvs({
      hpIV: teamPokemon.hpIV,
      atkIV: teamPokemon.atkIV,
      defIV: teamPokemon.defIV,
      spAtkIV: teamPokemon.spAtkIV,
      spDefIV: teamPokemon.spDefIV,
      speedIV: teamPokemon.speedIV,
    });

    setSelectedNatureId(teamPokemon.natureId || '');
    setSelectedItemId(teamPokemon.itemId || '');
    setSelectedAbilityId(teamPokemon.abilityId || '');
    setNickname(teamPokemon.nickname || '');
    getMovesByTeamPokemonId({ id: teamPokemon.id }).then((data) => {
      const moveIds = data.map((move) => move.id);
      if (moveIds.length < 4) {
        const emptyMoves = Array(4 - moveIds.length).fill('');
        setSelectedMoveIds([...moveIds, ...emptyMoves]);
      } else {
        setSelectedMoveIds(moveIds);
      }
    });

    const fetchData = async () => {
      try {
        const [naturesData, itemsData, /*abilitiesData,*/ movesData] = await Promise.all([
          getAllNatures(),
          getItems(),
          //aRes.json(),
          getMovesByPokemonId({ id: teamPokemon.pokemons.id }),
        ]);
        setNatures(naturesData || []);
        setItems(itemsData || []);
        setMoves(movesData || []);
      } catch (error) {
        console.error('Error cargando datos:', error.message);
      }
    };

    fetchData();
  }, [teamPokemon]);

  if (!teamPokemon) {
    return <div className="text-red-500">No se encontró el Pokémon.</div>;
  }

  const baseData = teamPokemon.pokemons;
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

  const handleMoveChange = (index, value) => {
    const updated = [...selectedMoveIds];
    updated[index] = value;
    setSelectedMoveIds(updated);
  };

  const getAvailableMoves = (index) => {
    const selected = selectedMoveIds.filter((_, i) => i !== index);
    return moves.filter((m) => !selected.includes(m.id));
  };

  const handleSaveChanges = async () => {
    //validar campos que no esten vacios y mandar undefined o no mandarlos
    const updatedPokemon = {
      nickname: nickname || undefined,
      itemId: selectedItemId || undefined,
      abilityId: selectedAbilityId || undefined,
      natureId: selectedNatureId || undefined,
      hpEV: evs.hpEV || 0,
      atkEV: evs.atkEV || 0,
      defEV: evs.defEV || 0,
      spAtkEV: evs.spAtkEV || 0,
      spDefEV: evs.spDefEV || 0,
      speedEV: evs.speedEV || 0,
      hpIV: ivs.hpIV || 0,
      atkIV: ivs.atkIV || 0,
      defIV: ivs.defIV || 0,
      spAtkIV: ivs.spAtkIV || 0,
      spDefIV: ivs.spDefIV || 0,
      speedIV: ivs.speedIV || 0,
    };
    console.log('Datos a guardar:', updatedPokemon);
    try {
      await Promise.all[
        selectedMoveIds.map(async (moveId) => {
          if (moveId === '') return;
          await assingMoveToTeamPokemon({ teamId: teamPokemon.id, moveId });
        })
      ];
      await updateTeamPokemon({
        id: teamPokemon.id,
        teamPokemon: updatedPokemon,
      });
      alert('Cambios guardados correctamente');
      navigate(-1);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Error al guardar los cambios. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Editar Pokémon del Equipo
      </h2>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-shrink-0 text-center">
          <img
            src={
              baseData.imagePatch ||
              'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
            }
            alt={baseData.name}
            className="w-24 h-24 object-contain mx-auto"
          />
          <h3 className="text-xl font-semibold capitalize mt-2">{baseData.name}</h3>
          <p className="text-sm text-gray-500">
            Nickname:
            <input
              value={nickname}
              min={0}
              max={31}
              onChange={(e) => setNickname(e.target.value)}
              className="w-21 text-center border rounded ml-2"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Select
            label="Item"
            value={selectedItemId}
            onChange={setSelectedItemId}
            options={items}
          />

          {selectedMoveIds.map((moveId, index) => (
            <Select
              key={index}
              label={`Movimiento ${index + 1}`}
              value={moveId}
              onChange={(val) => handleMoveChange(index, val)}
              options={getAvailableMoves(index)}
              renderOption={(opt) =>
                `${opt.moves?.name} - ${opt.moves?.type} - ${opt.moves?.power}`
              }
            />
          ))}
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
          onClick={handleSaveChanges}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

const Select = ({ label, value, onChange, options, labelKey = 'name', renderOption }) => (
  <div>
    <label className="block text-sm font-semibold mb-1">{label}</label>
    <select
      value={value || ''}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full border px-3 py-2 rounded"
    >
      <option value="">-- Seleccionar --</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {renderOption ? renderOption(opt) : opt[labelKey]}
        </option>
      ))}
    </select>
  </div>
);
